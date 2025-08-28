import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Loader, Message } from "semantic-ui-react";
import { activate } from "../store/actions/auth";
import { set_activate_success } from "../store/actions/ui";

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
        <div className="flex flex-col items-center justify-evenly">
            <div className="w-11/12 max-w-[500px] p-5 mt-5 mb-10 flex flex-col bg-[#26282B] rounded-lg shadow-md shadow-inner">
                <div className="mb-3 flex flex-col items-center">
                    <p className="font-mont text-white text-2xl md:text-4xl mt-4 uppercase"> activate your account </p>
                </div>
                <div className="flex flex-col items-center justify-evenly">
                    <Button onClick={activate_account} type='button' className="!bg-[#90B8F8] hover:!bg-[#5F85DB]">
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