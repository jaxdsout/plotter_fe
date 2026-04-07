import { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Popup } from 'semantic-ui-react';
import { load_lists } from '../../store/actions/agent';
import { delete_list } from '../../store/actions/listmaker';
import "./lists.css";

function DeleteList({ delete_list, load_lists, list, handleCloseModal, user }) {
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDeleteConfirm = (listID) => {
    setDeleteConfirm(listID);
  };

  const handleDelete = async (listID, userID) => {
    console.log(listID, "listID")
    await delete_list(listID)
    await load_lists(userID);
    setDeleteConfirm(null);
    handleCloseModal()
  }

  return (
    <>
      {deleteConfirm === list?.id ? (
        <Popup
          content="CONFIRM DELETE"
          open
          position="top center"
          size="tiny"
          className="deletePopup"
          trigger={
            <Button
              type="submit"
              color="red"
              onClick={() => handleDelete(list.id, user.id)}
            >
              <i className="trash alternate icon iconNarrow"></i>
            </Button>
          }
        />
      ) : (
        <Button type="submit" color="red" onClick={() => handleDeleteConfirm(list.id)}>
          <i className="trash alternate icon iconNarrow"></i>
        </Button>
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  options: state.listmaker.options,
  user: state.auth.user
});

export default connect(mapStateToProps, { delete_list, load_lists })(DeleteList);
