import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = ({match, location, history}) => {
    const productId = match.params.id;

    //fix bug where initial order quantity wasn't passed
    const test = (n) => {
        let fin = '';
        let arr = n.split('');
            for(let i = 0 ; i < n.length; i++){
            if(!isNaN(n[i])) fin += n[i];
          }
            return Number(fin);
              }
    
    console.log(`LOCATION =${test(location.search)}`)
    const qty = location.search ? test(location.search) : 1 ;

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    console.log(cartItems)

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                {cartItems.length === 0 ?
                (
                    <Message variant="info">
                        <Link to="/">
                            <h4>Your cart is empty - you should buy some stuff</h4>
                        </Link>
                    </Message>
                ) : 
                <ListGroup variant = "flush">
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid="rounded"/>
                                </Col>

                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>

                                <Col md={2}>
                                    <h6>&euro;{item.price}</h6>
                                </Col>

                                <Col md={3}>
                                    <Form.Control
                                        as="select"
                                        value={item.qty}
                                        onChange={(e)=> dispatch(addToCart(item.product,Number(e.target.value)))}>
                                            {
                                                [...Array(item.countInStock).keys()]
                                                    .map((x) => {
                                                        return <option key={x+1} value={x+1}>
                                                            {x + 1}
                                                        </option>
                                                    })
                                            }
                                    </Form.Control>
                                </Col>

                                <Col md={1}>
                                    <Button
                                        type="button"
                                        variant="light"
                                        onClick={() => removeFromCartHandler(item.product)}>
                                            <i className="fas fa-trash"></i>
                                    </Button>
                                </Col>
                                
                            </Row>
                        </ListGroup.Item>
                        
                    ))}
                </ListGroup>
            }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>
                                Subtotal: {cartItems.reduce((acc,item) => acc + item.qty, 0)}
                            </h3>
                                &euro;{cartItems.reduce((acc,item) => acc + item.qty * item.price, 0).toFixed(2)}
                            
                        </ListGroup.Item>
                        <ListGroup>
                            <Button
                            type="button"
                            className="btn-block"
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}>
                                CHECKOUT
                            </Button>
                        </ListGroup>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        
    )
}

export default CartScreen
