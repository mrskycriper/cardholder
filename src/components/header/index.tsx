import { ButtonGroup, Container, Navbar } from "react-bootstrap";
import ImportModal from "../import-modal";
import Settings from "../settings";

function Header() {
  return (
    <Navbar>
      <Container
        className="d-flex justify-content-between"
        fluid="sm"
        style={{
          maxWidth: "540px",
        }}
      >
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
