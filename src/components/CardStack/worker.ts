/* eslint-disable no-restricted-globals */

import PassBundle from '../../interfaces/IPassBundle';

self.onmessage = async (e: MessageEvent<String>) => {
    console.log(`Worker: got ${e.data}`)
    const opfsRoot = await navigator.storage.getDirectory();
    const defaultDirectory = await opfsRoot.getDirectoryHandle("default", {
        create: true,
    });

    const files: PassBundle[] = [];

    for await (const [directoryName, directoryHandle] of defaultDirectory.entries()) {
        // @ts-ignore
        const passFileHandle: FileSystemFileHandle = await directoryHandle.getFileHandle('pass.json');
        const passFile: File = await passFileHandle.getFile()
        const passObject = JSON.parse(await passFile.text())
        files.push({ name: directoryName, objects: {pass: passObject} })
    }

    self.postMessage(files);
};

export { };
