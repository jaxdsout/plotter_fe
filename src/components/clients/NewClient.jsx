import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Button, Form, FormField, Message, Modal } from "semantic-ui-react";
import { load_clients, new_client } from "../../store/actions/agent";
import { reset_client_taken, verify_client_initial } from "../../store/actions/ui";

function NewClient({ user, load_clients, new_client, clientTaken, verify_client_initial, reset_client_taken }) {
    const [showModal, setShowModal] = useState(false);
    const [isProceeding, setProceeding] = useState(false);

    const handleOpenModal = () => setShowModal(true);

    const handleCloseModal = () => {
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
        })
        setShowModal(false);
        setProceeding(false);
        reset_client_taken();
    }

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
    });

    const { first_name, last_name, email, phone_number } = formData;


    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            if (first_name && last_name && email && phone_number) {
                if (clientTaken) {
                    await verify_client_initial(formData);
                    setProceeding(true);
                } else {
                    await new_client(user.id, first_name, last_name, email, phone_number);
                    await load_clients(user.id);
                    handleCloseModal();
                }
            }
        }
    };


    useEffect(() => {
        if (clientTaken) {
            setProceeding(false);
        }
    }, [clientTaken]);

    return (
        <>
            <div className="flex justify-center items-center p-4">
                <Button color="blue" onClick={handleOpenModal} className="!bg-[#90B8F8] hover:!bg-[#5F85DB] !font-extrabold">+</Button>
            </div>
            <div>
                <Modal open={showModal} onClose={handleCloseModal} className='!w-11/12 sm:!w-[500px]'>
                    <Modal.Header className="text-center">Add New Client</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={handleSubmit} autocomplete="off">
                            <FormField>
                                <label htmlFor='first_name'>First Name:</label>
                                <input
                                    type='text'
                                    name='first_name'
                                    value={first_name}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label htmlFor='last_name'>Last Name:</label>
                                <input
                                    type='text'
                                    name='last_name'
                                    value={last_name}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label htmlFor='email'>Email:</label>
                                <input
                                    type='email'
                                    name='email'
                                    value={email}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            <FormField>
                                <label htmlFor='phone_number'>Phone:</label>
                                <input
                                    type='text'
                                    name='phone_number'
                                    value={phone_number}
                                    onChange={handleChange}
                                    required
                                />
                            </FormField>
                            {clientTaken && isProceeding ? (
                                <div className="flex justify-center">
                                    <Button
                                        size='tiny'
                                        className="drop-shadow-sm text-nowrap !bg-green-600 !text-white"
                                        type="submit"
                                    >
                                        PROCEED & SAVE CLIENT
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex justify-center">
                                    <Button size='tiny' className="drop-shadow-sm" type="submit" color="green">
                                        CREATE CLIENT
                                    </Button>
                                </div>
                            )}

                        </Form>
                        <div>
                            {clientTaken ? (
                                <div className="mb-3 mt-3 p-1">
                                    <Message negative size="mini">
                                        <Message.Header>Your client is registered with other agents on Atlas.</Message.Header>
                                    </Message>
                                </div>
                            ) : (
                                <>
                                </>
                            )}
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="drop-shadow-sm" onClick={handleCloseModal}>CLOSE</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        </>
    );
}


const mapStateToProps = state => ({
    user: state.auth.user,
    error: state.auth.error,
    clientTaken: state.ui.clientTaken
});

export default connect(mapStateToProps, { new_client, load_clients, verify_client_initial, reset_client_taken })(NewClient);