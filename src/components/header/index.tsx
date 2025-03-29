import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ImportModal from '../import-modal'
import Settings from '../Settings';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function Header() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>Кошелёк</Navbar.Brand>
                <ButtonGroup>
                    <ImportModal />
                    <Settings />
                </ButtonGroup>
            </Container>
        </Navbar>
    );
}

export default Header;