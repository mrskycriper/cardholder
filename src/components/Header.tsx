import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import ImportModal from './ImportModal'

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Кошелёк</Navbar.Brand>
        <ImportModal/>
      </Container>
    </Navbar>
  );
}

export default Header;