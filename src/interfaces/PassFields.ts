import PassField from "./PassField";

export interface PassFields {
    headerFields?: PassField[],
    primaryFields?: PassField[],
    secondaryFields?: PassField[],
    auxiliaryFields?: PassField[],
    backFields?: PassField[],
}

export interface BoardingPassFields extends PassFields {
    transitType: 'PKTransitTypeAir' | 'PKTransitTypeBoat' | 'PKTransitTypeBus' | 'PKTransitTypeGeneric' | 'PKTransitTypeTrain'
}