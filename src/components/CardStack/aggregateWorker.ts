/* eslint-disable no-restricted-globals */

import PassBundle from '../../interfaces/PassBundle';

self.onmessage = async () => {
    const opfsRoot = await navigator.storage.getDirectory();
    const defaultDirectory = await opfsRoot.getDirectoryHandle("default", {
        create: true,
    });

    const files: PassBundle[] = [];

    for await (const [directoryName, directoryHandle] of defaultDirectory.entries()) {
        let passBundle: PassBundle

        // @ts-ignore
        const passFileHandle: FileSystemFileHandle = await directoryHandle.getFileHandle('pass.json');
        const passFile: File = await passFileHandle.getFile()
        const passObject = JSON.parse(await passFile.text())

        passBundle = { id: directoryName, objects: { pass: passObject }, files: {} }

        let logoFileHandle: FileSystemFileHandle | undefined = undefined;
        try {
            // @ts-ignore
            logoFileHandle = await directoryHandle.getFileHandle('logo.png');
        } catch (e) {
            // not found, silent skip
        }
        try {
            // @ts-ignore
            logoFileHandle = await directoryHandle.getFileHandle('logo@2x.png');
        } catch (e) {
            // not found, silent skip
        }
        try {
            // @ts-ignore
            logoFileHandle = await directoryHandle.getFileHandle('logo@3x.png');
        } catch (e) {
            // not found, silent skip
        }
        if (logoFileHandle !== undefined) {
            const logoFile: File = await logoFileHandle.getFile()
            passBundle.files.logo = logoFile
        }

        files.push(passBundle)
    }

    self.postMessage(files);
};

export { };
