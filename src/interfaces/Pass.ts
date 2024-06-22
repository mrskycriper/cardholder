import Barcode from "./Barcode"
import PassField from "./PassField"

export default interface Pass {
    formatVersion: number,
    passTypeIdentifier: string,
    logoText: string,
    organizationName: string,
    description: string,
    storeCard: {
        headerFields: PassField[],
        primaryFields: PassField[],
        secondaryFields: PassField[],
        auxiliaryFields: PassField[],
        backFields: PassField[],
    },
    barcodes?: Barcode[],
    barcode?: Barcode,
    labelColor: string,
    foregroundColor: string,
    backgroundColor: string
}