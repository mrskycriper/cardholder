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

        for (const key of Object.keys(IMAGE_FILES)) {
          let imageFileHandle: FileSystemFileHandle | undefined = undefined;
          try {
            imageFileHandle = await directoryHandle.getFileHandle(IMAGE_FILES[key]());
          } catch (e) {
            // not found, silent skip
          }
          try {
            imageFileHandle = await directoryHandle.getFileHandle(IMAGE_FILES[key]("@2x"));
          } catch (e) {
            // not found, silent skip
          }
          try {
            imageFileHandle = await directoryHandle.getFileHandle(IMAGE_FILES[key]("@3x"));
          } catch (e) {
            // not found, silent skip
          }
          if (imageFileHandle !== undefined) {
            const imageFile: File = await imageFileHandle.getFile();
            // @ts-ignore
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
