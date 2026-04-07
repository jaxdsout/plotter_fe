import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Popup } from 'semantic-ui-react';
import { delete_client, load_clients } from '../../store/actions/agent';
import "./clients.css";

function DeleteClient({ delete_client, load_clients, client, handleCloseModal, user }) {
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDeleteConfirm = (clientID) => {
    setDeleteConfirm(clientID);
  };

  const handleDelete = async (clientID, userID) => {
    await delete_client(clientID);
    await load_clients(userID);
    setDeleteConfirm(null);
    handleCloseModal();
  };

  useEffect(() => {
    if (deleteConfirm) {
      const timer = setTimeout(() => setDeleteConfirm(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [deleteConfirm]);

  return (
    <>
      {deleteConfirm === client.id ? (
        <Popup
          content="CONFIRM DELETE"
          open
          position="top center"
          size="tiny"
          className='deletePopup'
          trigger={
            <Button
              type="submit"
              color="red"
              onClick={() => handleDelete(client.id, user.id)}
            >
              <i className="trash alternate icon iconNarrow"></i>
            </Button>
          }
        />
      ) : (
        <Button type="submit" color="red" onClick={() => handleDeleteConfirm(client.id)}>
          <i className="trash alternate icon iconNarrow"></i>
        </Button>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  user: state.auth.user,
});

export default connect(mapStateToProps, { delete_client, load_clients })(DeleteClient);
