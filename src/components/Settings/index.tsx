import { useMemo, useState, useEffect } from "react";
import { Button, Modal, Card, ProgressBar } from "react-bootstrap";

function Settings() {
  const [show, setShow] = useState(false);
  const [estimate, setEstimate] = useState<StorageEstimate>({
    quota: 0,
    usage: 0,
  });
  const estimateWorker: Worker = useMemo(
    () =>
      new Worker(new URL("./estimate-worker.ts", import.meta.url), {
        type: "module",
      }),
    []
  );

  useEffect(() => {
    estimateWorker.postMessage("GET");
    estimateWorker.onmessage = async (e: MessageEvent<StorageEstimate>) => {
      setEstimate(e.data);
    };
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="ri-settings-4-fill"></i>
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className="fw-bold">Настройки</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Header className="border-0 bg-transparent">
              <Card.Title>Хранилище</Card.Title>
            </Card.Header>
            <Card.Body className="d-flex flex-column gap-2">
              <ProgressBar
                now={
                  estimate.quota !== undefined && estimate.usage !== undefined
                    ? estimate.usage / estimate.quota
                    : 0
                }
              />
              <Card.Text>
                {`Занято ${
                  estimate.usage !== undefined
                    ? (estimate.usage / 1024 / 1024).toFixed(2)
                    : 0
                } Мб из ${
                  estimate.quota !== undefined
                    ? (estimate.quota / 1024 / 1024).toFixed(2)
                    : 0
                } Мб`}
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Settings;
