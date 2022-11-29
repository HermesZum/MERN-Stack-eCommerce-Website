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

function App() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
    }

    return (
        <BrowserRouter>
            <div className="d-flex flex-column site-container">
                <ToastContainer position="top-center" limit={1} />
                <header>
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <LinkContainer to="/">
                                <Navbar.Brand>
                                    TheStore
                                </Navbar.Brand>
                            </LinkContainer>
                            <Nav className="me-auto">
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
                                        <NavDropdown title={ userInfo.name } id="basic-nav-dropdown">
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
                        </Container>
                    </Navbar>
                </header>
                <main className="my-3">
                    <Container>
                        <Routes>
                            <Route path="/" element={ <HomeScreen/> }/>
                            <Route path="/signin" element={ <SigninScreen/> }/>
                            <Route path="/product/:slug" element={ <ProductScreen/> }/>
                            <Route path="/cart" element={ <CartScreen/> }/>
                            <Route path="/shipping" element={ <ShippingScreen/> }/>
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
