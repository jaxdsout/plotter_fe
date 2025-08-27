import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Popup } from 'semantic-ui-react';
import { delete_deal, load_deals } from '../../store/actions/agent';

function DeleteDeal({ delete_deal, load_deals, deal, handleCloseModal, user }) {
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const handleDeleteConfirm = (dealID) => {
        setDeleteConfirm(dealID);
    };

    const handleDelete = async (dealID, userID) => {
        await delete_deal(dealID);
        await load_deals(userID);
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
            {deleteConfirm === deal.id ? (
                <Popup
                    content="CONFIRM DELETE"
                    open
                    position="top center"
                    className='!text-red-700 !font-black'
                    trigger={
                        <Button
                            type="submit"
                            color="red"
                            size="tiny"
                            onClick={() => handleDelete(deal.id, user.id)}
                        >
                            <i class="trash alternate icon"></i>
                        </Button>
                    }
                />
            ) : (
                <Button size='tiny' type="submit" color="red" onClick={() => handleDeleteConfirm(deal.id)}>
                    <i class="trash alternate icon"></i>
                </Button>
            )
            }
        </>
    );
}

const mapStateToProps = (state) => ({
    error: state.auth.error,
    user: state.auth.user,
});

export default connect(mapStateToProps, { delete_deal, load_deals })(DeleteDeal); 
