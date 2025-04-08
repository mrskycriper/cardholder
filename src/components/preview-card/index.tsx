import { useMemo, useState } from "react";
import { Card, Image, Modal, Button, ButtonGroup } from "react-bootstrap";
import { PassFieldType } from "../../interfaces/pass-fields";
import { PassBundleShort } from "../../interfaces/pass";
import { getPassType } from "../../utilities/get-pass-type";
import FrontSide from "../card/front-side";
import BackSide from "../card/back-side";
import FieldBlock from "../field-block";

interface PreviewCardProps {
  passBundle: PassBundleShort;
}

function PreviewCard({ passBundle }: PreviewCardProps) {
  const [showCard, setShowCard] = useState(false);
  const handleCardClose = () => {
    setShowCard(false);
    setShowCardBack(false);
  };
  const [showCardBack, setShowCardBack] = useState(false);
  const handleSideSwitch = () => {
    setShowCardBack(!showCardBack);
  };

  const pass = passBundle.objects.pass;
  const passType = getPassType(pass);
  const passFields = pass[passType];
  const headerFields = passFields
    ? passFields[PassFieldType.Header]
    : undefined;

  const shareWorker: Worker = useMemo(
    () =>
      new Worker(new URL("./share-worker.ts", import.meta.url), {
        type: "module",
      }),
    []
  );
  shareWorker.onmessage = async (event: MessageEvent<File>) => {
    const shareData = {
      files: [event.data],
    };
    if (navigator.canShare(shareData)) {
      await navigator.share(shareData);
    } else {
      // TODO Download as a file
    }
  };
  const handleShare = async () => {
    shareWorker.postMessage(passBundle.id);
  };

  return (
    <>
      <Card
        className="w-100 d-flex flex-column justify-content-center"
        style={{
          height: "5rem",
          backgroundColor: pass.backgroundColor,
          color: pass.foregroundColor,
          cursor: "pointer",
        }}
        onClick={() => setShowCard(true)}
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
      </Card>

      <Modal show={showCard} fullscreen="sm-down" onHide={handleCardClose}>
        <Modal.Header closeButton className="border-0">
          <ButtonGroup>
            <Button onClick={handleShare}>
              <i className="ri-share-2-fill" />
            </Button>
            <Button onClick={handleSideSwitch}>
              <i className="ri-repeat-fill"></i>
            </Button>
          </ButtonGroup>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          {!showCardBack ? (
            <FrontSide passBundle={passBundle} />
          ) : (
            <BackSide passBundle={passBundle} onCardClose={handleCardClose}/>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PreviewCard;
