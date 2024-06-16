import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Кошелёк</Navbar.Brand>
        <Button variant="outline-secondary">+</Button>{' '}
      </Container>
    </Navbar>
  );
}

export default BasicExample;