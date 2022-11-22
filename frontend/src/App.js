import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { Container, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  return (
      <BrowserRouter>
        <div className="d-flex flex-column site-container">
          <header>
              <Navbar bg="dark" variant="dark">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            TheStore
                        </Navbar.Brand>
                    </LinkContainer>
                </Container>
              </Navbar>
          </header>
            <main className="my-3">
                <Container>
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/product/:slug" element={<ProductScreen />} />
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
