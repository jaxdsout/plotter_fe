import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Divider, Input, Modal, TextArea } from "semantic-ui-react";
import "./cards.css";
import { load_cards, new_guest_card } from "../../store/actions/agent";
import { reset_guest_card } from "../../store/actions/ui";
import ClientSearch from "../search/ClientSearch";
import PropertySearch from "../search/PropertySearch";

function NewCard({ client, property, user, new_guest_card, reset_guest_card, load_cards }) {
    const [showModal, setShowModal] = useState(false);
    const [msgHover, setMsgHover] = useState(false);
    const [formData, setFormData] = useState({
        agent: null,
        client: null,
        property: null,
        msg: null,
        interested: '',
        move_by: ''
    });

    const { msg, interested, move_by } = formData;

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        if (user) {
            setFormData(prevFormData => ({
                ...prevFormData,
                agent: user.id
            }));
        }

        if (property) {
            setFormData(prevFormData => ({
                ...prevFormData,
                property: property.id
            }));
        }

        if (client) {
            setFormData(prevFormData => ({
                ...prevFormData,
                client: client.id
            }));
        }
    }, [user, property, client]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (client && property) {
            await new_guest_card(property.id, user.id, client.id, msg, interested, move_by);
            await load_cards(user.id)
            handleResetCard();
            handleCloseModal();
        } else {
            console.error("Client or property not selected.");
        }
    };

    const handleResetCard = () => {
        setFormData({
            agent: user.id,
            property: null,
            client: null,
            msg: null,
            interested: '',
            move_by: ''
        });
        reset_guest_card();
    };

    return (
        <>
            <div className="dataAddRow">
                <Button onClick={handleOpenModal} className="button">+</Button>
            </div>
            <div>
                <Modal open={showModal} onClose={handleCloseModal} className="modalSm">
                    <Modal.Header>
                        <div className="newCardHeader">
                            Send Guest Card
                        </div>
                    </Modal.Header>
                    <Modal.Content>
                        <>
                            <div className="newCardColumns">
                                <div className="newCardCol">
                                    <ClientSearch />
                                    <div className="newCardSelectedRow">
                                        {formData.client !== null && client !== null ? (
                                            <Button size="tiny" color="black" disabled>CLIENT SELECTED</Button>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="newCardCol">
                                    <PropertySearch />
                                    <div className="newCardSelectedRow">
                                        {formData.property !== null && property !== null ? (
                                            <Button size="tiny" color="black" disabled>PROPERTY SELECTED</Button>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <Divider />
                            {formData.property && formData.client ? (
                                <>
                                    <div className="cardPreview">
                                        <p>Hey team,</p>
                                        <div
                                            onMouseOver={() => setMsgHover(true)}
                                            onMouseOut={() => setMsgHover(false)}
                                            style={{ width: '300px' }}
                                        >
                                            {msgHover ? (
                                                <TextArea
                                                    name='msg'
                                                    value={msg}
                                                    onChange={handleChange}
                                                    size="huge"
                                                    placeholder="Enter custom message here."
                                                    className="cardPreviewInput"
                                                />
                                            ) : (
                                                <>
                                                    {!msg ? (
                                                        <p>Below is the guest card info for my client. Please let me know if there are any issues.</p>
                                                    ) : (
                                                        <p>{msg}</p>
                                                    )}
                                                </>
                                            )}
                                        </div>

                                        <ul className="cardPreviewIndent">
                                            <li style={{ marginTop: '0.75rem' }}><strong>Name:</strong> {client?.name}</li>
                                            <li style={{ marginTop: '0.75rem' }}><strong>Phone:</strong> {client?.phone_number}</li>
                                            <li style={{ marginTop: '0.75rem' }}><strong>Email:</strong> {client?.email}</li>
                                            <li style={{ marginTop: '0.75rem' }}>
                                                <label htmlFor="interested"><strong>Interested In:</strong></label>
                                                <Input
                                                    name="interested"
                                                    value={interested}
                                                    onChange={handleChange}
                                                    size="small"
                                                    className="cardPreviewInputSm"
                                                />
                                            </li>
                                            <li style={{ marginTop: '0.75rem' }}>
                                                <label htmlFor="move_by"><strong>Move By:</strong></label>
                                                <Input
                                                    name="move_by"
                                                    value={move_by}
                                                    onChange={handleChange}
                                                    size="small"
                                                    className="cardPreviewDate"
                                                />
                                            </li>
                                        </ul>
                                        <div style={{ marginTop: '1.25rem' }}>
                                            <p>Best,</p>
                                            <p>{user?.first_name} {user?.last_name}</p>
                                            <p>{user?.profile?.phone_number}</p>
                                        </div>
                                    </div>
                                    <div className="cardActionsRow">
                                        <Button color="red" onClick={handleResetCard} size="tiny" inverted>RESET</Button>
                                        <Button color="green" onClick={handleSubmit}>SEND TO {property?.name.toUpperCase()}</Button>
                                    </div>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                    <p>Please select both client and property to proceed.</p>
                                </div>
                            )}
                        </>
                    </Modal.Content>
                    <Modal.Actions>
                        <div className="cardCloseRow">
                            <Button onClick={handleCloseModal}>CLOSE</Button>
                        </div>
                    </Modal.Actions>
                </Modal>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    error: state.auth.error,
    property: state.listmaker.property,
    client: state.listmaker.client
});

export default connect(mapStateToProps, { new_guest_card, reset_guest_card, load_cards })(NewCard);
