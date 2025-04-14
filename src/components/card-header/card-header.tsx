import { Card } from "react-bootstrap";
import { PassFieldType } from "../../interfaces/pass-fields";
import { PassBundleShort } from "../../interfaces/pass";
import FieldBlock from "../field-block";
import { translateFields } from "../../utilities/translate-fields";

interface CardHeaderProps {
  passBundle: PassBundleShort;
}

function CardHeader({ passBundle }: CardHeaderProps) {
  const pass = passBundle.objects.pass;
  let headerFields = translateFields(passBundle, PassFieldType.Header);
  if (headerFields) {
    headerFields = headerFields.slice(0, 3);
  }

  return (
    <Card.Header
      className="d-flex border-0 bg-transparent justify-content-between align-items-center"
      style={{
        height: "5rem",
      }}
    >
      {passBundle.files.logo ? (
        <img
          src={passBundle.files.logo}
          style={{ height: "3rem", maxWidth: "10rem" }}
          className="object-fit-contain"
        />
      ) : null}
      {pass.logoText ? (
        <Card.Title className="m-0 fs-6">{pass.logoText}</Card.Title>
      ) : null}
      {headerFields && headerFields.length > 0 ? (
        <div className="d-flex h-100 gap-2 align-items-center">
          {headerFields.map((field) => (
            <FieldBlock
              key={field.key}
              field={field}
              uppercaseLabel
              reduceLabelSize
              labelColor={pass.labelColor}
              valueColor={pass.foregroundColor}
              alignRight
            />
          ))}
        </div>
      ) : null}
    </Card.Header>
  );
}

export default CardHeader;
