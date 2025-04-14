import { useMemo, useState } from "react";
import { Card, Modal, Button, ButtonGroup } from "react-bootstrap";
import { PassBundleShort } from "../../interfaces/pass";
import FrontSide from "../card/front-side";
import BackSide from "../card/back-side";
import CardHeader from "../card-header/card-header";

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
          backgroundColor: pass.backgroundColor,
          color: pass.foregroundColor,
          cursor: "pointer",
        }}
        onClick={() => setShowCard(true)}
      >
        <CardHeader passBundle={passBundle} />
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
            <BackSide passBundle={passBundle} onCardClose={handleCardClose} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PreviewCard;
