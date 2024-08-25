import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form, FormField } from "semantic-ui-react";

function ClientDetail ({ client }) {
    console.log(client)

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: ''
    });
    
    const { first_name, last_name, email, phone_number } = formData;

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const handleSubmit = e => {
        // e.preventDefault();
        // update_client(first_name, last_name, email, phone_number)
        
    }

        // export const update_client = (first_name, last_name, email, phone_number) => async (dispatch, getState) => {
    //     const state = getState()
    //     const { access, user } = state.auth;
    
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${access}`,
    //             'Accept': 'application/json'
    //         }
    //     };
    
    //     const agent = user.id
    //     console.log(agent)
    
    //     const body = JSON.stringify({ first_name, last_name, email, phone_number, agent });
    
    //     try {
    //         const res = await axios.post(`${process.env.REACT_APP_API_URL}/plotter/clients/`, body, config);
    
    //         dispatch({
    //             type: NEW_CLIENT_SUCCESS,
    //             payload: res.data
    //         });
    //     } catch (err) {
    //         dispatch({
    //             type: NEW_CLIENT_FAIL
    //         })
    //     }
    // };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FormField>
                    <label className="noto-sans" htmlFor='first_name'>First Name:</label>
                    <input 
                        type='text'
                        name='first_name'
                        placeholder={client.first_name}
                        value={first_name}
                        onChange={e => handleChange(e)}
                        required
                    />
                </FormField>
                <FormField>
                    <label className="noto-sans" htmlFor='last_name'>Last Name:</label>
                    <input 
                        type='text'
                        name='last_name'
                        placeholder={client.last_name}
                        value={last_name}
                        onChange={e => handleChange(e)}
                        required
                    />
                </FormField>
                <FormField>
                    <label className="noto-sans" htmlFor='email'>Email:</label>
                    <input 
                        type='email'
                        name='email'
                        value={client.email}
                        onChange={e => handleChange(e)}
                        required
                    />
                </FormField>
                <FormField>
                    <label className="noto-sans" htmlFor='phone_number'>Phone:</label>
                    <input 
                        type='tel'
                        name='phone_number'
                        value={client.phone_number}
                        onChange={e => handleChange(e)}
                        required
                    />
                </FormField>
                <Button type="submit">UPDATE CLIENT</Button>   
            </Form>
        </>
    )
}

export default ClientDetail;