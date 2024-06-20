/* eslint-disable no-restricted-globals */

interface Entry {
    name: string,
    file: File
}

self.onmessage = async (e: MessageEvent<String>) => {
    console.log(`Worker: got ${e.data}`)
    const opfsRoot = await navigator.storage.getDirectory();
    const defaultDirectory = await opfsRoot.getDirectoryHandle("default", {
        create: true,
    });

    const files: Entry[] = [];

    // @ts-ignore
    for await (const [key, value] of defaultDirectory.entries()) {
        //console.log({ key, value });
        // @ts-ignore
        const fileHandle = await value.getFileHandle('pass.json');
        const file = await fileHandle.getFile()
        files.push({ name: key, file: file })
    }

    // const fileHandle = await defaultDirectory.getFileHandle(e.data.name, {
    //     create: true,
    // });

    // // @ts-ignore
    // // Thinks property 'createSyncAccessHandle' does not exist on type 'FileSystemFileHandle' for some reason
    // const accessHandle = await fileHandle.createSyncAccessHandle();
    // const fileData = await e.data.arrayBuffer()
    // accessHandle.write(fileData)
    // accessHandle.close()

    self.postMessage(files);
};

export { };
