/* eslint-disable no-restricted-globals */

self.onmessage = async (_e: MessageEvent<String>) => {
    const opfsRoot = await navigator.storage.getDirectory();
    console.log(await opfsRoot.getDirectoryHandle("default"))
    await opfsRoot.removeEntry("default", { recursive: true })
    self.postMessage("DONE");
};

export { };