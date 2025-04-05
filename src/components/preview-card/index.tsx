import { Card as BootstrapCard, Image } from "react-bootstrap";
import { PassField, PassFieldType } from "../../interfaces/pass-fields";
import { Pass, PassType, PassBundleShort } from "../../interfaces/pass";
import { getPassType } from "../../utilities/get-pass-type";
import { extractFields } from "../../utilities/extract-fields";

function PreviewCard({ passBundle }: { passBundle: PassBundleShort }) {
  const pass: Pass = passBundle.objects.pass;
  const passType: PassType = getPassType(pass);
  const headerFields: PassField[] | undefined = extractFields(
    pass,
    passType,
    PassFieldType.Header
  );

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
          <Image
            src={passBundle.files.logo}
            fluid
            style={{ maxHeight: "3rem", maxWidth: "10rem" }}
          />
        ) : null}
        {pass.logoText !== undefined ? (
          <BootstrapCard.Title>{pass.logoText}</BootstrapCard.Title>
        ) : null}
        {headerFields ? (
          <div className="d-flex flex-column">
            <BootstrapCard.Subtitle
              className="m-0 text-uppercase text-end text-break"
              style={{ color: pass.labelColor }}
            >
              {headerFields[0].label}
            </BootstrapCard.Subtitle>
            <BootstrapCard.Text className="text-end text-break">
              {headerFields[0].value}
            </BootstrapCard.Text>
          </div>
        ) : null}
      </BootstrapCard.Header>
    </BootstrapCard>
  );
}

export default PreviewCard;
