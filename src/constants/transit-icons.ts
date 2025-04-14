import { PKTransitType } from "../interfaces/pass-fields";

export const TRANSIT_ICONS: Record<PKTransitType, string> = {
  PKTransitTypeAir: "ri-plane-fill",
  PKTransitTypeBoat: "ri-ship-fill",
  PKTransitTypeBus: "ri-bus-fill",
  PKTransitTypeTrain: "ri-train-fill",
  PKTransitTypeGeneric: "ri-arrow-right-fill",
};