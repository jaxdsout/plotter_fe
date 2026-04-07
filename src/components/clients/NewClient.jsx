import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Button, Form, FormField, Message, Modal } from "semantic-ui-react";
import { load_clients, new_client } from "../../store/actions/agent";
import { reset_client_taken, verify_client_initial } from "../../store/actions/ui";
import "./clients.css";

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
      <div className="dataAddRow">
        <Button onClick={handleOpenModal} className="button">+</Button>
      </div>
      <div>
        <Modal open={showModal} onClose={handleCloseModal} className='modalSm'>
          <Modal.Header style={{ textAlign: 'center' }}>Add New Client</Modal.Header>
          <Modal.Content>
            <Form onSubmit={handleSubmit} autoComplete="off">
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
                <div className="flexCenter">
                  <Button size='tiny' className="button" type="submit">
                    PROCEED & SAVE CLIENT
                  </Button>
                </div>
              ) : (
                <div className="flexCenter">
                  <Button size='tiny' type="submit" color="green">
                    CREATE CLIENT
                  </Button>
                </div>
              )}
            </Form>
            <div>
              {clientTaken ? (
                <div className="clientsMsgWrapper">
                  <Message negative size="mini">
                    <Message.Header>Your client is registered with other agents on Atlas.</Message.Header>
                  </Message>
                </div>
              ) : (
                <></>
              )}
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={handleCloseModal}>CLOSE</Button>
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
