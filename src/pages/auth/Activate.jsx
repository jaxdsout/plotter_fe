import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Loader, Message } from "semantic-ui-react";
import { activate } from "../../store/actions/auth";
import { set_activate_success } from "../../store/actions/ui";
import "./auth.css";

function Activate({ activate, message, activateSuccess, set_activate_success }) {
  const navigate = useNavigate()
  const { uid, token } = useParams();
  const [isLoading, setLoading] = useState(false);

  const activate_account = async () => {
    setLoading(true);
    await activate(uid, token)
  }

  useEffect(() => {
    if (activateSuccess) {
      set_activate_success();
      setLoading(false);
      setTimeout(() => navigate('/login/'), 3000);
    }
  }, [activateSuccess, navigate, set_activate_success])

  return (
    <div className="authPage">
      <div className="authCard">
        <div className="authHeader">
          <p className="authTitle">activate your account</p>
        </div>
        <div className="authSubmitRow">
          <Button onClick={activate_account} type='button' className="button">
            {isLoading ? (
              <Loader active inline inverted size='mini' />
            ) : (
              <span>ACTIVATE</span>
            )}
          </Button>
        </div>
        {message && (
          <Message positive size="mini">
            <p>{message}</p>
          </Message>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  message: state.ui.message,
  activateSuccess: state.ui.activateSuccess
});

export default connect(mapStateToProps, { activate, set_activate_success })(Activate);
