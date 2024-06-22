/* eslint-disable no-restricted-globals */

self.onmessage = async (_e: MessageEvent<String>) => {
    const estimate = await navigator.storage.estimate()
    self.postMessage(estimate);
};

export { };