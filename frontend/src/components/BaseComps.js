import React from 'react'
import { 
    Container,
    Row,
    Col,
    Navbar,
    Nav,
     } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant= "dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to= "/">
                        <Navbar.Brand>Shoppe</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <LinkContainer to ="/cart">
                            <Nav.Link><i className="fas fa-shopping-cart"></i>  Cart</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to ="/login">
                            <Nav.Link><i className="fas fa-sign-in-alt"></i>  Login</Nav.Link>
                        </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py2"> Copyright &copy; James of Solaire </Col>
                </Row>
            </Container>
        </footer>
    )
}

export {Header,Footer}