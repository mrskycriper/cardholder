import { BarcodeFormat, BCID } from "../interfaces/barcode";

export const getBCIDFromBarcodeFormat = (format: BarcodeFormat): BCID => {
  let result: BCID;
  switch (format) {
    case BarcodeFormat.QR: {
      result = BCID.QR;
      break;
    }
    case BarcodeFormat.PDF417: {
      result = BCID.PDF417;
      break;
    }
    case BarcodeFormat.Aztec: {
      result = BCID.Aztec;
      break;
    }
    case BarcodeFormat.Code128: {
      result = BCID.Code128;
      break;
    }
  }
  return result;
};
