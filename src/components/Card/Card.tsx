import { useState, useMemo } from "react";
import { Card as BootstrapCard, Button, ButtonGroup, Image } from 'react-bootstrap';
import { toSVG } from 'bwip-js';

import Pass, { PassType } from '../../interfaces/Pass';
import PassBundle from '../../interfaces/PassBundle';
import Barcode from '../../interfaces/Barcode';
import { PassFieldType } from "../../interfaces/PassFields";
import PassField from "../../interfaces/PassField";

function formatToBcid(format: 'PKBarcodeFormatQR' | 'PKBarcodeFormatPDF417' | 'PKBarcodeFormatAztec' | 'PKBarcodeFormatCode128') {
    let result: string;
    switch (format) {
        case 'PKBarcodeFormatQR': {
            result = 'qrcode';
            break;
        }
        case 'PKBarcodeFormatPDF417': {
            result = 'pdf417';
            break;
        }
        case 'PKBarcodeFormatAztec': {
            result = 'azteccode';
            break;
        }
        case 'PKBarcodeFormatCode128': {
            result = 'code128';
            break;
        }
    }
    return result;
}

function getPassType(pass: Pass): PassType {
    let passType: PassType;
    if (pass.storeCard) {
        passType = 'storeCard';
    } else if (pass.boardingPass) {
        passType = 'boardingPass';
    } else if (pass.coupon) {
        passType = 'coupon';
    } else if (pass.eventTicket) {
        passType = 'eventTicket';
    } else {
        passType = 'generic';
    }
    return passType;
}

function getFields(pass: Pass, passType: PassType, fieldType: PassFieldType): PassField[] | undefined {
    let fieldsObject = pass[passType]
    if (fieldsObject !== undefined) {
        let fieldsArray = fieldsObject[fieldType]
        if (fieldsArray !== undefined) {
            if (fieldsArray.length > 0) {
                return fieldsArray
            }
        }
    }
}

function Card({ passId, passBundle }: { passId: string, passBundle: PassBundle }) {
    const [showFront, setShowFront] = useState(false);
    const [showBack, setShowBack] = useState(false);
    const handleExpandFront = () => {
        setShowBack(false);
        setShowFront(!showFront);
    }
    const handleExpandBack = () => {
        setShowFront(false);
        setShowBack(!showBack);
    }
    const shareWorker: Worker = useMemo(
        () => new Worker(new URL("./shareWorker.ts", import.meta.url), { type: 'module' }),
        []
    );

    const handleShare = async () => {
        shareWorker.postMessage(passId);
        shareWorker.onmessage = async (event: MessageEvent<File>) => {
            await navigator.share({
                files: [event.data]
            });
        };
    }

    const pass: Pass = passBundle.objects.pass;

    const passType: PassType = getPassType(pass);
    const headerFields: PassField[] | undefined = getFields(pass, passType, 'headerFields');
    const primaryFields: PassField[] | undefined = getFields(pass, passType, 'primaryFields');
    const secondaryFields: PassField[] | undefined = getFields(pass, passType, 'secondaryFields');
    const auxiliaryFields: PassField[] | undefined = getFields(pass, passType, 'auxiliaryFields');
    const backFields: PassField[] | undefined = getFields(pass, passType, 'backFields');

    let barcode: Barcode;
    let barcodeSvg: string = '';

    if (pass.barcodes) {
        if (pass.barcodes.length > 0) {
            barcode = pass.barcodes[0];
            if (barcode.altText !== undefined) {
                barcodeSvg = toSVG({ bcid: formatToBcid(barcode.format), text: barcode.message, alttext: barcode.altText });
            } else {
                barcodeSvg = toSVG({ bcid: formatToBcid(barcode.format), text: barcode.message });
            }
        }
    } else if (pass.barcode) {
        barcode = pass.barcode;
        if (barcode.altText !== undefined) {
            barcodeSvg = toSVG({ bcid: formatToBcid(barcode.format), text: barcode.message, alttext: barcode.altText });
        } else {
            barcodeSvg = toSVG({ bcid: formatToBcid(barcode.format), text: barcode.message });
        }
    }

    let logoSrc: string = '';
    if (passBundle.files.logo) {
        logoSrc = URL.createObjectURL(passBundle.files.logo);
    }

    return (
        <BootstrapCard style={{ width: '20rem', backgroundColor: pass.backgroundColor, color: pass.foregroundColor }}>
            <BootstrapCard.Header>
                {passBundle.files.logo ? <Image src={logoSrc} style={{ maxWidth: '50%' }} /> : null}
                {pass.logoText ? <BootstrapCard.Title>{pass.logoText}</BootstrapCard.Title> : null}
                {headerFields ? headerFields.map((field) => (
                    <>
                        <BootstrapCard.Subtitle style={{ color: pass.labelColor }}>{field.label}</BootstrapCard.Subtitle>
                        <BootstrapCard.Text>{field.value}</BootstrapCard.Text>
                    </>
                )) : null}
            </BootstrapCard.Header>
            {showFront ?
                <BootstrapCard.Body>
                    {primaryFields ? primaryFields.map((field) => (
                        <>
                            <BootstrapCard.Subtitle style={{ color: pass.labelColor }}>{field.label}</BootstrapCard.Subtitle>
                            <BootstrapCard.Text>{field.value}</BootstrapCard.Text>
                        </>
                    )) : null}
                    {secondaryFields ? secondaryFields.map((field) => (
                        <>
                            <BootstrapCard.Subtitle style={{ color: pass.labelColor }}>{field.label}</BootstrapCard.Subtitle>
                            <BootstrapCard.Text>{field.value}</BootstrapCard.Text>
                        </>
                    )) : null}
                    {auxiliaryFields ? auxiliaryFields.map((field) => (
                        <>
                            <BootstrapCard.Subtitle style={{ color: pass.labelColor }}>{field.label}</BootstrapCard.Subtitle>
                            <BootstrapCard.Text>{field.value}</BootstrapCard.Text>
                        </>
                    )) : null}
                    {barcodeSvg !== '' ? <svg dangerouslySetInnerHTML={{ __html: barcodeSvg }} style={{ background: 'white', maxWidth: '100%' }} /> : null}
                </BootstrapCard.Body>
                : null}
            {showBack ?
                <BootstrapCard.Body>
                    {backFields ? backFields.map((field) => (
                        <>
                            <BootstrapCard.Subtitle style={{ color: pass.labelColor }}>{field.label}</BootstrapCard.Subtitle>
                            <BootstrapCard.Text>{field.value}</BootstrapCard.Text>
                        </>
                    )) : null}
                </BootstrapCard.Body>
                : null}
            <BootstrapCard.Footer>
                <ButtonGroup>
                    <Button onClick={handleShare}>
                        <i className={"ri-share-2-fill"} />
                    </Button>
                    <Button onClick={handleExpandFront}>
                        {showFront ? <i className={"ri-contract-up-down-fill"} /> : <i className={"ri-expand-up-down-fill"} />}
                    </Button>
                    <Button onClick={handleExpandBack}>
                        {showBack ? <i className={"ri-close-circle-fill"} /> : <i className={"ri-information-fill"} />}
                    </Button>
                </ButtonGroup>
            </BootstrapCard.Footer>
        </BootstrapCard>
    );
}

export default Card;