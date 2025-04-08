import { DEFAULT_FOLDER } from "../../constants/files";

self.onmessage = async (uuid: MessageEvent<string>) => {
  try {
    const opfsRoot = await navigator.storage.getDirectory();
    const defaultDirectory = await opfsRoot.getDirectoryHandle(DEFAULT_FOLDER);
    const targetDirectory = await defaultDirectory.getDirectoryHandle(
      uuid.data
    );
    const pkpassFileHandle = await targetDirectory.getFileHandle(
      uuid.data + ".pkpass"
    );
    const pkpassFile = await pkpassFileHandle.getFile();
    self.postMessage(pkpassFile);
  } catch (e) {
    console.log(e);
  }
};

export {};
