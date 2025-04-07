import { Button, Card } from "react-bootstrap";
import { PassFieldType } from "../../interfaces/pass-fields";
import { PassBundleShort } from "../../interfaces/pass";
import { getPassType } from "../../utilities/get-pass-type";
import { removeCard } from "../../store";
import { useAppDispatch } from "../../store/hooks";
import FieldBlock from "../field-block";
import { useMemo } from "react";

interface BackSideProps {
  passBundle: PassBundleShort;
  onCardClose: () => void;
}

function BackSide({ passBundle, onCardClose }: BackSideProps) {
  const dispatch = useAppDispatch();
  const pass = passBundle.objects.pass;
  const passType = getPassType(pass);
  const passFields = pass[passType];
  let backFields = passFields ? passFields[PassFieldType.Back] : undefined;
  if (backFields === undefined) {
    backFields = pass.backFields ? pass.backFields : undefined;
  }

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
