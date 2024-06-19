import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

async function saveFile(file: File) {
    // @ts-ignore
    const opfsRoot = await navigator.storage.getDirectory();
    const defaultDirectory = await opfsRoot.getDirectoryHandle("default", {
        create: true,
      });
    const fileHandle = await defaultDirectory.getFileHandle(file.name, {
        create: true,
    });
    // @ts-ignore
    const writable = await fileHandle.createWritable();
    const fileData = await file.arrayBuffer()
    await writable.write(fileData);
    await writable.close();
}

function ImportModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = async () => {
        // @ts-ignore
        let inputElement: HTMLInputElement = document.getElementById("pkpass");
        if (inputElement && inputElement.files) {
            await saveFile(inputElement.files[0]);
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
                        <Form.Control type="file" id='pkpass' accept='.pkpass,application/vnd.apple.pkpass'/>
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