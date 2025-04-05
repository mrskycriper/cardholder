import { Barcode } from "./barcode";
import { PassFields, BoardingPassFields } from "./pass-fields";

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
}

export interface PassBundleShort {
  id: string;
  objects: {
    pass: Pass;
  };
  files: {
    icon?: string;
    logo?: string;
  };
}
