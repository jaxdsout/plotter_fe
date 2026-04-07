import { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Divider, Form, FormField, Loader, Message } from "semantic-ui-react";
import { signup } from "../../store/actions/auth";
import { set_signup_success } from "../../store/actions/ui";
import "./auth.css";

function Signup({ signup, error, message, signupSuccess, set_signup_success }) {
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    re_password: ''
  });

  const { first_name, last_name, email, password, re_password } = formData;

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password === re_password) {
      await signup(first_name, last_name, email, password, re_password);
      if (signupSuccess) {
        navigate('/login/');
      }
    }
  }

  return (
    <div className="authPage">
      <div className="authCard">
        <div className="authHeader">
          <h6 className="authTitle">SIGN UP FOR ATLAS</h6>
          <p className="authSubtitle">IT'S 100% FREE RIGHT NOW!</p>
        </div>
        <Form onSubmit={handleSubmit} className="authForm">
          {error && (
            <Message negative size="mini">
              <Message.Header>Signup Failed</Message.Header>
              <p>{error}</p>
            </Message>
          )}
          {message && (
            <Message positive size="mini">
              <Message.Header>Signup Successful</Message.Header>
              <p>{message}</p>
            </Message>
          )}
          <FormField>
            <label className="authLabel" htmlFor='first_name'>First Name:</label>
            <input
              className="authInput"
              type='text'
              name='first_name'
              value={first_name}
              onChange={e => handleChange(e)}
              required
            />
          </FormField>
          <FormField>
            <label className="authLabel" htmlFor='last_name'>Last Name:</label>
            <input
              className="authInput"
              type='text'
              name='last_name'
              value={last_name}
              onChange={e => handleChange(e)}
              required
            />
          </FormField>
          <FormField>
            <label className="authLabel" htmlFor='email'>Email:</label>
            <input
              className="authInput"
              type='email'
              name='email'
              value={email}
              onChange={e => handleChange(e)}
              required
            />
          </FormField>
          <FormField>
            <label className="authLabel" htmlFor='password'>Password:</label>
            <input
              className="authInput"
              type='password'
              name='password'
              value={password}
              onChange={e => handleChange(e)}
              required
            />
          </FormField>
          <FormField>
            <label className="authLabel" htmlFor='re_password'>Re-Enter Password:</label>
            <input
              className="authInput"
              type='password'
              name='re_password'
              value={re_password}
              onChange={e => handleChange(e)}
              required
            />
          </FormField>
          <div className="authSubmitRow">
            <Button className="button">
              {isLoading ? (
                <Loader active inline inverted size='mini' />
              ) : (
                <span>SIGN UP</span>
              )}
            </Button>
          </div>
        </Form>
        <Divider />
        <div className="authDividerSection">
          <h6 className="authQuestionText">already have an account?</h6>
          <Link to={"/login/"}>
            <Button inverted>LOGIN</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
  message: state.ui.message,
  signupSuccess: state.ui.signupSuccess
});

export default connect(mapStateToProps, { signup, set_signup_success })(Signup);
