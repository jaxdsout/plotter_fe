
import { useState } from "react";
import CardDetail from "./CardDetail";
import { Modal, Button, Loader } from "semantic-ui-react";
import { connect } from "react-redux";

function AllCards({ cards }) {
    const [selectedCard, setSelectedCard] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = (card) => {
        setSelectedCard(selectedCard === card ? null : card)
        setShowModal(true);
    };

    const handleCloseModal = async () => {
        setShowModal(false);
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
        });
    };

    return (
        <div className="w-full overflow-y-auto min-h-[44rem]">
            <div className="flex flex-col items-center overflow-y-auto min-h-[24rem] max-h-full text-left mt-3 mb-10 snap-start">
                {cards?.length > 0 && (
                    <>
                        <table className="w-11/12">
                            <thead className="text-gray-500 bg-[#1f2124] text-xs text-center">
                                <tr className="">
                                    <th className="p-2 rounded-tl-md rounded-bl-md">Client</th>
                                    <th className="p-2">Property</th>
                                    <th className="p-2 ounded-tr-md rounded-br-md">Date Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cards.map((card) => (
                                    <tr
                                        key={card.id}
                                        className="font-bold text-black hover:text-black hover:bg-gray-500 transition odd:bg-none even:bg-gray-200 text-center cursor-pointer"
                                        onClick={() => handleOpenModal(card)}
                                    >
                                        <td className="p-2 text-[0.89rem] sm:text-base hover:text-[#5F85DB]">{card.client_name}</td>
                                        <td className="p-2 text-[0.7rem] sm:text-base hover:text-[#5F85DB]">{card.prop_name}</td>
                                        <td className="p-2 text-[0.5rem] sm:text-base hover:text-[#5F85DB] text-wrap">{formatDate(card.date)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {selectedCard && (
                            <Modal className='!w-11/12 sm:!w-[500px] !mb-10' open={showModal} onClose={handleCloseModal}>
                                <Modal.Header>Card Info</Modal.Header>
                                <Modal.Content>
                                    <CardDetail card={selectedCard} handleCloseModal={handleCloseModal} />
                                </Modal.Content>
                                <Modal.Actions className="flex justify-end">
                                    <Button onClick={handleCloseModal}>CLOSE</Button>
                                </Modal.Actions>
                            </Modal>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    cards: state.agent.cards,
    user: state.auth.user,
    isLoaded: state.agent.isLoaded
});

export default connect(mapStateToProps, {})(AllCards);