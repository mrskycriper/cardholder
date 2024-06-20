export default interface Barcode {
    altText: string,
    message: string,
    format: 'PKBarcodeFormatQR' | 'PKBarcodeFormatPDF417' | 'PKBarcodeFormatAztec' | 'PKBarcodeFormatCode128',
    messageEncoding: string
}