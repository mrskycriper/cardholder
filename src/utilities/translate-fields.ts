import { PassBundleShort } from "../interfaces/pass";
import { PassField, PassFieldType } from "../interfaces/pass-fields";
import { getPassType } from "./get-pass-type";

export const translateFields = (
  passBundle: PassBundleShort,
  fieldType: PassFieldType
): PassField[] | undefined => {
  const pass = passBundle.objects.pass;
  const passType = getPassType(pass);
  const passFields = pass[passType];
  const rawFields = passFields ? passFields[fieldType] : undefined;

  let fields: PassField[] | undefined;

  if (rawFields) {
    if (passBundle.objects.translations) {
      fields = [];
      for (const rawField of rawFields) {
        const newField: PassField = {
          key: rawField.key,
        };
        const label = rawField.label;
        const value = rawField.value?.toString();
        if (label) {
          if (label.search("_") !== -1) {
            newField.label = passBundle.objects.translations["ru"][label];
          } else {
            newField.label = label;
          }
          if (value !== undefined) {
            if (value.search("_") !== -1) {
              newField.value = passBundle.objects.translations["ru"][value];
            } else {
              newField.value = value;
            }
          }
          fields.push(newField);
        }
      }
    } else {
      fields = rawFields;
    }
  }
  return fields;
};
