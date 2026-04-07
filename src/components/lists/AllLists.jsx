import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Loader, Modal } from "semantic-ui-react";
import { load_list } from "../../store/actions/listmaker";
import { reset_list_mode } from "../../store/actions/ui";
import ListDetail from "./ListDetail";
import "./lists.css";

function AllLists({ lists, reset_list_mode, isListMode, load_list, isLoaded }) {
  const [selectedListID, setSelectedListID] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortedLists, setSortedLists] = useState([]);

  useEffect(() => {
    const sorted = [...lists].sort((a, b) => new Date(b.date) - new Date(a.date));
    setSortedLists(sorted);
  }, [lists]);

  const handleOpenModal = (id) => {
    setSelectedListID(selectedListID === id ? null : id)
    setShowModal(true);
  };

  const handleCloseModal = async () => {
    await reset_list_mode();
    setShowModal(false);
  }

  const handleCancelEdit = async (list) => {
    load_list(list.id);
    await reset_list_mode();
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
        ) : sortedLists.length > 0 ? (
          <>
            <table className="dataTable">
              <thead className="dataThead">
                <tr>
                  <th className="dataThFirst">Client</th>
                  <th className="dataThLast">Date Created</th>
                </tr>
              </thead>
              <tbody>
                {sortedLists.map((list) => (
                  <tr
                    key={list.id}
                    className="dataRow"
                    onClick={() => handleOpenModal(list.id)}
                  >
                    <td className="dataTd">{list.client_name}</td>
                    <td className="dataTdSm">{formatDate(list.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedListID && (
              <Modal className="modalSm" open={showModal} onClose={handleCloseModal}>
                <Modal.Header>List Info</Modal.Header>
                <Modal.Content>
                  <ListDetail listID={selectedListID} handleCloseModal={handleCloseModal} />
                </Modal.Content>
                <Modal.Actions className="modalActionsRight">
                  {isListMode ? (
                    <Button className="button" onClick={(() => handleCancelEdit(selectedListID))}>CANCEL</Button>
                  ) : (
                    <Button className="button" onClick={handleCloseModal}>CLOSE</Button>
                  )}
                </Modal.Actions>
              </Modal>
            )}
          </>
        ) : (
          <p>No lists added yet.</p>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  error: state.auth.error,
  lists: state.agent.lists,
  isListMode: state.ui.isListMode,
  isLoaded: state.agent.isLoaded
});

export default connect(mapStateToProps, { reset_list_mode, load_list })(AllLists);
