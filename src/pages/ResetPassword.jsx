import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormField, Loader, Message } from "semantic-ui-react";
import { reset_password } from "../store/actions/auth";
import { set_reset_success } from "../store/actions/ui";

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
        <div className="flex flex-col items-center justify-evenly">
            <div className="w-11/12 max-w-[500px] p-5 mt-5 mb-10 flex flex-col bg-[#26282B] rounded-lg shadow-md shadow-inner">
                <div className="flex flex-col items-center">
                    <h6 className="font-mont text-white text-2xl md:text-4xl -mt-2 uppercase"> reset your password </h6>
                </div>
                {message && (
                    <Message positive>
                        <Message.Header>{message}</Message.Header>
                    </Message>
                )}
                <Form onSubmit={handleSubmit} className="p-5">
                    <FormField>
                        <label className="!text-white" htmlFor='email'>Email:</label>
                        <input
                            className='!bg-black !bg-opacity-30 !text-white'
                            type='email'
                            name='email'
                            value={email}
                            onChange={e => handleChange(e)}
                            required
                        />
                    </FormField>
                    <div className="flex flex-col items-center justify-evenly mt-8">
                        <Button type="submit" className="!bg-[#90B8F8] hover:!bg-[#5F85DB] active:translate-y-0.5">
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