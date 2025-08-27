import { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Divider, Form, Loader, Popup } from "semantic-ui-react";
import { load_list, new_option, update_list } from "../../store/actions/listmaker";
import { reset_list_mode, set_edit_list, set_list_mode } from "../../store/actions/ui";
import MapBox from "../maps/MapBox";
import OptionControls from "../options/OptionControls";
import OptionList from "../options/OptionList";
import PropertySearch from "../search/PropertySearch";
import DeleteList from "./DeleteList";

function ListDetail({ listID, list, property, user, set_list_mode, new_option, handleCloseModal, load_list, isListMode, set_edit_list }) {

    const formatDate = (datetimeStr) => {
        const dateObj = new Date(datetimeStr);
        return dateObj.toLocaleString('default', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).replace(',', '/');
    };

    const handleEditList = async () => {
        if (user && list) {
            set_edit_list()
            set_list_mode()
        }
    }

    const handlePropertyAdd = async (list, property) => {
        if (property && list) {
            console.log("client id", list.client)
            await new_option(property.id, list.id, list.client);
            load_list(list.id);
        }
    };

    const handleOpenURL = () => {
        if (list.uuid) {
            const fullURL = `${window.location.origin}/list/${list?.uuid}`;
            window.open(fullURL, '_blank');
        }
    };

    useEffect(() => {
        if (listID) {
            load_list(listID);
        }
    }, [listID, load_list])

    return (
        <>
            {isListMode ? (
                <div className="flex flex-col justify-evenly">
                    <div className="">
                        <div className="flex flex-row items-center justify-center">
                            <PropertySearch />
                            <Form onSubmit={() => handlePropertyAdd(list, property)} className="!ml-5">
                                <Button color="blue" type="submit" size="tiny">ADD PROPERTY</Button>
                            </Form>
                        </div>
                        <Divider />
                        <div>
                            <OptionList />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-center pt-7 pb-3">
                            <MapBox options={list.options} />
                        </div>
                        <Divider />
                        <div className="flex justify-center items-center">
                            <OptionControls />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {list ? (
                        <div className="flex flex-col justify-evenly items-center">
                            <div className="flex flex-row justify-evenly mb-1">
                                <div className="p-2 mr-2">
                                    <p><b>Client: </b>{list?.client_name}</p>
                                    <p><b>Date Created: </b>{formatDate(list?.date)}</p>
                                    <p><b>Last Updated: </b></p>
                                    <p>
                                        <b className="pr-3">URL: </b>
                                        <Button onClick={handleOpenURL}>
                                            <i className="external alternate icon !-mr-1"></i>
                                        </Button>
                                    </p>
                                </div>
                                <div className="flex flex-col justify-evenly items-center">
                                    <DeleteList list={list} handleCloseModal={handleCloseModal} />
                                    <Button className="drop-shadow-sm text-nowrap !bg-[#90B8F8] hover:!bg-[#5F85DB]" type="submit" onClick={handleEditList}>EDIT LIST</Button>
                                </div>
                            </div>
                            <Divider />
                            <div className="flex flex-col justify-center items-center pb-5">
                                <h4 className="text-lg font-semibold mb-4">Options</h4>
                            </div>
                            <div className="w-11/12 md:w-full flex justify-center">
                                <table className="table-auto border rounded-lg">
                                    <thead className="bg-[#d9dadb] border rounded-lg">
                                        <tr>
                                            <th className="px-2 py-2 text-left text-sm font-bold text-gray-700">Property Name</th>
                                            <th className="px-2 py-2 text-left text-sm font-bold text-gray-700">Rate</th>
                                            <th className="px-2 py-2 text-left text-sm font-bold text-gray-700">Unit</th>
                                            <th className="px-2 py-2 text-left text-sm font-bold text-gray-700">Layout</th>
                                            <th className="px-2 py-2 text-left text-sm text-nowrap font-bold text-gray-700">Sq Ft</th>
                                            <th className="px-2 py-2 text-left text-sm font-bold text-gray-700">Notes </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list?.options.map((option, index) => (
                                            <tr
                                                key={option.id}
                                                className={`${index % 2 === 0 ? 'bg-[#232425]' : 'bg-[#26282B]'} text-white hover:bg-gray-100 hover:text-black transition`}
                                            >
                                                <td className="px-2 py-2 whitespace-nowrap text-sm">{option?.prop_name}</td>
                                                <td className="px-2 py-2 text-xs">${option?.price}</td>
                                                <td className="px-2 py-2 text-xs">{option?.unit}</td>
                                                <td className="px-2 py-2 text-xs">{option?.layout}</td>
                                                <td className="px-2 py-2 text-xs">{option?.sq_ft}</td>
                                                <td className="px-2 py-2 text-xs text-center">
                                                    {option?.notes ? (
                                                        <Popup
                                                            content={option.notes}
                                                            trigger={<i className="ellipsis horizontal icon"></i>}
                                                        />
                                                    ) : (<></>)}

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Loader active inverted />
                        </>
                    )}
                </>
            )}
        </>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    error: state.auth.error,
    client: state.listmaker.client,
    isListMode: state.ui.isListMode,
    isReorderMode: state.ui.isReorderMode,
    property: state.listmaker.property,
    list: state.listmaker.list,
    options: state.listmaker.options
});

export default connect(mapStateToProps, { set_list_mode, load_list, new_option, update_list, reset_list_mode, set_edit_list })(ListDetail);