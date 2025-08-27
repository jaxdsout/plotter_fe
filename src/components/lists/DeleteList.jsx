import { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Popup } from 'semantic-ui-react';
import { load_lists } from '../../store/actions/agent';
import { delete_list } from '../../store/actions/listmaker';

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
                    className='!text-red-700 !font-black text-center'
                    trigger={
                        <Button
                            type="submit"
                            color="red"
                            onClick={() => handleDelete(list.id, user.id)}
                        >
                            <i class="trash alternate icon !-mr-1"></i>
                        </Button>
                    }
                />
            ) : (
                <Button type="submit" color="red" onClick={() => handleDeleteConfirm(list.id)}>
                    <i class="trash alternate icon !-mr-1"></i>
                </Button>
            )
            }
        </>
    )


}

const mapStateToProps = (state) => ({
    error: state.auth.error,
    options: state.listmaker.options,
    user: state.auth.user
});

export default connect(mapStateToProps, { delete_list, load_lists })(DeleteList);
