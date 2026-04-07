import { useState } from "react";
import { connect } from "react-redux";
import { Button, Loader, Modal } from "semantic-ui-react";
import CardDetail from "./CardDetail";
import "./cards.css";

function AllCards({ cards, isLoaded }) {
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
    <div className="dataPage">
      <div className="dataList">
        {!isLoaded ? (
          <Loader inverted active />
        ) : cards?.length > 0 ? (
          <>
            <table className="dataTable">
              <thead className="dataThead">
                <tr>
                  <th className="dataThFirst">Client</th>
                  <th className="dataTh">Property</th>
                  <th className="dataThLast">Date Created</th>
                </tr>
              </thead>
              <tbody>
                {cards.map((card) => (
                  <tr
                    key={card.id}
                    className="dataRow"
                    onClick={() => handleOpenModal(card)}
                  >
                    <td className="dataTd">{card.client_name}</td>
                    <td className="dataTdSm">{card.prop_name}</td>
                    <td className="cardsTdDate">{formatDate(card.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedCard && (
              <Modal className='modalSm' open={showModal} onClose={handleCloseModal}>
                <Modal.Header>Card Info</Modal.Header>
                <Modal.Content>
                  <CardDetail card={selectedCard} handleCloseModal={handleCloseModal} />
                </Modal.Content>
                <Modal.Actions className="modalActionsRight">
                  <Button className="button" onClick={handleCloseModal}>CLOSE</Button>
                </Modal.Actions>
              </Modal>
            )}
          </>
        ) : (
          <p>No cards added yet.</p>
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
