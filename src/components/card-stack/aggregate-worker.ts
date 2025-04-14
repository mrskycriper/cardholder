import { DEFAULT_FOLDER, IMAGE_FILES } from "../../constants/files";
import { PassBundleShort } from "../../interfaces/pass";

self.onmessage = async () => {
  const opfsRoot = await navigator.storage.getDirectory();
  const defaultDirectory = await opfsRoot.getDirectoryHandle(DEFAULT_FOLDER, {
    create: true,
  });

  const passes: PassBundleShort[] = [];

  for await (const [entryName, entryHandle] of defaultDirectory.entries()) {
    if (entryHandle.kind === "directory") {
      try {
        const directoryHandle: FileSystemDirectoryHandle =
          entryHandle as FileSystemDirectoryHandle;
        const passFileHandle: FileSystemFileHandle =
          await directoryHandle.getFileHandle("pass.json");
        const passFile: File = await passFileHandle.getFile();
        const passObject = JSON.parse(await passFile.text());
        const passBundle: PassBundleShort = {
          id: entryName,
          objects: { pass: passObject },
          files: {},
        };

        let translatedPass = false;
        const translationFiles: Record<string, string>[] = [];
        for await (const [
          subntryName,
          subntryHandle,
        ] of directoryHandle.entries()) {
          if (subntryHandle.kind === "directory") {
            const subntryDirectoryHandle =
              subntryHandle as FileSystemDirectoryHandle;
            try {
              translatedPass = true;
              const langName = subntryName.split("/")[0];
              const langFileHandle = await subntryDirectoryHandle.getFileHandle(
                "pass.strings"
              );
              const langFileRawData = await langFileHandle.getFile();
              const langFileData = await langFileRawData.text();
              translationFiles.push({ [langName]: langFileData });
            } catch {
              //silent skip
            }
          }
        }

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
            imageFileHandle = await directoryHandle.getFileHandle(
              IMAGE_FILES[key]()
            );
          } catch {
            // not found, silent skip
          }
          try {
            imageFileHandle = await directoryHandle.getFileHandle(
              IMAGE_FILES[key]("@2x")
            );
          } catch {
            // not found, silent skip
          }
          try {
            imageFileHandle = await directoryHandle.getFileHandle(
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

        passes.push(passBundle);
      } catch (e) {
        console.log(e);
      }
    }
  }

  self.postMessage(passes);
};

export {};
