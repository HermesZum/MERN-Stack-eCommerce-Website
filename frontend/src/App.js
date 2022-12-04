import './App.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { Store } from "./Store";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import ShippingScreen from "./screens/ShippingScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
        window.location.href = '/signin'
    }

    return (
        <BrowserRouter>
            <div className="d-flex flex-column site-container">
                <ToastContainer position="top-center" limit={ 1 }/>
                <header>
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Container>
                            <LinkContainer to="/">
                                <Navbar.Brand>
                                    TheStore
                                </Navbar.Brand>
                            </LinkContainer>
                            <Navbar.Toggle aria-controls="basic-navbar-nav "/>
                            <Navbar.Collapse id="basic-navbar-nav ">
                                <Nav className="me-auto w-100 justify-content-end">
                                    <Link to="/cart" className="nav-link">
                                        <i className={ 'fas fa-cart-shopping' }
                                        />
                                        { cart.cartItems.length > 0 && (
                                            <Badge pill bg="danger">
                                                { cart.cartItems.reduce((a, c) => a + c.quantity, 0) }
                                            </Badge>
                                        ) }
                                    </Link>
                                    {
                                        userInfo
                                        ?
                                        (
                                            <NavDropdown title={ userInfo.username } id="basic-nav-dropdown">
                                                <LinkContainer to="/profile">
                                                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                                                </LinkContainer>
                                                <LinkContainer to="/orderhistory">
                                                    <NavDropdown.Item>Order History</NavDropdown.Item>
                                                </LinkContainer>
                                                <NavDropdown.Divider/>
                                                <Link
                                                    className="dropdown-item"
                                                    to="#signout"
                                                    onClick={ signoutHandler }
                                                >
                                                    Sign Out
                                                </Link>
                                            </NavDropdown>
                                        )
                                        :
                                        (
                                            <Link className="nav-link" to="/signin">
                                                Sign In
                                            </Link>
                                        )
                                    }
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </header>
                <main className="my-3">
                    <Container>
                        <Routes>
                            <Route path="/" element={ <HomeScreen/> }/>
                            <Route path="/signin" element={ <SigninScreen/> }/>
                            <Route path="/signup" element={ <SignupScreen/> }/>
                            <Route path="/profile" element={ <ProfileScreen/> }/>
                            <Route path="/product/:slug" element={ <ProductScreen/> }/>
                            <Route path="/cart" element={ <CartScreen/> }/>
                            <Route path="/shipping" element={ <ShippingScreen/> }/>
                            <Route path="/payment" element={ <PaymentMethodScreen/> }/>
                            <Route path="/placeorder" element={ <PlaceOrderScreen/> }/>
                            <Route path="/orderhistory" element={ <OrderHistoryScreen/> }/>
                            <Route path="/order/:id" element={ <OrderScreen/> }/>
                        </Routes>
                    </Container>
                </main>
                <footer>
                    <Container>
                        <div className="text-center py-4">All rights reserved 3Gear</div>
                    </Container>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
