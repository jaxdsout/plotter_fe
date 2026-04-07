import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormField, Loader, Message } from "semantic-ui-react";
import { reset_password } from "../../store/actions/auth";
import { set_reset_success } from "../../store/actions/ui";
import "./auth.css";

function ResetPassword({ reset_password, message, resetSuccess, set_reset_success }) {
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    reset_password(email)
  }

  useEffect(() => {
    if (resetSuccess) {
      set_reset_success();
      setLoading(false);
      setTimeout(() => navigate('/login/'), 3000);
    }
  }, [resetSuccess, set_reset_success, navigate])

  return (
    <div className="authPage">
      <div className="authCard">
        <div className="authHeader">
          <h6 className="authTitle">reset your password</h6>
        </div>
        {message && (
          <Message positive>
            <Message.Header>{message}</Message.Header>
          </Message>
        )}
        <Form onSubmit={handleSubmit} className="authForm">
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
          <div className="authSubmitRow">
            <Button type="submit" className="button">
              {isLoading ? (
                <Loader active inline inverted size='mini' />
              ) : (
                <span>REQUEST NEW PASSWORD</span>
              )}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
  message: state.ui.message,
  resetSuccess: state.ui.resetSuccess
});

export default connect(mapStateToProps, { reset_password, set_reset_success })(ResetPassword);
