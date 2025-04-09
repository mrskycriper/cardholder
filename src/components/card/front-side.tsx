import { Card, Image } from "react-bootstrap";
import { toCanvas } from "bwip-js";
import {
  Barcode,
  BarcodeFormat,
  BarcodeSizing,
} from "../../interfaces/barcode";
import { PassFieldType } from "../../interfaces/pass-fields";
import { PassBundleShort } from "../../interfaces/pass";
import { getPassType } from "../../utilities/get-pass-type";
import { getBCIDFromBarcodeFormat } from "../../utilities/get-bcid-from-barcode-format";
import FieldBlock from "../field-block";

interface CardProps {
  passBundle: PassBundleShort;
}

function FrontSide({ passBundle }: CardProps) {
  const pass = passBundle.objects.pass;
  const passType = getPassType(pass);
  const passFields = pass[passType];
  const headerFields = passFields
    ? passFields[PassFieldType.Header]
    : undefined;
  const primaryFields = passFields
    ? passFields[PassFieldType.Primary]
    : undefined;
  const secondaryFields = passFields
    ? passFields[PassFieldType.Secondary]
    : undefined;
  const auxiliaryFields = passFields
    ? passFields[PassFieldType.Auxiliary]
    : undefined;

  let barcode: Barcode | undefined;

  if (pass.barcodes && pass.barcodes.length > 0) {
    barcode = pass.barcodes[0];
  } else if (pass.barcode) {
    barcode = pass.barcode;
  }

  const barcodeSize: BarcodeSizing = {};

  if (barcode) {
    if (barcode.format === BarcodeFormat.Aztec) {
      //barcodeSize["height"] = 27;
      //barcodeSize["width"] = 27;
    } else if (barcode.format === BarcodeFormat.QR) {
      barcodeSize["height"] = 25;
      barcodeSize["width"] = 25;
    } else if (barcode.format === BarcodeFormat.PDF417) {
      //barcodeSize["height"] = 12;
    } else if (barcode.format === BarcodeFormat.Code128) {
      barcodeSize["height"] = 8;
    }
  }

  return (
    <Card
      className="w-100 d-flex flex-column"
      style={{
        height: "35rem",
        backgroundColor: pass.backgroundColor,
        color: pass.foregroundColor,
      }}
    >
      <Card.Header className="d-flex border-0 bg-transparent justify-content-between">
        {passBundle.files.logo ? (
          <Image
            src={passBundle.files.logo}
            fluid
            style={{ maxHeight: "3rem", maxWidth: "10rem" }}
          />
        ) : null}
        {pass.logoText ? <Card.Title>{pass.logoText}</Card.Title> : null}
        {headerFields && headerFields.length > 0 ? (
          <FieldBlock
            field={headerFields[0]}
            uppercaseLabel
            reduceLabelSize
            labelColor={pass.labelColor}
            valueColor={pass.foregroundColor}
          />
        ) : null}
      </Card.Header>
      {passBundle.files.strip ? (
        <Image src={passBundle.files.strip} fluid style={{ width: "100%" }} />
      ) : null}
      <Card.Body className="d-flex flex-column gap-2">
        {primaryFields ? (
          <div className="d-flex gap-2 justify-content-between">
            {primaryFields.map((field) => (
              <FieldBlock
                key={field.key}
                field={field}
                uppercaseLabel
                reduceLabelSize
                labelColor={pass.labelColor}
                valueColor={pass.foregroundColor}
              />
            ))}
          </div>
        ) : null}
        {secondaryFields ? (
          <div className="d-flex gap-2 justify-content-between flex-wrap">
            {secondaryFields.map((field) => (
              <FieldBlock
                key={field.key}
                field={field}
                uppercaseLabel
                reduceLabelSize
                labelColor={pass.labelColor}
                valueColor={pass.foregroundColor}
              />
            ))}
          </div>
        ) : null}
        {auxiliaryFields ? (
          <div className="d-flex gap-2 justify-content-between flex-wrap">
            {auxiliaryFields.map((field) => (
              <FieldBlock
                key={field.key}
                field={field}
                uppercaseLabel
                reduceLabelSize
                labelColor={pass.labelColor}
                valueColor={pass.foregroundColor}
              />
            ))}
          </div>
        ) : null}
      </Card.Body>
      <Card.Footer className="d-flex border-0 bg-transparent justify-content-center">
        {barcode ? (
          <Card className="bg-white">
            <Card.Body className="p-2 d-flex flex-column justify-content-center">
              <canvas
                ref={(canvas) => {
                  if (!canvas) {
                    return;
                  }

                  toCanvas(canvas, {
                    bcid: getBCIDFromBarcodeFormat(barcode.format),
                    text: barcode.message,
                    ...barcodeSize,
                  });
                }}
              />
              {barcode.altText ? (
                <div className="pt-2" style={{resize: "horizontal", containerType: "inline-size"}}>
                  <Card.Text  className="text-center text-dark lh-1">{barcode.altText}</Card.Text>
                </div>
              ) : null}
            </Card.Body>
          </Card>
        ) : null}
      </Card.Footer>
    </Card>
  );
}

export default FrontSide;
