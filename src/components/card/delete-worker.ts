import { DEFAULT_FOLDER } from "../../constants/files";
import { WORKER_DONE } from "../../constants/workers";

self.onmessage = async (uuid: MessageEvent<string>) => {
  try {
    const opfsRoot = await navigator.storage.getDirectory();
    const defaultDirectory = await opfsRoot.getDirectoryHandle(DEFAULT_FOLDER);
    await defaultDirectory.removeEntry(uuid.data, { recursive: true });
  } catch (e) {
    console.log(e);
  }
  self.postMessage(WORKER_DONE);
};

export {};
