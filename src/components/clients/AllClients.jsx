import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Dimmer, Divider, Loader, Modal } from "semantic-ui-react";
import { reset_deal_mode, reset_edit_list, reset_list_mode } from "../../store/actions/ui";
import DealDetail from "../deals/DealDetail";
import ListDetail from "../lists/ListDetail";
import ClientDetail from "./ClientDetail";
import DeleteClient from "./DeleteClient";
import "./clients.css";

function AllClients({ clients, isListMode, isDealMode, reset_list_mode, reset_edit_list, reset_deal_mode, isLoaded }) {
    const [showClientDetail, setShowClientDetail] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDealModal, setShowDealModal] = useState(null);
    const [clientTab, setClientTab] = useState("info");
    const [showListModal, setShowListModal] = useState(null);
    const [selectedList, setSelectedList] = useState(null);
    const [selectedDeal, setSelectedDeal] = useState(null);
    const [sortedClients, setSortedClients] = useState([]);

    useEffect(() => {
        const sorted = [...clients].sort((a, b) => a.last_name.localeCompare(b.last_name));
        setSortedClients(sorted)
    }, [clients]);

    const handleOpenModal = (id) => {
        setShowClientDetail(showClientDetail === id ? null : id)
        setShowModal(true);
        setClientTab("info");
    };

    const handleCloseModal = async () => {
        setShowModal(false);
        await reset_edit_list();
    }

    const handleTabChange = (tab) => {
        setClientTab(tab);
    };

    const handleOpenListModal = (list) => {
        setSelectedList(list.id);
        setShowListModal(true);
    };

    const handleCloseListModal = () => {
        setShowListModal(false);
        setSelectedList(null);
        reset_list_mode();
    };

    const handleOpenDealModal = (deal) => {
        setSelectedDeal(deal.id);
        setShowDealModal(true);
    };

    const handleCloseDealModal = () => {
        setShowDealModal(false);
        setSelectedDeal(null);
    };

    const handleCancelEdit = async () => {
        reset_list_mode();
        reset_deal_mode();
    }

    const formatDate = (datetimeStr) => {
        const dateObj = new Date(datetimeStr);
        return dateObj.toLocaleString('default', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }).replace('', '');
    };

    return (
        <div className="dataPage">
            <div className="dataList">
                {!isLoaded ? (
                    <Loader inverted active />
                ) : sortedClients.length > 0 ? (
                    <table className="dataTable">
                        <thead className="dataThead">
                            <tr>
                                <th className="dataThFirst">Client</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedClients.map((client) => (
                                <tr
                                    key={client.id}
                                    className="dataRow"
                                    onClick={() => handleOpenModal(client.id)}
                                >
                                    <td className="dataTd">{client.first_name} {client.last_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No clients added yet.</p>
                )}
            </div>

            {sortedClients.map(client => (
                <>
                    {showClientDetail === client.id && (
                        <Modal className='modalSm' open={showModal} close onClose={handleCloseModal}>
                            <Modal.Header>Client Details</Modal.Header>
                            <Modal.Content>
                                <div className="clientsModalTabBar">
                                    <div className="clientsModalTabs">
                                        <Button onClick={() => handleTabChange("info")} className="button">INFO</Button>
                                        <Button onClick={() => handleTabChange("lists")} className="button">LISTS</Button>
                                        <Button onClick={() => handleTabChange("deals")} className="button">DEALS</Button>
                                    </div>
                                    <div>
                                        <DeleteClient client={client} handleCloseModal={handleCloseModal} />
                                    </div>
                                </div>
                                <Divider />
                                <div>
                                    {clientTab === "info" && (
                                        <ClientDetail client={client} />
                                    )}
                                    {clientTab === "lists" && (
                                        <div className="clientsTabContent">
                                            {client.lists ? (
                                                <ul>
                                                    {client.lists.map(list => (
                                                        <li className="clientsTabItem" key={list.id}>
                                                            <Button className="clientsTabItemBtn" onClick={() => handleOpenListModal(list)}>
                                                                {formatDate(list.date)}
                                                            </Button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <Dimmer active><Loader /></Dimmer>
                                            )}
                                        </div>
                                    )}
                                    {clientTab === "deals" && (
                                        <div className="clientsTabContent">
                                            {client.deals ? (
                                                <ul>
                                                    {client.deals.map(deal => (
                                                        <li className="clientsTabItem" key={deal.id}>
                                                            <Button className="clientsTabItemBtn" onClick={() => handleOpenDealModal(deal)}>
                                                                {deal.prop_name} {deal.move_date}
                                                            </Button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <Dimmer active><Loader /></Dimmer>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Modal.Content>
                            <Modal.Actions className="modalActionsRight">
                                <Button className="button" onClick={handleCloseModal}>CLOSE</Button>
                            </Modal.Actions>
                        </Modal>
                    )}
                </>
            ))}

            {showListModal && selectedList && (
                <Modal className="modalSm" open={showListModal} onClose={handleCloseListModal}>
                    <Modal.Header>List Details</Modal.Header>
                    <Modal.Content>
                        <ListDetail listID={selectedList} handleCloseModal={handleCloseListModal} />
                    </Modal.Content>
                    <Modal.Actions className="modalActionsRight">
                        {isListMode ? (
                            <Button className="button" onClick={handleCancelEdit}>CANCEL</Button>
                        ) : (
                            <Button className="button" onClick={handleCloseListModal}>CLOSE</Button>
                        )}
                    </Modal.Actions>
                </Modal>
            )}

            {showDealModal && selectedDeal && (
                <Modal className="modalSm" open={showDealModal} onClose={handleCloseDealModal}>
                    <Modal.Header>Deal Details</Modal.Header>
                    <Modal.Content>
                        <DealDetail dealID={selectedDeal} handleCloseModal={handleCloseDealModal} />
                    </Modal.Content>
                    <Modal.Actions className="modalActionsRight">
                        {isDealMode ? (
                            <Button className="button" onClick={handleCancelEdit}>CANCEL</Button>
                        ) : (
                            <Button className="button" onClick={handleCloseDealModal}>CLOSE</Button>
                        )}
                    </Modal.Actions>
                </Modal>
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    clients: state.agent.clients,
    isListMode: state.ui.isListMode,
    isDealMode: state.ui.isDealMode,
    isLoaded: state.agent.isLoaded
});

export default connect(mapStateToProps, { reset_list_mode, reset_deal_mode, reset_edit_list })(AllClients);
