import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button, Form } from "react-bootstrap";
import { Store } from "../Store";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen(props) {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo, cart: { shippingAddress }, } = state;
    const [ fullName, setFullName ] = useState(shippingAddress.fullName || '');
    const [ address, setAddress ] = useState(shippingAddress.address || '');
    const [ city, setCity ] = useState(shippingAddress.city || '');
    const [ postalCode, setPostalCode ] = useState(shippingAddress.postalCode || '');
    const [ country, setCountry ] = useState(shippingAddress.country || '');

    useEffect(() => {
        /* TODO: If necessary just use '/signin' without redirect. */
        if (!userInfo) {
            navigate('/signin?redirect=/shipping')
        }
    }, [ userInfo, navigate ]);


    const submitHandler = (evt) => {
        evt.preventDefault();

        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country,
            },
        });
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullName,
                address,
                city,
                postalCode,
                country,
            })
        );
        navigate('/payment')
    }

    return (
        <div>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <CheckoutSteps step1 step2 ></CheckoutSteps>
            <div className="container small-container">
                <h1 className="my-3">Shipping Address</h1>
                <Form onSubmit={ submitHandler }>
                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            value={ fullName }
                            onChange={ (evt) => setFullName(evt.target.value) }
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            value={ address }
                            onChange={ (evt) => setAddress(evt.target.value) }
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            value={ city }
                            onChange={ (evt) => setCity(evt.target.value) }
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            value={ postalCode }
                            onChange={ (evt) => setPostalCode(evt.target.value) }
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            value={ country }
                            onChange={ (evt) => setCountry(evt.target.value) }
                            required
                        />
                    </Form.Group>
                    <div className="mb-3">
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Continue
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default ShippingScreen;