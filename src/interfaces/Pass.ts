import Barcode from "./Barcode"

interface passField {
    key: string,
    label: string,
    value: string | number,
    textAlignment: 'PKTextAlignmentLeft' | 'PKTextAlignmentCenter' | 'PKTextAlignmentRight' | 'PKTextAlignmentNatural',
    numberStyle: 'PKNumberStyleDecimal' | 'PKNumberStylePercent' | 'PKNumberStyleScientific' | 'PKNumberStyleSpellOut',
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
    barcodes: Barcode[],
    labelColor: string,
    foregroundColor: string,
    backgroundColor: string
}