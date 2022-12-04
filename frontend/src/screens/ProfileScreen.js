import axios from "axios";
import { useContext, useState, useReducer } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { getError } from "../utils";

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false };
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false };

        default:
            return state;
    }
}

function ProfileScreen(props) {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const [ username, setUsername ] = useState(userInfo.username);
    const [ email, setEmail ] = useState(userInfo.email);
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const [ { loadingUpdate }, dispatch ] = useReducer(reducer, {
        loadingUpdate: false,
    });

    const submitHandler = async (evt) => {
        evt.preventDefault();

        try {
            const { data } = await axios.put('/api/users/profile',
                {
                    username,
                    email,
                    password,
                },
                {
                    headers: { Authorization: `Bearer ${ userInfo.token }` },
                }
            );
            dispatch({ type: 'UPDATE_SUCCESS', });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('User updated successfully!')
        }
        catch (err) {
            dispatch({
                type: 'FETCH_FAIL',
            });
            toast.error(getError(err));
        }
    };

    return (
        <div className="container small-container">
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <h1 className="my-3">User Profile</h1>
            <Form onSubmit={ submitHandler }>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={ username }
                        onChange={ (evt) => setUsername(evt.target.value) }
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        value={ email }
                        onChange={ (evt) => setEmail(evt.target.value) }
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={ password }
                        onChange={ (evt) => setPassword(evt.target.value) }
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        value={ confirmPassword }
                        onChange={ (evt) => setConfirmPassword(evt.target.value) }
                    />
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">Update</Button>
                </div>
            </Form>
        </div>
    );
}

export default ProfileScreen;
