import { connect } from "react-redux";
import { useState } from "react";
import { set_reorder_mode, set_send_mode, reset_list_mode, reset_reorder_mode, set_edit_list } from "../../store/actions/ui";
import { clear_options, load_list, update_list } from "../../store/actions/listmaker";
import { Button } from "semantic-ui-react";

function OptionControls({ clear_options, list, load_list, reset_reorder_mode, set_reorder_mode, isEditMode, isReorderMode, isListMode, reset_list_mode, set_send_mode, update_list, user, client, options }) {

    const [clearConfirm, setClearConfirm] = useState(false);

    const handleClearOptions = async (listID) => {
        await clear_options(listID);
        await load_list(listID);
        setClearConfirm(false)
    };

    const handleConfirmClear = () => {
        setClearConfirm(true)
    };

    setTimeout(() => {
        if (clearConfirm) {
            setClearConfirm(false)
        }
    }, 5000)

    const handleReorder = () => {
        if (isReorderMode) {
            reset_reorder_mode()
        } else {
            set_reorder_mode();
        }
    }

    const handleSaveList = async () => {
        if (isListMode) {
            await update_list(user.id, list.client, list, options)
            await reset_list_mode()
            load_list(list.id);
        }
    }


    const handleSendList = async (e) => {
        e.preventDefault();
        await update_list(user.id, client.id, list, options);
        await load_list(list.id)
        set_send_mode();
    }

    if (isReorderMode) return (

        <Button
            className="drop-shadow-sm hover:!bg-[#3a528a]"
            onClick={handleReorder}
            style={{ backgroundColor: isReorderMode ? "green" : "#4d6cb2", color: "white" }}
            size='tiny'
        >
            {isReorderMode ?
                <div>
                    <i className="check circle icon" /> CONFIRM REORDER
                </div>
                :
                <div>
                    <i className="sort icon" /> REORDER
                </div>
            }
        </Button>
    )

    if (isListMode) return (
        <>
            {clearConfirm ? (
                <Button className="drop-shadow-sm" color='red' size='tiny' onClick={(() => handleClearOptions(list.id))}>
                    <i className="check circle icon" />CONFIRM CLEAR
                </Button>
            ) : (
                <Button className="drop-shadow-sm text-nowrap hover:!bg-red-500" color='black' size='tiny' onClick={(() => handleConfirmClear())}>
                    <i className="exclamation triangle icon" />CLEAR LIST
                </Button>
            )}
            <Button
                className="drop-shadow-sm hover:!bg-[#3a528a]"
                onClick={handleReorder}
                style={{ backgroundColor: isReorderMode ? "green" : "#4d6cb2", color: "white" }}
                size='tiny'
            >
                {isReorderMode ?
                    <div>
                        <i className="check circle icon" /> CONFIRM REORDER
                    </div>
                    :
                    <div>
                        <i className="sort icon" /> REORDER
                    </div>
                }
            </Button>
            {isListMode && (
                <>
                    {isEditMode ? (
                        <Button className="drop-shadow-sm" color="green" type="submit" size='tiny' onClick={handleSaveList}>
                            <i className="check circle icon" />SAVE LIST
                        </Button>
                    ) : (
                        <Button className="drop-shadow text-nowrap" type='submit' color='green' size='tiny' onClick={handleSendList}>
                            <i className="check circle icon" />SEND LIST
                        </Button>
                    )}
                </>
            )}



        </>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    error: state.auth.error,
    client_results: state.listmaker.client_results,
    client: state.listmaker.client,
    list: state.listmaker.list,
    isReorderMode: state.ui.isReorderMode,
    options: state.listmaker.options,
    isSendMode: state.ui.isSendMode,
    isListMode: state.ui.isListMode,
    isEditMode: state.ui.isEditMode

});

export default connect(mapStateToProps, { clear_options, load_list, set_reorder_mode, update_list, set_send_mode, reset_list_mode, reset_reorder_mode, set_edit_list })(OptionControls);