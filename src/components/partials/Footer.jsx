import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react';
import { reset_client_view } from '../../store/actions/ui';

function Footer({ isClientView, reset_client_view }) {

    const logo_click = () => {
        if (isClientView) {
            reset_client_view();
            window.location.href = "/";
        }
    }

    return (
        <>
            {isClientView ? (
                <nav className='bg-[#262626] text-center p-5 sticky bottom-0'>
                    <h1 className='font-mont text-[#5F85DB] p-5 text-6xl hover:text-[#4d6ebb] active:translate-y-0.5' onClick={logo_click}>atlas</h1>
                    <p className='text-white !text-sm font-sans !mb-5'>
                        <Icon className="copyright" />
                        <span>2025 Apartment Atlas</span>
                    </p>
                </nav>
            ) : (
                <div className='flex flex-col items-center bg-gray-300 text-black text-center p-6'>
                    {/* {access ? ( */}
                    <div className='mt-3'>
                        <p className='-mb-0 text-xs uppercase'>Have a question or issue?</p>
                        <a className="font-bold font-mont text-md" href="mailto:info@aptatlas.com">info@aptatlas.com</a>
                    </div>
                    {/* ) : null } */}
                    <p className='font-sans text-[#26282B] p-5 !text-sm'>
                        <Icon className="copyright" />
                        <span>2025 Apartment Atlas</span>
                    </p>
                </div>
            )}
        </>
    )
}

const mapStateToProps = state => ({
    isClientView: state.ui.isClientView,
});

export default connect(mapStateToProps, { reset_client_view })(Footer);