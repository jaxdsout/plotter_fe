import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormField } from "semantic-ui-react";
import { reset_password_confirm } from "../store/actions/auth";

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
        <div className="flex flex-col items-center justify-evenly">
            <div className="w-11/12 max-w-[500px] p-5 mt-5 mb-10 flex flex-col bg-[#26282B] rounded-lg shadow-inner shadow-md">
                <h6 className="font-mont text-white text-2xl md:text-4xl mt-3 text-center"> save a new password </h6>
                <Form onSubmit={handleSubmit} className="p-5">
                    <FormField>
                        <label className="!text-white" htmlFor='password'>Password:</label>
                        <input
                            className='!bg-black !bg-opacity-30 !text-white'
                            type='password'
                            name='new_password'
                            value={new_password}
                            onChange={e => handleChange(e)}
                            minLength='8'
                            required
                        />
                    </FormField>
                    <FormField>
                        <label className="!text-white" htmlFor='password'>Confirm Password:</label>
                        <input
                            className='!bg-black !bg-opacity-30 !text-white'
                            type='password'
                            name='re_new_password'
                            value={re_new_password}
                            onChange={e => handleChange(e)}
                            minLength='8'
                            required
                        />
                    </FormField>
                    <div className="flex flex-col items-center justify-evenly mt-8">
                        <Button type="submit" className="!bg-[#90B8F8] hover:!bg-[#5F85DB] active:translate-y-0.5">SAVE PASSWORD</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}


export default connect(null, { reset_password_confirm })(ConfirmPassword);