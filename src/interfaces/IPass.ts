interface passField {
    key: string,
    label: string,
    value: string | number,
    textAlignment: 'PKTextAlignmentLeft' | 'PKTextAlignmentCenter' | 'PKTextAlignmentRight' | 'PKTextAlignmentNatural',
    numberStyle: 'PKNumberStyleDecimal' | 'PKNumberStylePercent' | 'PKNumberStyleScientific' | 'PKNumberStyleSpellOut',
}

interface barcode {
    altText: string,
    message: string,
    format: 'PKBarcodeFormatQR' | 'PKBarcodeFormatPDF417' | 'PKBarcodeFormatAztec' | 'PKBarcodeFormatCode128',
    messageEncoding: string
}

export default interface Pass {
    formatVersion: number,
    passTypeIdentifier: string,
    logoText: string,
    organizationName: string,
    description: string,
    storeCard: {
        headerFields: passField[],
        primaryFields: passField[],
        secondaryFields: passField[],
        auxiliaryFields: passField[],
        backFields: passField[],
    },
    barcodes: barcode[],
    labelColor: string,
    foregroundColor: string,
    backgroundColor: string
}