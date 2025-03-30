import { Card as BootstrapCard, Image } from "react-bootstrap";

import Pass, { PassType } from "../../interfaces/pass";
import PassBundle from "../../interfaces/pass-bundle";
import { PassFieldType } from "../../interfaces/pass-fields";
import PassField from "../../interfaces/pass-field";

function getPassType(pass: Pass): PassType {
  let passType: PassType;
  if (pass.storeCard) {
    passType = "storeCard";
  } else if (pass.boardingPass) {
    passType = "boardingPass";
  } else if (pass.coupon) {
    passType = "coupon";
  } else if (pass.eventTicket) {
    passType = "eventTicket";
  } else {
    passType = "generic";
  }
  return passType;
}

function getFields(
  pass: Pass,
  passType: PassType,
  fieldType: PassFieldType
): PassField[] | undefined {
  const fieldsObject = pass[passType];
  if (fieldsObject !== undefined) {
    const fieldsArray = fieldsObject[fieldType];
    if (fieldsArray !== undefined) {
      if (fieldsArray.length > 0) {
        return fieldsArray;
      }
    }
  }
}

function PreviewCard({ passBundle }: { passBundle: PassBundle }) {
  const pass: Pass = passBundle.objects.pass;

  const passType: PassType = getPassType(pass);
  const headerFields: PassField[] | undefined = getFields(
    pass,
    passType,
    "headerFields"
  );

  let logoSrc = "";
  if (passBundle.files.logo) {
    logoSrc = URL.createObjectURL(passBundle.files.logo);
  }

  return (
    <BootstrapCard
      className="w-100 d-flex flex-column justify-content-center"
      style={{
        minHeight: "5rem",
        backgroundColor: pass.backgroundColor,
        color: pass.foregroundColor,
      }}
    >
      <BootstrapCard.Header className="d-flex border-0 bg-transparent justify-content-between">
        {passBundle.files.logo ? (
          <Image src={logoSrc} fluid style={{ maxHeight: "3rem", maxWidth: "10rem" }} />
        ) : null}
        {pass.logoText !== undefined ? (
          <BootstrapCard.Title>{pass.logoText}</BootstrapCard.Title>
        ) : null}
        {headerFields
          ? headerFields.map((field) => (
              <div className="d-flex flex-column">
                <BootstrapCard.Subtitle className="m-0 text-uppercase text-end text-break" style={{ color: pass.labelColor }}>
                  {field.label}
                </BootstrapCard.Subtitle>
                <BootstrapCard.Text className="text-end text-break">{field.value}</BootstrapCard.Text>
              </div>
            ))
          : null}
      </BootstrapCard.Header>
    </BootstrapCard>
  );
}

export default PreviewCard;
