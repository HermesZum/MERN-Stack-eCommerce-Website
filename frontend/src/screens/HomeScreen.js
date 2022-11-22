import { useEffect, useReducer } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

function HomeScreen() {
    const [ { loading, error, products }, dispatch ] = useReducer ( reducer, {
        products: [],
        loading: true,
        error: ''
    } );

    useEffect(() => {
        const fetchData = async () => {
            dispatch( { type: `FETCH_REQUEST`});
            try {
                const result = await axios.get('/api/products');
                dispatch( { type: 'FETCH_SUCCESS', payload: result.data } );
            }
            catch (e) {
               dispatch( { type: 'FETCH_FAIL', payload: getError(e) } );
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Helmet>
                <title>Featured Products</title>
            </Helmet>
            <h1>Featured Products</h1>
            <div className="products">
                {
                    loading ? <LoadingBox />
                        : error
                            ? <MessageBox variant="danger">{ error }</MessageBox>
                        :
                    (
                        <Row>
                            { products.map( (product) => (
                                <Col key={ product.slug } className="mb-3" sm={6} md={4} lg={3}>
                                    <Product product={ product }></Product>
                                </Col>
                            ))
                            }
                        </Row>
                    )
                }
            </div>
        </div>
    );
}

export default HomeScreen;
