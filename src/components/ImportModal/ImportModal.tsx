import { useMemo, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function ImportModal() {
    const [show, setShow] = useState(false);
    const importWorker: Worker = useMemo(
        () => new Worker(new URL("./importWorker.ts", import.meta.url), {type: 'module'}),
        []
    );

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = async () => {
        // @ts-ignore 
        // Should never be null
        let inputElement: HTMLInputElement = document.getElementById("pkpass");
        if (inputElement && inputElement.files) {
            importWorker.postMessage(inputElement.files[0]);
        }
        setShow(false)
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <i className="ri-add-fill"></i>
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Импорт</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Выберите файл .pkpass</Form.Label>
                        <Form.Control type="file" id='pkpass' /*accept='.pkpass,application/vnd.apple.pkpass'*/ />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ImportModal;