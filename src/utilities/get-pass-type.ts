import { Pass, PassType } from "../interfaces/pass";

export const getPassType = (pass: Pass): PassType => {
  let passType: PassType;
  if (pass.storeCard) {
    passType = PassType.Store;
  } else if (pass.boardingPass) {
    passType = PassType.BoardingPass;
  } else if (pass.coupon) {
    passType = PassType.Coupon;
  } else if (pass.eventTicket) {
    passType = PassType.EventTicket;
  } else {
    passType = PassType.Generic;
  }
  return passType;
};
