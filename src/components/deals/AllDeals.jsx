import { useState } from "react";
import { connect } from "react-redux";
import { Button, Loader, Modal } from "semantic-ui-react";
import { load_deal } from "../../store/actions/agent";
import { reset_deal_mode } from "../../store/actions/ui";
import DealDetail from "./DealDetail";
import "./deals.css";

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
    <div className="dataPage">
      <div className="dataList">
        {!isLoaded ? (
          <Loader inverted active />
        ) : deals.length > 0 ? (
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
                {deals.map((deal) => (
                  <tr
                    key={deal.id}
                    className="dataRow"
                    onClick={() => handleOpenModal(deal.id)}
                  >
                    <td className="dataTd">{deal.client_name}</td>
                    <td className="dataTdSm">{deal.prop_name}</td>
                    <td className="dataTdSm">{deal.deal_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedDealID && (
              <Modal className="modalSm" open={showModal} onClose={handleCloseModal}>
                <Modal.Header>Deal Info</Modal.Header>
                <Modal.Content>
                  <DealDetail dealID={selectedDealID} handleCloseModal={handleCloseModal} />
                </Modal.Content>
                <Modal.Actions className="modalActionsRight">
                  {isDealMode ? (
                    <Button className="button" onClick={(() => handleCancelEdit(selectedDealID))}>CANCEL</Button>
                  ) : (
                    <Button className="button" onClick={handleCloseModal}>CLOSE</Button>
                  )}
                </Modal.Actions>
              </Modal>
            )}
          </>
        ) : (
          <p>No deals added yet.</p>
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
