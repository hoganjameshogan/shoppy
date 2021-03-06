import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader  from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

import { register } from '../actions/userActions';

const RegisterScreen = ({location, history}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userRegister = useSelector(state => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
        
    }, [history, userInfo, redirect])

    const submitHandler = async(e) => {
        e.preventDefault();

        if(password != confirmPassword) {
            setMessage('Passwords do not match');
        } 
        else {
            dispatch(register(name, email, password));
            
        }
    }   
    return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant="danger"> {message} </Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId="name">
                    <Form.Label>Name </Form.Label>
                    <Form.Control
                    type="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required></Form.Control>
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Re-enter Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        required></Form.Control>
                </Form.Group> 
            <Button type="submit" variant="primary">Register</Button>
            </Form>

            <Row className="py-3">
                <Col> Already have an account? 
                    <Link to={redirect ? `/login?redirect=${redirect}` : `/login` }>
                        <span>  Log in</span>
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
