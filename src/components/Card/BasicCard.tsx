import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
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

function BasicCard({ passBundle }: { passBundle: PassBundle }) {
    const pass: Pass = passBundle.objects.pass;

    let barcode: Barcode;
    let svg: string = '';

    if (pass.barcodes) {
        if (pass.barcodes.length > 0) {
            barcode = pass.barcodes[0];
            svg = toSVG({ bcid: formatToBcid(barcode.format), text: barcode.message });
        }
    } else if (pass.barcode) {
        barcode = pass.barcode;
        svg = toSVG({ bcid: formatToBcid(barcode.format), text: barcode.message });
    }

    let logoSrc: string = '';
    if (passBundle.files.logo) {
        logoSrc = URL.createObjectURL(passBundle.files.logo);
    }

    return (
        <Card style={{ width: '20rem', backgroundColor: pass.backgroundColor, color: pass.foregroundColor }}>
            <Card.Header>
                {passBundle.files.logo ? <Image src={logoSrc} style={{ maxWidth: '50%' }} /> : null}
            </Card.Header>
            <Card.Body>
                {svg !== '' ? <svg dangerouslySetInnerHTML={{ __html: svg }} style={{ background: 'white', maxWidth: '100%' }} /> : null}
            </Card.Body>
        </Card>
    );
}

export default BasicCard;