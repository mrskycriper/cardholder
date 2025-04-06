import { useState, useMemo } from "react";
import {
  Card as BootstrapCard,
  Button,
  ButtonGroup,
  Image,
} from "react-bootstrap";
import { toSVG } from "bwip-js";
import { Barcode } from "../../interfaces/barcode";
import { PassField, PassFieldType } from "../../interfaces/pass-fields";
import { PassType, Pass, PassBundleShort } from "../../interfaces/pass";
import { getPassType } from "../../utilities/get-pass-type";
import { extractFields } from "../../utilities/extract-fields";
import { getBCIDFromBarcodeFormat } from "../../utilities/get-bcid-from-barcode-format";

function Card({
  passId,
  passBundle,
}: {
  passId: string;
  passBundle: PassBundleShort;
}) {
  const [showFront, setShowFront] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const handleExpandFront = () => {
    setShowBack(false);
    setShowFront(!showFront);
  };
  const handleExpandBack = () => {
    setShowFront(false);
    setShowBack(!showBack);
  };
  const shareWorker: Worker = useMemo(
    () =>
      new Worker(new URL("./share-worker.ts", import.meta.url), {
        type: "module",
      }),
    []
  );

  const handleShare = async () => {
    shareWorker.postMessage(passId);
    shareWorker.onmessage = async (event: MessageEvent<File>) => {
      await navigator.share({
        files: [event.data],
      });
    };
  };

  const pass: Pass = passBundle.objects.pass;

  const passType: PassType = getPassType(pass);
  const headerFields: PassField[] | undefined = extractFields(
    pass,
    passType,
    PassFieldType.Header
  );
  const primaryFields: PassField[] | undefined = extractFields(
    pass,
    passType,
    PassFieldType.Primary
  );
  const secondaryFields: PassField[] | undefined = extractFields(
    pass,
    passType,
    PassFieldType.Secondary
  );
  const auxiliaryFields: PassField[] | undefined = extractFields(
    pass,
    passType,
    PassFieldType.Auxiliary
  );
  const backFields: PassField[] | undefined = extractFields(
    pass,
    passType,
    PassFieldType.Back
  );

  let barcode: Barcode;
  let barcodeSvg = "";

  if (pass.barcodes) {
    if (pass.barcodes.length > 0) {
      barcode = pass.barcodes[0];
      if (barcode.altText !== undefined) {
        barcodeSvg = toSVG({
          bcid: getBCIDFromBarcodeFormat(barcode.format),
          text: barcode.message,
          alttext: barcode.altText,
        });
      } else {
        barcodeSvg = toSVG({
          bcid: getBCIDFromBarcodeFormat(barcode.format),
          text: barcode.message,
        });
      }
    }
  } else if (pass.barcode) {
    barcode = pass.barcode;
    if (barcode.altText !== undefined) {
      barcodeSvg = toSVG({
        bcid: getBCIDFromBarcodeFormat(barcode.format),
        text: barcode.message,
        alttext: barcode.altText,
      });
    } else {
      barcodeSvg = toSVG({
        bcid: getBCIDFromBarcodeFormat(barcode.format),
        text: barcode.message,
      });
    }
  }

  return (
    <BootstrapCard
      style={{
        width: "20rem",
        backgroundColor: pass.backgroundColor,
        color: pass.foregroundColor,
      }}
    >
      <BootstrapCard.Header>
        {passBundle.files.logo ? (
          <Image src={passBundle.files.logo} style={{ maxWidth: "50%" }} />
        ) : null}
        {pass.logoText !== undefined ? (
          <BootstrapCard.Title>{pass.logoText}</BootstrapCard.Title>
        ) : null}
        {headerFields
          ? headerFields.map((field) => (
              <>
                <BootstrapCard.Subtitle style={{ color: pass.labelColor }}>
                  {field.label}
                </BootstrapCard.Subtitle>
                <BootstrapCard.Text>{field.value}</BootstrapCard.Text>
              </>
            ))
          : null}
      </BootstrapCard.Header>
      {showFront ? (
        <BootstrapCard.Body>
          {primaryFields
            ? primaryFields.map((field) => (
                <>
                  <BootstrapCard.Subtitle style={{ color: pass.labelColor }}>
                    {field.label}
                  </BootstrapCard.Subtitle>
                  <BootstrapCard.Text>{field.value}</BootstrapCard.Text>
                </>
              ))
            : null}
          {secondaryFields
            ? secondaryFields.map((field) => (
                <>
                  <BootstrapCard.Subtitle style={{ color: pass.labelColor }}>
                    {field.label}
                  </BootstrapCard.Subtitle>
                  <BootstrapCard.Text>{field.value}</BootstrapCard.Text>
                </>
              ))
            : null}
          {auxiliaryFields
            ? auxiliaryFields.map((field) => (
                <>
                  <BootstrapCard.Subtitle style={{ color: pass.labelColor }}>
                    {field.label}
                  </BootstrapCard.Subtitle>
                  <BootstrapCard.Text>{field.value}</BootstrapCard.Text>
                </>
              ))
            : null}
          {barcodeSvg !== "" ? (
            <svg
              dangerouslySetInnerHTML={{ __html: barcodeSvg }}
              style={{ background: "white", maxWidth: "100%" }}
            />
          ) : null}
        </BootstrapCard.Body>
      ) : null}
      {showBack ? (
        <BootstrapCard.Body>
          {backFields
            ? backFields.map((field) => (
                <>
                  <BootstrapCard.Subtitle style={{ color: pass.labelColor }}>
                    {field.label}
                  </BootstrapCard.Subtitle>
                  <BootstrapCard.Text>{field.value}</BootstrapCard.Text>
                </>
              ))
            : null}
        </BootstrapCard.Body>
      ) : null}
      <BootstrapCard.Footer>
        <ButtonGroup>
          <Button onClick={handleShare}>
            <i className={"ri-share-2-fill"} />
          </Button>
          <Button onClick={handleExpandFront}>
            {showFront ? (
              <i className={"ri-contract-up-down-fill"} />
            ) : (
              <i className={"ri-expand-up-down-fill"} />
            )}
          </Button>
          <Button onClick={handleExpandBack}>
            {showBack ? (
              <i className={"ri-close-circle-fill"} />
            ) : (
              <i className={"ri-information-fill"} />
            )}
          </Button>
        </ButtonGroup>
      </BootstrapCard.Footer>
    </BootstrapCard>
  );
}

export default Card;
