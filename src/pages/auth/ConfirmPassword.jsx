import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormField } from "semantic-ui-react";
import { reset_password_confirm } from "../../store/actions/auth";
import "./auth.css";

function ConfirmPassword({ reset_password_confirm }) {
  const navigate = useNavigate()
  const { uid, token } = useParams();

  const [requestSent, setRequestSent] = useState(false)
  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: ''
  });

  const { new_password, re_new_password } = formData;

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    reset_password_confirm(uid, token, new_password, re_new_password)
    setRequestSent(true);
  }

  if (requestSent) {
    return navigate('/login/');
  }

  return (
    <div className="authPage">
      <div className="authCard">
        <div className="authHeader">
          <h6 className="authTitle">save a new password</h6>
        </div>
        <Form onSubmit={handleSubmit} className="authForm">
          <FormField>
            <label className="authLabel" htmlFor='password'>Password:</label>
            <input
              className="authInput"
              type='password'
              name='new_password'
              value={new_password}
              onChange={e => handleChange(e)}
              minLength='8'
              required
            />
          </FormField>
          <FormField>
            <label className="authLabel" htmlFor='password'>Confirm Password:</label>
            <input
              className="authInput"
              type='password'
              name='re_new_password'
              value={re_new_password}
              onChange={e => handleChange(e)}
              minLength='8'
              required
            />
          </FormField>
          <div className="authSubmitRow">
            <Button type="submit" className="button">SAVE PASSWORD</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default connect(null, { reset_password_confirm })(ConfirmPassword);
