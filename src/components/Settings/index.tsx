import { useMemo, useState, useEffect } from "react";
import { Button, Modal, Card, ProgressBar } from "react-bootstrap";

function Settings() {
    const [show, setShow] = useState(false);
    const [estimate, setEstimate] = useState<StorageEstimate>({ quota: 0, usage: 0 });
    const estimateWorker: Worker = useMemo(
        () => new Worker(new URL("./estimate-worker.ts", import.meta.url), { type: 'module' }),
        []
    );

    const clenupWorker: Worker = useMemo(
        () => new Worker(new URL("./clenup-worker.ts", import.meta.url), { type: 'module' }),
        []
    );

    useEffect(() => {
        estimateWorker.postMessage('GET');
        estimateWorker.onmessage = async (e: MessageEvent<StorageEstimate>) => {
            setEstimate(e.data);
        };
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCleanup = () => {
        clenupWorker.postMessage("CLEAN")
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <i className="ri-settings-4-fill"></i>
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Настройки</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Header>Хранилище</Card.Header>
                        <Card.Body>
                            <ProgressBar now={estimate.quota !== undefined && estimate.usage !== undefined ? estimate.usage / estimate.quota : 0} />
                            {`Занято ${estimate.usage !== undefined ? (estimate.usage / 1024 / 1024).toFixed(2) : 0} Мб из ${estimate.quota !== undefined ? (estimate.quota / 1024 / 1024).toFixed(2) : 0} Мб`}
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="danger" onClick={handleCleanup}>
                                Очистить
                            </Button>
                        </Card.Footer>
                    </Card>
                </Modal.Body>
            </Modal >
        </>
    );
}

export default Settings;