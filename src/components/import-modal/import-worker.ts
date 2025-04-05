import JSZip from "jszip";
import { PassBundleShort } from "../../interfaces/pass";

self.onmessage = async (e: MessageEvent<File>) => {
  const rawZipData = await e.data.arrayBuffer();

  const opfsRoot = await navigator.storage.getDirectory();
  const defaultDirectory = await opfsRoot.getDirectoryHandle("default", {
    create: true,
  });
  const uuid = self.crypto.randomUUID();
  console.log("New card with ID: " + uuid);
  const unzippedDirectory = await defaultDirectory.getDirectoryHandle(uuid, {
    create: true,
  });

  const entries: JSZip.JSZipObject[] = [];
  const zip = new JSZip();
  await zip.loadAsync(rawZipData);
  zip.forEach(function (_relativePath, zipEntry) {
    entries.push(zipEntry);
  });

  for (const entry of entries) {
    const fileHandle = await unzippedDirectory.getFileHandle(entry.name, {
      create: true,
    });
    // @ts-expect-error Crotch for missing type definitions (property 'createSyncAccessHandle' does not exist on type 'FileSystemFileHandle')
    const accessHandle = await fileHandle.createSyncAccessHandle();
    const fileData = await entry.async("arraybuffer");
    accessHandle.write(fileData);
    accessHandle.close();
  }

  const passFileHandle = await unzippedDirectory.getFileHandle("pass.json");
  const passFile = await passFileHandle.getFile();
  const passObject = JSON.parse(await passFile.text());

  const passBundle: PassBundleShort = {
    id: uuid,
    objects: { pass: passObject },
    files: {},
  };

  let logoFileHandle: FileSystemFileHandle | undefined = undefined;
  try {
    logoFileHandle = await unzippedDirectory.getFileHandle("logo.png");
  } catch (e) {
    // not found, silent skip
  }
  try {
    logoFileHandle = await unzippedDirectory.getFileHandle("logo@2x.png");
  } catch (e) {
    // not found, silent skip
  }
  try {
    logoFileHandle = await unzippedDirectory.getFileHandle("logo@3x.png");
  } catch (e) {
    // not found, silent skip
  }
  if (logoFileHandle !== undefined) {
    const logoFile: File = await logoFileHandle.getFile();
    passBundle.files.logo = URL.createObjectURL(logoFile);
  }

  let iconFileHandle: FileSystemFileHandle | undefined = undefined;
  try {
    iconFileHandle = await unzippedDirectory.getFileHandle("icon.png");
  } catch (e) {
    // not found, silent skip
  }
  try {
    iconFileHandle = await unzippedDirectory.getFileHandle("icon@2x.png");
  } catch (e) {
    // not found, silent skip
  }
  try {
    iconFileHandle = await unzippedDirectory.getFileHandle("icon@3x.png");
  } catch (e) {
    // not found, silent skip
  }
  if (iconFileHandle !== undefined) {
    const iconFile: File = await iconFileHandle.getFile();
    passBundle.files.icon = URL.createObjectURL(iconFile);
  }

  self.postMessage(passBundle);
};

export {};
