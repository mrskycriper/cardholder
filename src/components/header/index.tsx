import { ButtonGroup, Container, Navbar } from "react-bootstrap";
import ImportModal from "../import-modal";
import Settings from "../settings";

function Header() {
  return (
    <Navbar className="py-3">
      <Container
        className="d-flex justify-content-between align-items-center"
        fluid="sm"
        style={{
          maxWidth: "540px",
        }}
      >
        <Navbar.Brand className="fw-bold h1 fs-1 m-0 p-0">Кошелёк</Navbar.Brand>
        <ButtonGroup>
          <ImportModal />
          <Settings />
        </ButtonGroup>
      </Container>
    </Navbar>
  );
}

export default Header;
