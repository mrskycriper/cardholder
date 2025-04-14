import JSZip from "jszip";
import { PassBundleShort } from "../../interfaces/pass";
import { DEFAULT_FOLDER, IMAGE_FILES } from "../../constants/files";

self.onmessage = async (e: MessageEvent<File>) => {
  const rawPkpassData = await e.data.arrayBuffer();

  const opfsRoot = await navigator.storage.getDirectory();
  const defaultDirectory = await opfsRoot.getDirectoryHandle(DEFAULT_FOLDER, {
    create: true,
  });
  const uuid = self.crypto.randomUUID();
  console.log("New card with ID: " + uuid);
  const unzippedDirectory = await defaultDirectory.getDirectoryHandle(uuid, {
    create: true,
  });
  const pkpassFileHandle = await unzippedDirectory.getFileHandle(
    uuid + ".pkpass",
    {
      create: true,
    }
  );
  // @ts-expect-error Crotch for missing type definitions (property 'createSyncAccessHandle' does not exist on type 'FileSystemFileHandle')
  const pkpassAccessHandle = await pkpassFileHandle.createSyncAccessHandle();
  pkpassAccessHandle.write(rawPkpassData);
  pkpassAccessHandle.close();

  let translatedPass = false;
  const translationFiles: Record<string, string>[] = [];

  const entries: JSZip.JSZipObject[] = [];
  const zip = new JSZip();
  await zip.loadAsync(rawPkpassData);
  zip.forEach(function (_relativePath, zipEntry) {
    entries.push(zipEntry);
  });

  for (const entry of entries) {
    if (entry.name.search("/") === -1) {
      try {
        const fileHandle = await unzippedDirectory.getFileHandle(entry.name, {
          create: true,
        });
        // @ts-expect-error Crotch for missing type definitions (property 'createSyncAccessHandle' does not exist on type 'FileSystemFileHandle')
        const accessHandle = await fileHandle.createSyncAccessHandle();
        const fileData = await entry.async("arraybuffer");
        accessHandle.write(fileData);
        accessHandle.close();
      } catch (e) {
        console.log(e);
      }
    } else {
      translatedPass = true;
      try {
        const langDirectoryName = entry.name.split("/")[0];
        const langDirectory = await unzippedDirectory.getDirectoryHandle(
          langDirectoryName,
          {
            create: true,
          }
        );
        const fileHandle = await langDirectory.getFileHandle("pass.strings", {
          create: true,
        });
        // @ts-expect-error Crotch for missing type definitions (property 'createSyncAccessHandle' does not exist on type 'FileSystemFileHandle')
        const accessHandle = await fileHandle.createSyncAccessHandle();
        const fileData = await entry.async("arraybuffer");
        const fileDataText = await entry.async("text");
        accessHandle.write(fileData);
        accessHandle.close();
        translationFiles.push({ [langDirectoryName]: fileDataText });
      } catch (e) {
        console.log(e);
      }
    }
  }

  const passFileHandle = await unzippedDirectory.getFileHandle("pass.json");
  const passFile = await passFileHandle.getFile();
  const passObject = JSON.parse(await passFile.text());

  const passBundle: PassBundleShort = {
    id: uuid,
    objects: { pass: passObject },
    files: {},
  };

  if (translatedPass) {
    passBundle.objects.translations = {};
    for (const translationFile of translationFiles) {
      if (
        Object.keys(translationFile).length !== 0 &&
        Object.values(translationFile).length !== 0
      ) {
        const langName = Object.keys(translationFile)[0].split(".")[0];
        passBundle.objects.translations[langName] = {};
        const rawStrings = Object.values(translationFile)[0].split(";\n");
        for (const pair of rawStrings) {
          const clean = pair.split(`" = "`);
          if (clean[0] !== undefined && clean[1] !== undefined) {
            passBundle.objects.translations[langName][clean[0].replaceAll(`"`, ``)] = clean[1].replaceAll(`"`, ``)
          }
        }
      }
    }
  }

  for (const key of Object.keys(IMAGE_FILES)) {
    let imageFileHandle: FileSystemFileHandle | undefined = undefined;
    try {
      imageFileHandle = await unzippedDirectory.getFileHandle(
        IMAGE_FILES[key]()
      );
    } catch {
      // not found, silent skip
    }
    try {
      imageFileHandle = await unzippedDirectory.getFileHandle(
        IMAGE_FILES[key]("@2x")
      );
    } catch {
      // not found, silent skip
    }
    try {
      imageFileHandle = await unzippedDirectory.getFileHandle(
        IMAGE_FILES[key]("@3x")
      );
    } catch {
      // not found, silent skip
    }
    if (imageFileHandle !== undefined) {
      const imageFile: File = await imageFileHandle.getFile();
      // @ts-expect-error String is string
      passBundle.files[key] = URL.createObjectURL(imageFile);
    }
  }

  self.postMessage(passBundle);
};

export {};
