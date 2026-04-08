import { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Divider, Message, FormField, Input } from "semantic-ui-react";
import MapBox from "../components/MapBox";
import PropertySearch from "../components/PropertySearch";
import OptionList from "../options/OptionList";
import ClientSearch from "../components/ClientSearch";
import OptionControls from "../options/OptionControls";
import { new_list, delete_list, new_option, load_list } from "../store/actions/listmaker";
import { reset_list_mode, reset_send_mode, set_list_mode, reset_reorder_mode } from "../store/actions/ui"
import { load_lists } from "../store/actions/agent";


function NewList({ new_option, reset_reorder_mode, property, list, load_list, load_lists, user, new_list, client, isSendMode, isListMode, isReorderMode, delete_list, reset_list_mode, reset_send_mode, set_list_mode }) {
    const [showModal, setShowModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false)

    const link = `localhost:3000/list/${list?.uuid}`

    const handleErrorReset = () => {
        setError(null);
    };

    const handleCreateList = async (e) => {
        if (user !== null && client !== null) { 
            await new_list(user.id, client.id);
            set_list_mode()
        } else {
            setError('client')
        }
    };

    const handlePropertyAdd = async (list, property) => {
        if (property && list) {
            await new_option(property.id, list.id, client.id);
            await load_list(list.id);
        }
    };

    const handleResetClient = async (list) => {
        if (list && isListMode) {
            const listID = list.id
            await delete_list(listID);
            await reset_list_mode();
        }
        setShowResetModal(false);
    };

    const handleEditList = async () => {
        await reset_send_mode();
        if (list?.id) {
            await load_list(list.id);
        }
        set_list_mode();
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(link)
            .then(() => {
                setCopied(true)
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err)
            })
    }

    const handleOpenURL = () => {
        if (list?.uuid) {
            const fullURL = `${window.location.origin}/list/${list.uuid}`;
            window.open(fullURL, '_blank');
        }
    };

    /* MODAL HANDLERS */

    const handleOpenResetModal = () => {
        setShowResetModal(true);
    };

    const handleCloseResetModal = () => {
        setShowResetModal(false);
    };

    const handleOpenModal = () => {
        reset_list_mode();
        setShowModal(true);
    }

    const handleCloseModal = async () => {
        await reset_list_mode();
        await load_lists(user.id);
        reset_send_mode();
        reset_reorder_mode();
        setShowModal(false);
    }

    return (
        <>
            <div className="flex justify-center items-center p-4">
                <Button color="blue" onClick={handleOpenModal} className="!bg-[#90B8F8] hover:!bg-[#5F85DB] !font-extrabold">+</Button>
            </div>
            <div>
                <Modal className='!w-11/12 md:!w-[800px]' open={showModal} onClose={handleCloseModal}>
                    <Modal.Header>
                        {isListMode ? (
                            <p>New List: {client?.name}</p>
                        ) : isSendMode ? (
                            <p>Send List: {client?.name}</p>
                        ) : (
                            <p>Create New List</p>
                        )}
                    </Modal.Header>
                    <Modal.Content>
                        <div className="bg-[#ededed] rounded-xl p-6 pt-10 drop-shadow-sm">
                            {isListMode ? (
                                <div className="flex flex-col-reverse md:flex-row justify-evenly items-center md:items-start">
                                    <div className="flex flex-col items-center justify-start pb-5">
                                        {!isReorderMode && (
                                            <>
                                                <div className="flex flex-row items-center justify-center bg-[#dbdbdb] rounded-xl p-4">
                                                    <PropertySearch/>
                                                    <div className="!ml-2">
                                                        <button 
                                                            className="bg-[#90B8F8] hover:bg-[#5F85DB] text-2xl rounded-full p-2" 
                                                            onClick={() => handlePropertyAdd(list, property)}
                                                        >
                                                            <i className="plus circle icon !-mr-0"/>
                                                        </button>
                                                    </div>
                                                </div>
                                                <Divider />
                                            </>

                                        )}
                                        <OptionList />
                                        {isReorderMode && (
                                            <OptionControls />
                                        )}
                                    </div>
                                    {!isReorderMode && (
                                        <div className="flex justify-center items-center pb-5">
                                            <MapBox options={list.options}/>                                                      
                                        </div>
                                    )}
                                </div>
                            ) : isSendMode ? (
                                <div className="flex flex-row justify-center items-center h-[20rem]">
                                    {isSendMode && (
                                        <Form>
                                            { copied && (
                                                <Message positive>
                                                    <Message.Header>Link copied to clipboard!</Message.Header>
                                                </Message>
                                            )}
                                            <FormField>
                                                <label>Shareable URL</label>
                                                <Input 
                                                    value={link} readOnly onClick={handleCopy} 
                                                    className="!w-[20rem] !border-none pr-4" />
                                                <Button onClick={handleOpenURL}>
                                                    <i class="external alternate icon !-mr-1"></i>
                                                </Button>
                                            </FormField>
                                        </Form>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center items-center h-[20rem]">
                                    <div className="flex flex-col lg:flex-row items-center justify-between">
                                        <ClientSearch />
                                        <Form onSubmit={handleCreateList} className="p-3">
                                            <Button className="!bg-[#90B8F8] hover:!bg-[#5F85DB] !font-extrabold drop-shadow" type="submit">
                                                <i className="magic icon"/>START LIST
                                            </Button>
                                        </Form>
                                    </div>
                                    {error === "client" && (
                                        <div>
                                            <Message negative onDismiss={handleErrorReset}>
                                                <Message.Header>Client Not Added</Message.Header>
                                                <p>Please choose client to start list</p>
                                            </Message>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <>
                        {isListMode ? (
                            <div className="flex flex-col-reverse sm:flex-row justify-between items-center sm:items-start pb-5">
                                {!isReorderMode && (
                                    <>
                                        <div>
                                            <Button size='tiny' className="drop-shadow-sm" onClick={handleOpenResetModal}><i className="long arrow alternate left icon"/>BACK</Button>
                                        </div>
                                        <div className="flex flex-row mb-6 sm:mb-0">
                                            <OptionControls />
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : isSendMode ? (
                            <div className="flex justify-between pb-5">
                                <Button size='tiny' className="drop-shadow-sm" onClick={handleEditList}><i className="long arrow alternate left icon"/>BACK</Button>
                                <Button size='tiny' className="drop-shadow-sm" color="green" onClick={handleCloseModal}>DONE</Button>
                            </div>
                        ) : (
                            <div className="flex justify-end pb-5">
                                <Button size='tiny' className="drop-shadow-sm" onClick={handleCloseModal}>CLOSE</Button>
                            </div>
                        )}
                        </>
                    </Modal.Actions>
                </Modal>
            </div>
            <Modal size="tiny" open={showResetModal} onClose={handleCloseResetModal}>
                <Modal.Header>Confirm List Deletion</Modal.Header>
                <Modal.Content>
                    <p>This will delete the current list. Are you sure you want to continue?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={handleCloseResetModal}>
                        CANCEL
                    </Button>
                    <Button positive onClick={() => handleResetClient(list)}>
                        CONFIRM
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user,
    error: state.auth.error,
    client: state.listmaker.client,
    isSendMode: state.ui.isSendMode,
    isListMode: state.ui.isListMode,
    list: state.listmaker.list,
    property: state.listmaker.property,
    isReorderMode: state.ui.isReorderMode
});

export default connect(mapStateToProps, { new_option, reset_reorder_mode, new_list, reset_list_mode, reset_send_mode, delete_list, set_list_mode, load_list, load_lists })(NewList);