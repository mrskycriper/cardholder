/* eslint-disable no-restricted-globals */

import JSZip from "jszip";

self.onmessage = async (uuid: MessageEvent<String>) => {
    const opfsRoot = await navigator.storage.getDirectory();
    const defaultDirectory = await opfsRoot.getDirectoryHandle("default");
    const targetDirectory = await defaultDirectory.getDirectoryHandle(`${uuid}.pkpass`);

    let zip = new JSZip();

    for await (const [rootName, rootHandle] of targetDirectory.entries()) {
        if (rootHandle.kind === 'file') {
            // @ts-ignore
            const fileHandle: FileSystemFileHandle = rootHandle;
            const file: File = await fileHandle.getFile()
            zip = zip.file(rootName, file)
        } else if (rootHandle.kind === 'directory') {
            // @ts-ignore
            const directoryHandle: FileSystemDirectoryHandle = rootHandle;
            for await (const [subfolderName, subfolderHandle] of directoryHandle.entries()) {
                // @ts-ignore
                const fileHandle: FileSystemFileHandle = subfolderHandle;
                const file: File = await fileHandle.getFile()
                zip = zip.file(`${rootName}/${subfolderName}`, file)
            }
        }
    }

    const zipFileData = await zip.generateAsync({type: 'arraybuffer'})

    const pkpassFile = new File([zipFileData], `${uuid}.pkpass`, {
        type: "application/vnd.apple.pkpass",
      });

    self.postMessage(pkpassFile);
};

export { };
