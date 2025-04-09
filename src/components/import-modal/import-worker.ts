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

  const entries: JSZip.JSZipObject[] = [];
  const zip = new JSZip();
  await zip.loadAsync(rawPkpassData);
  zip.forEach(function (_relativePath, zipEntry) {
    entries.push(zipEntry);
  });

  for (const entry of entries) {
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
  }

  const passFileHandle = await unzippedDirectory.getFileHandle("pass.json");
  const passFile = await passFileHandle.getFile();
  const passObject = JSON.parse(await passFile.text());

  const passBundle: PassBundleShort = {
    id: uuid,
    objects: { pass: passObject },
    files: {},
  };

  for (const key of Object.keys(IMAGE_FILES)) {
    let imageFileHandle: FileSystemFileHandle | undefined = undefined;
    try {
      imageFileHandle = await unzippedDirectory.getFileHandle(
        IMAGE_FILES[key]()
      );
    } catch (e) {
      // not found, silent skip
    }
    try {
      imageFileHandle = await unzippedDirectory.getFileHandle(
        IMAGE_FILES[key]("@2x")
      );
    } catch (e) {
      // not found, silent skip
    }
    try {
      imageFileHandle = await unzippedDirectory.getFileHandle(
        IMAGE_FILES[key]("@3x")
      );
    } catch (e) {
      // not found, silent skip
    }
    if (imageFileHandle !== undefined) {
      const imageFile: File = await imageFileHandle.getFile();
      // @ts-ignore
      passBundle.files[key] = URL.createObjectURL(imageFile);
    }
  }

  self.postMessage(passBundle);
};

export {};
