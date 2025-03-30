import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ImportModal from '../import-modal'
import Settings from '../settings';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function Header() {
    return (
        <Navbar>
            <Container className="d-flex justify-content-between" fluid="sm" style={{
            maxWidth:"540px"
          }}>
                <Navbar.Brand className="fw-bold">Кошелёк</Navbar.Brand>
                <ButtonGroup>
                    <ImportModal />
                    <Settings />
                </ButtonGroup>
            </Container>
        </Navbar>
    );
}

export default Header;