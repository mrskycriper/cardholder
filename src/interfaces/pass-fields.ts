export enum PKTextAlignment {
  Left = "PKTextAlignmentLeft",
  Center = "PKTextAlignmentCenter",
  Right = "PKTextAlignmentRight",
  Natural = "PKTextAlignmentNatural",
}

export enum PKNumberStyle {
  Decimal = "PKNumberStyleDecimal",
  Percent = "PKNumberStylePercent",
  Scientific = "PKNumberStyleScientific",
  SpellOut = "PKNumberStyleSpellOut",
}

export enum PKTransitType {
  Air = "PKTransitTypeAir",
  Boat = "PKTransitTypeBoat",
  Bus = "PKTransitTypeBus",
  Train = "PKTransitTypeTrain",
  Generic = "PKTransitTypeGeneric",
}

export interface PassField {
  key: string;
  label: string;
  value: string | number;
  textAlignment: PKTextAlignment;
  numberStyle: PKNumberStyle;
}

export enum PassFieldType {
    Header = "headerFields",
    Primary = "primaryFields",
    Secondary = "secondaryFields",
    Auxiliary = "auxiliaryFields",
    Back = "backFields"
}

export interface PassFields {
  headerFields?: PassField[];
  primaryFields?: PassField[];
  secondaryFields?: PassField[];
  auxiliaryFields?: PassField[];
  backFields?: PassField[];
}

export interface BoardingPassFields extends PassFields {
  transitType: PKTransitType;
}
