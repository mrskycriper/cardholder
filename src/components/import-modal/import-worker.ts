import JSZip from "jszip";

self.onmessage = async (e: MessageEvent<File>) => {
    const opfsRoot = await navigator.storage.getDirectory();
    const defaultDirectory = await opfsRoot.getDirectoryHandle("default", {
        create: true,
    });
    const uuid = self.crypto.randomUUID();
    const unzippedDirectory = await defaultDirectory.getDirectoryHandle(uuid, {
        create: true,
    });

    JSZip.loadAsync(await e.data.arrayBuffer())
        .then(function (zip) {
            zip.forEach(async function (_relativePath, zipEntry) {
                const fileHandle = await unzippedDirectory.getFileHandle(zipEntry.name, {
                    create: true,
                });
                // @ts-expect-error Crotch for missing type definitions (property 'createSyncAccessHandle' does not exist on type 'FileSystemFileHandle')
                const accessHandle = await fileHandle.createSyncAccessHandle();
                const fileData = await zipEntry.async('arraybuffer');
                accessHandle.write(fileData)
                accessHandle.close()
            });
        }, function (e) {
            console.log(`Worker: got error ${e}`)
        });

    self.postMessage(`Saved ${e.data.name}`);
};

export { };
