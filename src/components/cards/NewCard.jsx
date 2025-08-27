import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Divider, Input, Modal, TextArea } from "semantic-ui-react";
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

    const handleCloseModal = () => setShowModal(false);;

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
            <div className="flex justify-center items-center p-4">
                <Button color="blue" onClick={handleOpenModal} className="!bg-[#90B8F8] hover:!bg-[#5F85DB] !font-extrabold">+</Button>
            </div>
            <div>
                <Modal open={showModal} onClose={handleCloseModal} className='!w-11/12 sm:!w-[500px]'>
                    <Modal.Header>
                        <div className="flex flex-row justify-between items-end">
                            Send Guest Card
                        </div>
                    </Modal.Header>
                    <Modal.Content>
                        <>
                            <div className="flex flex-col lg:flex-row justify-center ml-2 mr-2">
                                <div className="p-3 text-center">
                                    <ClientSearch />
                                    <div className="mt-5">
                                        {formData.client !== null && client !== null ? (
                                            <Button size="tiny" color="black" disabled>CLIENT SELECTED</Button>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="p-3 text-center">
                                    <PropertySearch />
                                    <div className="mt-5">
                                        {formData.property !== null && property !== null ? (
                                            <Button size="tiny" color="black" disabled>PROPERTY SELECTED</Button>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <Divider />
                            {formData.property && formData.client ? (
                                <>
                                    <div className="text-white">
                                        <div className="text-black p-7 rounded-lg bg-gradient-to-b from-[#FFFFFF] to-[#fbfbfb] shadow-inner shadow-md">
                                            <p>Hey team,</p>
                                            <div
                                                onMouseOver={() => setMsgHover(true)}
                                                onMouseOut={() => setMsgHover(false)}
                                                className="w-[300px]"
                                            >
                                                {msgHover ? (
                                                    <TextArea
                                                        name='msg'
                                                        value={msg}
                                                        onChange={handleChange}
                                                        size="huge"
                                                        placeholder="Enter custom message here."
                                                        className="ms-3 !w-[290px]"
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

                                            <div className="indent-5">
                                                <ul>
                                                    <li className="mt-3"><strong>Name:</strong> {client?.name} </li>
                                                    <li className="mt-3"><strong>Phone:</strong> {client?.phone_number}</li>
                                                    <li className="mt-3"><strong>Email:</strong> {client?.email}</li>
                                                    <li className="mt-3">
                                                        <label htmlFor="interested" className=""><strong>Interested In:</strong></label>
                                                        <Input
                                                            name="interested"
                                                            value={interested}
                                                            onChange={handleChange}
                                                            size="small"
                                                            className="ms-3 !w-[100px] !h-[30px] !border-[#fcfcfc]"

                                                        />
                                                    </li>
                                                    <li className="mt-3">
                                                        <label htmlFor="move_by"><strong>Move By:</strong></label>
                                                        <Input
                                                            name="move_by"
                                                            value={move_by}
                                                            onChange={handleChange}
                                                            size="small"
                                                            className="ms-3 !w-[125px] !h-[30px]"
                                                        />
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mt-5">
                                                <p>Best,</p>
                                                <p>{user?.first_name} {user?.last_name}</p>
                                                <p>{user?.profile?.phone_number}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-6 mb-3 ml-3 mr-3">
                                        <div>
                                            <Button color="red" onClick={handleResetCard} size="tiny" inverted>RESET</Button>
                                        </div>
                                        <Button color="green" onClick={handleSubmit}>SEND TO {property?.name.toUpperCase()}</Button>
                                    </div>
                                    <div className="flex justify-end mt-3 mb-6">
                                    </div>
                                </>
                            ) : (
                                <div className="text-center text-white mb-6">
                                    <p>Please select both client and property to proceed.</p>
                                </div>
                            )}
                        </>
                    </Modal.Content>
                    <Modal.Actions>
                        <div className="flex flex-row items-end mb-3">
                            <Button className="drop-shadow-sm" onClick={handleCloseModal}>CLOSE</Button>
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
