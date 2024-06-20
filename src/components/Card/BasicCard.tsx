import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

import Pass from '../../interfaces/Pass';
import PassBundle from '../../interfaces/PassBundle';

function BasicCard({ passBundle }: { passBundle: PassBundle}) {
    const pass = passBundle.objects.pass


    
    let logoSrc: string = ''
    if (passBundle.files.logo) {
        logoSrc = URL.createObjectURL(passBundle.files.logo)
    }

    return (
        <Card style={{ width: '20rem', backgroundColor: pass.backgroundColor, color: pass.foregroundColor}}>
            <Card.Body>
                {passBundle.files.logo ? <Image src={logoSrc} style={{maxWidth: '50%'}}/> : null}
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default BasicCard;