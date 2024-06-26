import { useState } from "react";
import { Card as BootstrapCard, Button, Image } from 'react-bootstrap';
import { toSVG } from 'bwip-js';

import Pass from '../../interfaces/Pass';
import PassBundle from '../../interfaces/PassBundle';
import Barcode from '../../interfaces/Barcode';
import { PassFields } from "../../interfaces/PassFields";
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

function Card({ key, passBundle }: { key: string, passBundle: PassBundle }) {
    const [show, setShow] = useState(false);
    const handleToggle = () => setShow(!show);
    const pass: Pass = passBundle.objects.pass;

    let passType: 'storeCard' | 'boardingPass' | 'coupon' | 'eventTicket' | 'generic'

    if (pass.storeCard) {
        passType = 'storeCard'
    } else if (pass.boardingPass) {
        passType = 'boardingPass'
    } else if (pass.coupon) {
        passType = 'coupon'
    } else if (pass.eventTicket) {
        passType = 'eventTicket'
    } else {
        passType = 'generic'
    }

    let headerFields: PassField[] | undefined;

    switch (passType) {
        case "storeCard": {
            if (pass.storeCard && pass.storeCard.headerFields && pass.storeCard.headerFields.length > 0) {
                headerFields = pass.storeCard.headerFields;
            }
            break;
        }
        case "boardingPass": {
            if (pass.boardingPass && pass.boardingPass.headerFields && pass.boardingPass.headerFields.length > 0) {
                headerFields = pass.boardingPass.headerFields;
            }
            break;
        }
        case "coupon": {
            if (pass.coupon && pass.coupon.headerFields && pass.coupon.headerFields.length > 0) {
                headerFields = pass.coupon.headerFields;
            }
            break;
        }
        case "eventTicket": {
            if (pass.eventTicket && pass.eventTicket.headerFields && pass.eventTicket.headerFields.length > 0) {
                headerFields = pass.eventTicket.headerFields;
            }
            break;
        }
        case "generic": {
            if (pass.generic && pass.generic.headerFields && pass.generic.headerFields.length > 0) {
                headerFields = pass.generic.headerFields;
            }
            break;
        }
    }

    let primaryFields: PassField[] | undefined;

    switch (passType) {
        case "storeCard": {
            if (pass.storeCard && pass.storeCard.primaryFields && pass.storeCard.primaryFields.length > 0) {
                primaryFields = pass.storeCard.primaryFields;
            }
            break;
        }
        case "boardingPass": {
            if (pass.boardingPass && pass.boardingPass.primaryFields && pass.boardingPass.primaryFields.length > 0) {
                primaryFields = pass.boardingPass.primaryFields;
            }
            break;
        }
        case "coupon": {
            if (pass.coupon && pass.coupon.primaryFields && pass.coupon.primaryFields.length > 0) {
                primaryFields = pass.coupon.primaryFields;
            }
            break;
        }
        case "eventTicket": {
            if (pass.eventTicket && pass.eventTicket.primaryFields && pass.eventTicket.primaryFields.length > 0) {
                primaryFields = pass.eventTicket.primaryFields;
            }
            break;
        }
        case "generic": {
            if (pass.generic && pass.generic.primaryFields && pass.generic.primaryFields.length > 0) {
                primaryFields = pass.generic.primaryFields;
            }
            break;
        }
    }

    let barcode: Barcode;
    let barcodeSvg: string = '';

    if (pass.barcodes) {
        if (pass.barcodes.length > 0) {
            barcode = pass.barcodes[0];
            barcodeSvg = toSVG({ bcid: formatToBcid(barcode.format), text: barcode.message, alttext: barcode.altText });
        }
    } else if (pass.barcode) {
        barcode = pass.barcode;
        barcodeSvg = toSVG({ bcid: formatToBcid(barcode.format), text: barcode.message, alttext: barcode.altText });
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
            {show ?
                <BootstrapCard.Body style={{}} id={`${key}_card_body`}>
                    {primaryFields ? primaryFields.map((field) => (
                        <>
                            <BootstrapCard.Subtitle style={{ color: pass.labelColor }}>{field.label}</BootstrapCard.Subtitle>
                            <BootstrapCard.Text>{field.value}</BootstrapCard.Text>
                        </>
                    )) : null}
                    {barcodeSvg !== '' ? <svg dangerouslySetInnerHTML={{ __html: barcodeSvg }} style={{ background: 'white', maxWidth: '100%' }} /> : null}
                </BootstrapCard.Body>
                : null}
            <BootstrapCard.Footer>
                <Button onClick={handleToggle}>
                    {show ? <i className={"ri-contract-up-down-fill"} /> : <i className={"ri-expand-up-down-fill"} />}
                </Button>
            </BootstrapCard.Footer>
        </BootstrapCard>
    );
}

export default Card;