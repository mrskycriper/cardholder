import { useState } from "react";
import { Card as BootstrapCard, Button, Image } from 'react-bootstrap';
import { toSVG } from 'bwip-js';

import Pass from '../../interfaces/Pass';
import PassBundle from '../../interfaces/PassBundle';
import Barcode from '../../interfaces/Barcode';

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
            </BootstrapCard.Header>
            {show ?
                <BootstrapCard.Body style={{}} id={`${key}_card_body`}>
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