import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Form } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";

function PaymentMethodScreen(props) {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { shippingAddress, paymentMethod }, } = state;
    const [ paymentMethodName, setPaymentMethod ] = useState(paymentMethod || 'PayPal');

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping')
        }
    }, [ shippingAddress, navigate ]);

    const submitHandler = (evt) => {
        evt.preventDefault();
        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeorder');
    }

    return (
        <div>
            <Helmet>
                <title>Choose Payment Method</title>
            </Helmet>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <div className="container small-container">
                <h1 className="my-3">Choose Payment Method</h1>
                <Form onSubmit={ submitHandler }>
                    <div className="mb-3">
                        <Form.Check
                            type="radio"
                            id="PayPal"
                            label="PayPal"
                            value="PayPal"
                            checked={ paymentMethodName === 'PayPal' }
                            onChange={ (evt) => setPaymentMethod(evt.target.value) }
                        />
                    </div>
                    <div className="mb-3">
                        <Form.Check
                            type="radio"
                            id="Stripe"
                            label="Stripe"
                            value="Stripe"
                            checked={ paymentMethodName === 'Stripe' }
                            onChange={ (evt) => setPaymentMethod(evt.target.value) }
                        />
                    </div>
                    <div className="mb-3">
                        <Button type="submit">Continue</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default PaymentMethodScreen;