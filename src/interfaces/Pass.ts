import Barcode from "./Barcode"
import {PassFields, BoardingPassFields } from "./PassFields"

export default interface Pass {
    formatVersion: number,
    passTypeIdentifier: string,
    logoText?: string,
    organizationName: string,
    description: string,
    storeCard?: PassFields,
    generic?: PassFields,
    boardingPass?: BoardingPassFields,
    coupon?: PassFields,
    eventTicket?: PassFields,
    barcodes?: Barcode[],
    barcode?: Barcode,
    labelColor: string,
    foregroundColor: string,
    backgroundColor: string
}

export type PassType = 'storeCard' | 'boardingPass' | 'coupon' | 'eventTicket' | 'generic'