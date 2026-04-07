import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { logout } from '../../store/actions/auth';
import { widget_close, widget_open } from '../../store/actions/ui';
import "./partials.css";

function Navbar({ logout, isAuthenticated, isClientView, access, widget_open, widget_close, widget }) {
  const navigate = useNavigate()

  const logout_user = () => {
    logout();
    navigate("/login/")
  }

  const logo_click = () => {
    if (isAuthenticated) {
      navigate("/dashboard/home")
    } else {
      navigate("/")
    }
  }

  const handleWidget = (type) => {
    if (type === 'calculator' || type === 'profile') {
      if (widget === type) {
        widget_close();
      } else {
        widget_close();
        widget_open(type);
      }
    }


  }

  if (!isClientView) return (
    <nav className='navbar'>
      <div className='navLogo' onClick={logo_click}>
        ATLAS
      </div>
      {access ?
        <div className='authNavbar'>
          <div className='popupTrigger'>
            <i className='calculator icon' onClick={() => handleWidget('calculator')} />
          </div>
          <div className='popupTrigger'>
            <i className='user circle icon' onClick={() => handleWidget('profile')} />
          </div>
          <Button className="button" id="logoutButton" onClick={logout_user}>LOGOUT</Button>
        </div>
        :
        <div className='signupNavbar'>
          <Button className='button' onClick={() => navigate("/signup")} id="joinNowButton">JOIN NOW</Button>
          <Button className='button' onClick={() => navigate("/login")} id="loginButton">LOGIN</Button>
        </div>
      }
    </nav>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isClientView: state.ui.isClientView,
  access: state.auth.access,
  widget: state.ui.widget,
});

export default connect(mapStateToProps, { logout, widget_close, widget_open })(Navbar);

