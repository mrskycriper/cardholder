import { DEFAULT_FOLDER } from "../../constants/files";
import { PassBundleShort } from "../../interfaces/pass";

self.onmessage = async () => {
  const opfsRoot = await navigator.storage.getDirectory();
  const defaultDirectory = await opfsRoot.getDirectoryHandle(DEFAULT_FOLDER, {
    create: true,
  });

  const files: PassBundleShort[] = [];

  for await (const [entryName, entryHandle] of defaultDirectory.entries()) {
    if (entryHandle.kind === "directory") {
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

      let logoFileHandle: FileSystemFileHandle | undefined = undefined;
      try {
        logoFileHandle = await directoryHandle.getFileHandle("logo.png");
      } catch (e) {
        // not found, silent skip
      }
      try {
        logoFileHandle = await directoryHandle.getFileHandle("logo@2x.png");
      } catch (e) {
        // not found, silent skip
      }
      try {
        logoFileHandle = await directoryHandle.getFileHandle("logo@3x.png");
      } catch (e) {
        // not found, silent skip
      }
      if (logoFileHandle !== undefined) {
        const logoFile: File = await logoFileHandle.getFile();
        passBundle.files.logo = URL.createObjectURL(logoFile);
      }

      let iconFileHandle: FileSystemFileHandle | undefined = undefined;
      try {
        iconFileHandle = await directoryHandle.getFileHandle("icon.png");
      } catch (e) {
        // not found, silent skip
      }
      try {
        iconFileHandle = await directoryHandle.getFileHandle("icon@2x.png");
      } catch (e) {
        // not found, silent skip
      }
      try {
        iconFileHandle = await directoryHandle.getFileHandle("icon@3x.png");
      } catch (e) {
        // not found, silent skip
      }
      if (iconFileHandle !== undefined) {
        const iconFile: File = await iconFileHandle.getFile();
        passBundle.files.icon = URL.createObjectURL(iconFile);
      }

      files.push(passBundle);
    }
  }

  self.postMessage(files);
};

export {};
