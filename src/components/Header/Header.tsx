import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ImportModal from '../ImportModal/ImportModal'

function Header() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>Кошелёк</Navbar.Brand>
                <ImportModal />
            </Container>
        </Navbar>
    );
}

export default Header;