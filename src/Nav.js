import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Navi() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Board</Nav.Link>
                        <Nav.Link href="#Login">Login</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Navi;
