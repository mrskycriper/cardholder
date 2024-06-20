import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Pass from '../../interfaces/IPass';

function BasicCard({ pass }: { pass: Pass}) {

    return (
        <Card style={{ width: '20rem', backgroundColor: pass.backgroundColor, color: pass.foregroundColor}}>
            <Card.Body>
                <Card.Title>{pass.description}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default BasicCard;