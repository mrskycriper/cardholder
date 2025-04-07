import { Button, Card } from "react-bootstrap";
import { PassFieldType } from "../../interfaces/pass-fields";
import { PassBundleShort } from "../../interfaces/pass";
import { getPassType } from "../../utilities/get-pass-type";
import FieldBlock from "../field-block";

interface BackSideProps {
  passBundle: PassBundleShort;
}

function BackSide({ passBundle }: BackSideProps) {
  const pass = passBundle.objects.pass;
  const passType = getPassType(pass);
  const passFields = pass[passType];
  let backFields = passFields ? passFields[PassFieldType.Back] : undefined;
  if (backFields === undefined) {
    backFields = pass.backFields ? pass.backFields : undefined;
  }

  return (
    <div className="d-flex flex-column gap-5">
      <h2 className="text-center fw-bold">{pass.description}</h2>
      <Button variant="outline-danger">Удалить карту</Button>
      {backFields ? (
        <Card className="w-100">
          <Card.Body className="d-flex flex-column gap-3">
            {backFields.map((field) => (
              <FieldBlock key={field.key} field={field} allowNestedHTML/>
            ))}
          </Card.Body>
        </Card>
      ) : null}
    </div>
  );
}

export default BackSide;
