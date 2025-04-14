import { Button, Card } from "react-bootstrap";
import { PassFieldType } from "../../interfaces/pass-fields";
import { PassBundleShort } from "../../interfaces/pass";
import { removeCard } from "../../store";
import { useAppDispatch } from "../../store/hooks";
import FieldBlock from "../field-block";
import { useMemo } from "react";
import { translateFields } from "../../utilities/translate-fields";

interface BackSideProps {
  passBundle: PassBundleShort;
  onCardClose: () => void;
}

function BackSide({ passBundle, onCardClose }: BackSideProps) {
  const dispatch = useAppDispatch();
  const pass = passBundle.objects.pass;
  const backFields = translateFields(passBundle, PassFieldType.Back);
  // const passType = getPassType(pass);
  // const passFields = pass[passType];

  // let rawBackFields = passFields ? passFields[PassFieldType.Back] : undefined;

  // if (rawBackFields === undefined) {
  //   rawBackFields = pass.backFields ? pass.backFields : undefined;
  // }

  // let backFields: PassField[] | undefined;

  // if (rawBackFields) {
  //   if (passBundle.objects.translations) {
  //     backFields = [];
  //     for (const rawField of rawBackFields) {
  //       const newField: PassField = {
  //         key: rawField.key,
  //       };
  //       const label = rawField.label;
  //       const value = rawField.value?.toString();
  //       if (label) {
  //         if (label.search("_") !== -1) {
  //           newField.label = passBundle.objects.translations["ru"][label];
  //         } else {
  //           newField.label = label;
  //         }
  //         if (value !== undefined) {
  //           if (value.search("_") !== -1) {
  //             newField.value = passBundle.objects.translations["ru"][value];
  //           } else {
  //             newField.value = value;
  //           }
  //         }
  //         backFields.push(newField);
  //       }
  //     }
  //   } else {
  //     backFields = rawBackFields;
  //   }
  // }

  const deleteWorker: Worker = useMemo(
    () =>
      new Worker(new URL("./delete-worker.ts", import.meta.url), {
        type: "module",
      }),
    []
  );

  const handleCardRemoval = () => {
    onCardClose();
    deleteWorker.postMessage(passBundle.id);
    dispatch(removeCard(passBundle.id));
  };

  return (
    <div className="d-flex flex-column gap-5">
      <h2 className="text-center fw-bold">{pass.description}</h2>
      <Button variant="outline-danger" onClick={handleCardRemoval}>
        Удалить карту
      </Button>
      {backFields ? (
        <Card className="w-100">
          <Card.Body className="d-flex flex-column gap-3">
            {backFields.map((field) => (
              <FieldBlock key={field.key} field={field} allowNestedHTML />
            ))}
          </Card.Body>
        </Card>
      ) : null}
    </div>
  );
}

export default BackSide;
