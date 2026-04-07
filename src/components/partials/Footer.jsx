import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { reset_client_view } from '../../store/actions/ui';
import "./partials.css";

function Footer({ isClientView, reset_client_view }) {

  const logo_click = () => {
    if (isClientView) {
      reset_client_view();
      window.location.href = "/";
    }
  }

  if (isClientView) return (
    <div className="clientFooter">
      <h1 className="clientFooterLogo" onClick={logo_click}>atlas</h1>
      <p className="clientFooterText">
        <Icon className="copyright" />
        <span>2025 Apartment Atlas</span>
      </p>
    </div>
  )

  if (!isClientView) return (
    <div className='authFooter'>
      <p id="haveQuestion">Have a question or issue?</p>
      <a id="questionEmail" href="mailto:info@aptatlas.com">info@aptatlas.com</a>
      <p className='copyright'>
        <Icon className="copyright" />
        <span>2025 Apartment Atlas</span>
      </p>
    </div>
  )
}

const mapStateToProps = state => ({
  isClientView: state.ui.isClientView,
});

export default connect(mapStateToProps, { reset_client_view })(Footer);