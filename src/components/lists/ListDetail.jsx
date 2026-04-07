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
import "./lists.css";

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
        <div className="listDetailWrapper">
          <div>
            <div className="listDetailHeader">
              <PropertySearch />
              <Form onSubmit={() => handlePropertyAdd(list, property)} style={{ marginLeft: '1.25rem' }}>
                <Button className="button" type="submit" size="tiny">ADD PROPERTY</Button>
              </Form>
            </div>
            <Divider />
            <div>
              <OptionList />
            </div>
          </div>
          <div>
            <div className="listDetailLinkRow">
              <MapBox options={list.options} />
            </div>
            <Divider />
            <div className="listDetailShare">
              <OptionControls />
            </div>
          </div>
        </div>
      ) : (
        <>
          {list ? (
            <div className="listDetailWrapper">
              <div className="listDetailHeader" style={{ marginBottom: '0.25rem' }}>
                <div style={{ padding: '0.5rem', marginRight: '0.5rem' }}>
                  <p><b>Client: </b>{list?.client_name}</p>
                  <p><b>Date Created: </b>{formatDate(list?.date)}</p>
                  <p><b>Last Updated: </b></p>
                  <p>
                    <b style={{ paddingRight: '0.75rem' }}>URL: </b>
                    <Button onClick={handleOpenURL}>
                      <i className="external alternate icon" style={{ marginRight: '-0.25rem' }}></i>
                    </Button>
                  </p>
                </div>
                <div className="listDetailSaveRow">
                  <DeleteList list={list} handleCloseModal={handleCloseModal} />
                  <Button type="submit" size="tiny" color="grey" onClick={handleEditList}>EDIT LIST</Button>
                </div>
              </div>
              <Divider />
              <div className="listDetailSaveRow">
                <h4 className="listDetailSaveLabel">Options</h4>
              </div>
              <div className="listDetailTableWrap">
                <table className="listDetailTable">
                  <thead className="listDetailThead">
                    <tr>
                      <th className="listDetailTh">Property Name</th>
                      <th className="listDetailTh">Rate</th>
                      <th className="listDetailTh">Unit</th>
                      <th className="listDetailTh">Layout</th>
                      <th className="listDetailTh" style={{ whiteSpace: 'nowrap' }}>Sq Ft</th>
                      <th className="listDetailTh">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list?.options.map((option, index) => (
                      <tr
                        key={option.id}
                        className="listDetailRow"
                      >
                        <td className="listDetailTd">{option?.prop_name}</td>
                        <td className="listDetailTdXs">${option?.price}</td>
                        <td className="listDetailTdXs">{option?.unit}</td>
                        <td className="listDetailTdXs">{option?.layout}</td>
                        <td className="listDetailTdXs">{option?.sq_ft}</td>
                        <td className="listDetailTdCenter">
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
            <Loader active inverted />
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
