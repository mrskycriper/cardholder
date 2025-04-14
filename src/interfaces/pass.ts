import { Barcode } from "./barcode";
import { PassFields, BoardingPassFields, PassField } from "./pass-fields";

export enum PassType {
  Store = "storeCard",
  BoardingPass = "boardingPass",
  Coupon = "coupon",
  EventTicket = "eventTicket",
  Generic = "generic",
}

export interface Pass {
  formatVersion: number;
  passTypeIdentifier: string;
  logoText?: string;
  organizationName: string;
  description: string;
  storeCard?: PassFields;
  generic?: PassFields;
  boardingPass?: BoardingPassFields;
  coupon?: PassFields;
  eventTicket?: PassFields;
  barcodes?: Barcode[];
  barcode?: Barcode;
  labelColor: string;
  foregroundColor: string;
  backgroundColor: string;
  backFields?: PassField[];
}

export type Translation = Record<string, Record<string, string>>

export interface PassBundleShort {
  id: string;
  objects: {
    pass: Pass;
    translations?: Translation;
  };
  files: {
    icon?: string;
    logo?: string;
    strip?: string;
    background?: string;
    thumbnail?: string;
    footer?: string;
  };
}
