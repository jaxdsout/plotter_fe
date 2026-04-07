import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Divider, Loader, Popup } from "semantic-ui-react";
import { load_deal, load_deals, update_deal_status } from "../../store/actions/agent.js";
import { set_deal_mode } from "../../store/actions/ui.js";
import DeleteDeal from "./DeleteDeal.jsx";
import EditDeal from "./EditDeal.jsx";
import "./deals.css";

function DealDetail({ dealID, deal, handleCloseModal, isDealMode, update_deal_status, set_deal_mode, load_deal, load_deals, user }) {
  const [paidConfirm, setPaidConfirm] = useState(false);

  const handleSetPaid = async (dealID, status) => {
    await update_deal_status(dealID, status);
    await load_deal(dealID);
    load_deals(user.id);
    setPaidConfirm(false)
  };

  const handleConfirmPaid = () => {
    setPaidConfirm(true)
  };

  setTimeout(() => {
    if (paidConfirm) {
      setPaidConfirm(false)
    }
  }, 5000)

  const handleEditDeal = async () => {
    if (user && deal) {
      set_deal_mode()
    }
  }

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr + "T00:00:00");
    return dateObj.toLocaleString('default', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }).replace(' ', '/');
  };

  const changeStatus = async (dealID, status) => {
    if (status) {
      await update_deal_status(dealID, status);
      await load_deal(dealID);
      load_deals(user.id);
    }
  }

  useEffect(() => {
    if (dealID) {
      load_deal(dealID);
    }
  }, [dealID, load_deal])

  return (
    <>
      {isDealMode ? (
        <EditDeal dealID={dealID} />
      ) : (
        <>
          {deal ? (
            <div className="dealDetailWrapper">
              <div className="dealDetailHeader">
                <p><b>Date Deal Created: </b>{formatDate(deal.deal_date)}</p>
                <Divider />
              </div>
              <div className="dealDetailColumns">
                <div className="dealDetailCol">
                  <p><b>Client: </b>{deal?.client_name}</p>
                  <p><b>Property: </b>{deal?.prop_name}</p>
                  <p><b>Unit Number: </b>{deal?.unit_no}</p>
                  <p><b>Lease Term: </b>{deal?.lease_term}</p>
                  <p><b>Move Date: </b>{deal.move_date}</p>
                  <p><b>Rent: </b>${deal?.rent}</p>
                  {deal?.rate ? (
                    <p><b>Rate: </b>{deal?.rate}%</p>
                  ) : (
                    <p><b>Rate: </b>${deal?.flat_fee}</p>
                  )}
                  <p><b>Commission: </b>${deal?.commission}</p>
                  <p><b>Lease End Date: </b>{deal?.lease_end_date}</p>
                  <p><b>Invoice Date: </b>{deal?.invoice_date}</p>
                </div>
                <div className="dealDetailLeft">
                  {deal?.status === 'not' && (
                    <Button size='tiny' onClick={() => changeStatus(deal.id, 'pend')} color="yellow" className="dealDetailStat">SET INVOICED</Button>
                  )}
                  {deal.status === 'pend' && (
                    <>
                      {paidConfirm ? (
                        <Popup
                          content="THIS CANNOT BE UNDONE"
                          open
                          position="top center"
                          size="tiny"
                          className="dealDetailPaid"
                          trigger={
                            <Button onClick={() => handleSetPaid(deal.id, deal.status)} color="green" size='tiny' className="dealDetailStatNowrap">
                              CONFIRM PAYMENT
                            </Button>
                          }
                        />
                      ) : (
                        <Button size='tiny' onClick={handleConfirmPaid} color="green" className="dealDetailStatNowrap">SET PAID</Button>
                      )}
                    </>
                  )}
                  {deal.status === 'over' && (
                    <>
                      <Button size="tiny" disabled color="red" className="dealDetailStatNowrap">INVOICE OVERDUE</Button>
                      {paidConfirm ? (
                        <Popup
                          content="THIS CANNOT BE UNDONE"
                          open
                          position="top center"
                          size="tiny"
                          className="dealDetailPaid"
                          trigger={
                            <Button onClick={() => handleSetPaid(deal.id, deal.status)} color="green" size='tiny' className="dealDetailStatNowrap">
                              CONFIRM PAYMENT
                            </Button>
                          }
                        />
                      ) : (
                        <Button size='tiny' onClick={handleConfirmPaid} color="green" className="dealDetailStatNowrap">SET PAID</Button>
                      )}
                    </>
                  )}
                  {deal.status === 'paid' && (
                    <Button size="tiny" disabled color="green" className="dealDetailStat">INVOICE PAID</Button>
                  )}
                  <Button
                    className="dealDetailStatNowrap"
                    type="submit"
                    size="tiny"
                    color="grey"
                    onClick={handleEditDeal}
                  >
                    EDIT DEAL
                  </Button>
                  <DeleteDeal deal={deal} handleCloseModal={handleCloseModal} />
                </div>
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
  deal: state.agent.deal,
  isDealMode: state.ui.isDealMode
});

export default connect(mapStateToProps, { update_deal_status, load_deal, load_deals, set_deal_mode })(DealDetail);
