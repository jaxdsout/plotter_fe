import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Icon, Popup } from "semantic-ui-react";
import MapBox from "../../components/maps/MapBox";
import { retrieve_list } from "../../store/actions/listmaker";
import { set_client_view } from "../../store/actions/ui";
import "./clientList.css";

function PublicList({ retrieve_list, retrlist, isClientView, set_client_view }) {
  const { uuid } = useParams();

  const formatDate = (datetimeStr) => {
    const dateObj = new Date(datetimeStr);
    return dateObj.toLocaleString('default', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).replace('', '');
  };

  useEffect(() => {
    set_client_view()
    retrieve_list(uuid)
  }, [uuid, retrieve_list, set_client_view])

  return (
    <>
      {isClientView && retrlist !== null ? (
        <div className="publicListPage">
          <div className="publicListHeader">
            <h2 className="publicListClientName">{retrlist.client_name}</h2>
          </div>

          <div className="publicListContent">
            <div className="publicListColumns">
              <div>
                <MapBox retr_options={retrlist.options} />
              </div>
              <div>
                <ul>
                  {retrlist.options.map(option => (
                    <li key={option.id} className="publicListItem">
                      <div className="publicListCard">
                        <div className="publicListCardTop">
                          <p className="publicListPropName">{option.prop_name}</p>
                          <a href={`https://${option.website}`} target="_blank" rel="noopener noreferrer">
                            <Icon name="building" className="publicListIcon" />
                          </a>
                        </div>
                        <div className="publicListCardPrice">
                          <p className="publicListPrice">${Math.round(option.price)}</p>
                        </div>
                        <div className="publicListCardDetails">
                          <div className="publicListCardInfo">
                            <p className="publicListDetailLine">Unit {option.unit_number}</p>
                            <p className="publicListDetailLine">{option.layout} | {option.sq_ft} sq. ft.</p>
                            <p className="publicListDetailLineLast">Available: {option.available}</p>
                          </div>
                          <div className="publicListNoteIcon">
                            {option.notes && (
                              <Popup
                                trigger={<Icon name='sticky note' />}
                                content={<p>{option.notes}</p>}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="publicListFooter">
            <div>
              <Popup
                hoverable="false"
                position='right center'
                trigger={
                  <img src={retrlist.agent_avatar} className="publicListAvatar" alt="avatar" />
                }
                content={
                  <div>
                    {retrlist.agent_phone && (
                      <p><b>Phone:</b> <a href={`tel:${retrlist.agent_phone}`}>{retrlist.agent_phone}</a></p>
                    )}
                    {retrlist.agent_email && (
                      <p><b>Email:</b> <a href={`mailto:${retrlist.agent_email}`}>{retrlist.agent_email}</a></p>
                    )}
                  </div>
                }
              />
            </div>
            <div className="publicListAgentInfo">
              <p>Prepared by <b>{retrlist.agent_name}</b></p>
              <p className="publicListAgentDate">{formatDate(retrlist.date)}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

const mapStateToProps = state => ({
  retrlist: state.listmaker.retrlist,
  isClientView: state.ui.isClientView
});

export default connect(mapStateToProps, { retrieve_list, set_client_view })(PublicList);
