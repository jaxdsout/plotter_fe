
import { useState } from "react";
import { connect } from "react-redux";
import { Button, Loader, Modal } from "semantic-ui-react";
import { load_deal } from "../../store/actions/agent";
import { reset_deal_mode } from "../../store/actions/ui";
import DealDetail from "./DealDetail";

function AllDeals({ deals, isDealMode, reset_deal_mode, isLoaded }) {
    const [selectedDealID, setSelectedDealID] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = (id) => {
        setSelectedDealID(selectedDealID === id ? null : id)
        setShowModal(true);
    };

    const handleCloseModal = async () => {
        await reset_deal_mode();
        setShowModal(false);
    }

    const handleCancelEdit = async (deal) => {
        load_deal(deal.id);
        await reset_deal_mode();
    }

    return (
        <div className="w-full overflow-y-auto min-h-[44rem]">
            <div className="flex flex-col items-center overflow-y-auto min-h-[24rem] max-h-full text-left mt-3 mb-10 snap-start">
                {deals.length > 0 ? (
                    <>
                        <table className="w-11/12">
                            <thead className="text-white bg-[#1f2124] text-xs text-center">
                                <tr className="">
                                    <th className="p-2 rounded-tl-md rounded-bl-md">Client</th>
                                    <th className="p-2">Property</th>
                                    <th className="p-2 rounded-tr-md rounded-br-md">Date Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deals.map((deal) => (
                                    <tr
                                        key={deal.id}
                                        className="font-bold text-black hover:text-black hover:bg-gray-500 transition odd:bg-none even:bg-gray-200 text-center cursor-pointer"
                                        onClick={() => handleOpenModal(deal.id)}
                                    >
                                        <td className="p-2 hover:text-[#5F85DB]">{deal.client_name}</td>
                                        <td className="p-2 text-[0.7rem] sm:text-base hover:text-[#5F85DB]">{deal.prop_name}</td>
                                        <td className="p-2 text-[0.7rem] sm:text-base hover:text-[#5F85DB]">{deal.deal_date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {selectedDealID && (
                            <Modal className='!w-11/12 sm:!w-[500px] !mb-10' open={showModal} onClose={handleCloseModal}>
                                <Modal.Header>List Info</Modal.Header>
                                <Modal.Content>
                                    <DealDetail dealID={selectedDealID} handleCloseModal={handleCloseModal} />
                                </Modal.Content>
                                <Modal.Actions className="flex justify-end">
                                    {isDealMode ? (
                                        <Button onClick={(() => handleCancelEdit(selectedDealID))}>CANCEL</Button>
                                    ) : (
                                        <Button onClick={handleCloseModal}>CLOSE</Button>
                                    )}
                                </Modal.Actions>
                            </Modal>
                        )}
                    </>
                ) : (
                    <div className='flex flex-col items-center text-white justify-center'>
                        <Loader inverted active />
                    </div>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    deals: state.agent.deals,
    user: state.auth.user,
    isDealMode: state.ui.isDealMode,
    isLoaded: state.agent.isLoaded
});

export default connect(mapStateToProps, { reset_deal_mode })(AllDeals);