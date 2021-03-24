import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row , Col , Navbar , Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { logout } from '../actions/userActions';

const Header = () => {

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    }

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

                        { userInfo ? 
                            <NavDropdown title={userInfo.name}>
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                            :   <LinkContainer to ="/login">
                                    <Nav.Link><i className="fas fa-sign-in-alt"></i>  Login</Nav.Link>
                                </LinkContainer>
                        }

                        {/* <LinkContainer to ="/login">
                            <Nav.Link><i className="fas fa-sign-in-alt"></i>  Login</Nav.Link>
                        </LinkContainer> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

const Footer = () => {
    return (
        <footer className="bg-dark text-white border-top">
            <Container>
                <Row>
                    <Col className="text-center py2"> Copyright &copy; James of Solaire </Col>
                </Row>
            </Container>
        </footer>
    )
}

export {Header,Footer}