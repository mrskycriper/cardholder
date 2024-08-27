/* eslint-disable no-restricted-globals */

self.onmessage = async () => {
    const estimate = await navigator.storage.estimate()
    self.postMessage(estimate);
};

export { };