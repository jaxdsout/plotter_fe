import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Divider, List, Popup } from "semantic-ui-react";
import { delete_option, load_list } from "../../store/actions/listmaker";
import UpdateOption from "./UpdateOption";
import "./options.css";

function OptionDetail({ option, isReorderMode, delete_option, load_list, list }) {
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const formatDate = (datetimeStr) => {
        const dateObj = new Date(datetimeStr);
        return dateObj.toLocaleString('default', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
        }).replace(',', '/');
    };

    const handleDeleteConfirm = (optionID) => {
        setDeleteConfirm(optionID);
    };

    const handleDelete = async (optionID, list) => {
        await delete_option(optionID, list.id);
        load_list(list.id);
        setDeleteConfirm(null);
    };

    useEffect(() => {
        if (deleteConfirm) {
            const timer = setTimeout(() => setDeleteConfirm(null), 7000);
            return () => clearTimeout(timer);
        }
    }, [deleteConfirm]);

    return (
        <div key={option.id} className="optionDetailWrapper">
            {!isReorderMode ? (
                <div className="optionDetailRow">
                    <div className="optionDetailLeft">
                        <Popup
                            position="bottom left"
                            trigger={<i className="ellipsis horizontal icon" style={{ marginBottom: '0.25rem', marginRight: '0.5rem' }}></i>}
                            content={
                                <>
                                    {option.price === null ? (<p>No details added yet.</p>) : (
                                        <List>
                                            <List.Item>${option.price}</List.Item>
                                            <List.Item>Unit {option.unit_number}</List.Item>
                                            <List.Item>{option.layout}; {option.sq_ft} sq. ft.</List.Item>
                                            <List.Item>Available: {formatDate(option.available)}</List.Item>
                                            <List.Item>{option.notes}</List.Item>
                                        </List>
                                    )}
                                </>
                            }
                        />
                        <p className="optionPropName">{option.prop_name}</p>
                    </div>
                    <div className="optionDetailRight">
                        <UpdateOption option={option} />

                        {deleteConfirm === option.id ? (
                            <Popup
                                content="CONFIRM DELETE"
                                open
                                position="left center"
                                size="tiny"
                                className="deletePopup"
                                trigger={
                                    <button
                                        type="submit"
                                        className="optionDeleteBtnConfirm"
                                        onClick={() => handleDelete(option.id, list)}
                                    >
                                        <i className="trash alternate icon iconNarrow"></i>
                                    </button>
                                }
                            />
                        ) : (
                            <button onClick={() => handleDeleteConfirm(option.id)} className="optionActionBtn">
                                <i className="trash alternate icon iconNarrow"></i>
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="optionReorderRow">
                    <p className="optionPropName">{option.prop_name}</p>
                </div>
            )}

            <Divider style={{ width: '100%', marginBottom: '0.5rem' }} />
        </div>
    )
}

const mapStateToProps = state => ({
    isReorderMode: state.ui.isReorderMode,
    error: state.auth.error,
    options: state.listmaker.options,
    list: state.listmaker.list,
})

export default connect(mapStateToProps, { delete_option, load_list })(OptionDetail);
