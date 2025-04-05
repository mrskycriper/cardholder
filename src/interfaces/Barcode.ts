export enum BarcodeFormat {
    QR = 'PKBarcodeFormatQR',
    PDF417 = 'PKBarcodeFormatPDF417',
    Aztec = 'PKBarcodeFormatAztec',
    Code128 = 'PKBarcodeFormatCode128'
};

export enum BCID {
    QR = 'qrcode',
    PDF417 = 'pdf417',
    Aztec = 'azteccode',
    Code128 = 'code128'
}

export interface Barcode {
    altText?: string,
    message: string,
    format: BarcodeFormat,
    messageEncoding: string
}
