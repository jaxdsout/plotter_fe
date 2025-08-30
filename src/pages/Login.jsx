import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Divider, Form, FormField, Message } from "semantic-ui-react";
import { auth_user, login } from "../store/actions/auth";
import "./pages.css";

function Login({ login, isAuthenticated, error, message, auth_user }) {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const normalizeEmail = (email) => email.trim().toLowerCase();

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        const normalizedEmail = normalizeEmail(email);
        login(normalizedEmail, password);
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard/home');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="container animator">
            <Form onSubmit={handleSubmit} className="form">
                {error && (
                    <Message negative>
                        <Message.Header>Login Failed</Message.Header>
                        <p>{error}</p>
                    </Message>
                )}
                {message && (
                    <Message positive>
                        <Message.Header>{message}</Message.Header>
                    </Message>
                )}
                <FormField className="formField">
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={e => handleChange(e)}
                        required
                    />
                </FormField>
                <FormField className="formField">
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={e => handleChange(e)}
                        required
                    />
                </FormField>
                <div className="buttonBox">
                    <Button type="submit" inverted className="button">LOGIN</Button>
                </div>
            </Form>
            <Divider className="mt-4 mb-4" />
            <div className="subContainer" id="signUpResetBox">
                <Link to={"/signup/"}><Button className="button">SIGN UP</Button></Link>
                <Link to={"/reset-password/"}><Button className="button">RESET</Button></Link>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.ui.error,
    message: state.ui.message
});

export default connect(mapStateToProps, { login, auth_user })(Login);