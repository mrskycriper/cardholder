import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function ImportModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <i className="ri-add-fill"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Импорт</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Выберите файл .pkpass</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ImportModal;