import { Pass, PassType } from "../interfaces/pass";
import { PassField, PassFieldType } from "../interfaces/pass-fields";

export const extractFields = (
  pass: Pass,
  passType: PassType,
  fieldType: PassFieldType
): PassField[] | undefined => {
  const fieldsObject = pass[passType];
  if (fieldsObject !== undefined) {
    const fieldsArray = fieldsObject[fieldType];
    if (fieldsArray !== undefined) {
      if (fieldsArray.length > 0) {
        return fieldsArray;
      }
    }
  }
};
