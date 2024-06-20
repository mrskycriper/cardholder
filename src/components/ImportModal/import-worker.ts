/* eslint-disable no-restricted-globals */

self.onmessage = async (e: MessageEvent<File>) => {
    console.log(`Worker: got ${e.data.name}`)
    const opfsRoot = await navigator.storage.getDirectory();
    const defaultDirectory = await opfsRoot.getDirectoryHandle("default", {
        create: true,
    });
    const fileHandle = await defaultDirectory.getFileHandle(e.data.name, {
        create: true,
    });
    // @ts-ignore
    // Thinks property 'createSyncAccessHandle' does not exist on type 'FileSystemFileHandle' for some reason
    const accessHandle = await fileHandle.createSyncAccessHandle();
    const fileData = await e.data.arrayBuffer()
    accessHandle.write(fileData)
    accessHandle.close()

    self.postMessage(`Saved ${e.data.name}`);
};
  
export {};
