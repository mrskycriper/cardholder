import JSZip from "jszip";

self.onmessage = async (uuid: MessageEvent<string>) => {
  const opfsRoot = await navigator.storage.getDirectory();
  const defaultDirectory = await opfsRoot.getDirectoryHandle("default");
  const targetDirectory = await defaultDirectory.getDirectoryHandle(uuid.data);

  let zip = new JSZip();

  for await (const [rootName, rootHandle] of targetDirectory.entries()) {
    if (rootHandle.kind === "file") {
      const fileHandle: FileSystemFileHandle =
        rootHandle as FileSystemFileHandle;
      const file: File = await fileHandle.getFile();
      zip = zip.file(rootName, file);
    } else if (rootHandle.kind === "directory") {
      const directoryHandle: FileSystemDirectoryHandle =
        rootHandle as FileSystemDirectoryHandle;
      for await (const [
        subfolderName,
        subfolderHandle,
      ] of directoryHandle.entries()) {
        const fileHandle: FileSystemFileHandle =
          subfolderHandle as FileSystemFileHandle;
        const file: File = await fileHandle.getFile();
        zip = zip.file(`${rootName}/${subfolderName}`, file);
      }
    }
  }

  const zipFileData = await zip.generateAsync({ type: "arraybuffer" });

  const pkpassFile = new File([zipFileData], `${uuid.data}.pkpass`, {
    type: "application/vnd.apple.pkpass",
  });

  self.postMessage(pkpassFile);
};

export {};
