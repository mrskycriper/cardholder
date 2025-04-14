import { useMemo, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch } from "../../store/hooks";
import { PassBundleShort } from "../../interfaces/pass";
import { addCard } from "../../store";

function ImportModal() {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const importWorker: Worker = useMemo(
    () =>
      new Worker(new URL("./import-worker.ts", import.meta.url), {
        type: "module",
      }),
    []
  );
  importWorker.onmessage = async (e: MessageEvent<PassBundleShort>) => {
    dispatch(addCard(e.data));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = async () => {
    try {
      // Should never be null
      const inputElement: HTMLInputElement = document.getElementById(
        "pkpass"
      ) as HTMLInputElement;
      if (inputElement.files) {
        importWorker.postMessage(inputElement.files[0]);
      }
      setShow(false);
    } catch (e) {
      console.log("Impossible error: " + e);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} aria-label="Импорт">
        <i className="ri-add-fill"></i>
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className="fw-bold">Импорт</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="file"
            id="pkpass"
            accept=".pkpass,application/vnd.apple.pkpass"
          />
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="primary" onClick={handleSave}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImportModal;
