import { DEFAULT_FOLDER } from "../../constants/files";

self.onmessage = async () => {
  const opfsRoot = await navigator.storage.getDirectory();
  console.log(await opfsRoot.getDirectoryHandle(DEFAULT_FOLDER));
  await opfsRoot.removeEntry(DEFAULT_FOLDER, { recursive: true });
  self.postMessage("DONE");
};

export {};
