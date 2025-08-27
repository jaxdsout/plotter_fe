import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Divider, List, Popup } from "semantic-ui-react";
import { delete_option, load_list } from "../../store/actions/listmaker";
import UpdateOption from "./UpdateOption";

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
        <div key={option.id} className="flex flex-col justify-center items-center">
            {!isReorderMode ? (
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-row items-center justfify-between">

                        <Popup
                            position="bottom left"
                            trigger={<i className="ellipsis horizontal icon !mb-1 !mr-2"></i>}
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
                        <p className="font-black">{option.prop_name}</p>
                    </div>
                    <div className="ml-6 flex flex-row items-center justify-center">
                        <UpdateOption option={option} />

                        {deleteConfirm === option.id ? (
                            <Popup
                                content="CONFIRM DELETE"
                                open
                                position="left center"
                                size="tiny"
                                className='!text-red-700 !font-black'
                                trigger={
                                    <button
                                        type="submit"
                                        className="p-3 bg-red-600 text-white rounded-lg mr-2 hover:bg-red-800"
                                        onClick={() => handleDelete(option.id, list)}
                                    >
                                        <i className="trash alternate icon !-mr-1 !-ml-1"></i>
                                    </button>
                                }
                            />
                        ) : (
                            <div>
                                <button onClick={() => handleDeleteConfirm(option.id)} className="p-3 bg-[#2d2d2e] text-white rounded-lg mr-2 hover:bg-red-600">
                                    <i className="trash alternate icon !-mr-1 !-ml-1"></i>
                                </button>
                            </div>
                        )}

                    </div>
                </div>

            ) : (
                <div className="flex flex-row items-center justify-center">
                    <p className="font-black">{option.prop_name}</p>
                </div>
            )}

            <Divider className="w-full !mb-2" />
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
