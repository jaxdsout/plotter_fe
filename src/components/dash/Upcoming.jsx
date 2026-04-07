import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import "./dash.css";

function Upcoming({ deals }) {
  const [renewals, setRenewals] = useState([]);
  const [move_ins, setMoveIns] = useState([])

  const get_upcoming = useCallback(() => {
    if (deals?.length === 0) return [];
    const now = new Date();

    const filteredRenewals = deals
      .filter(deal => deal.lease_end_date)
      .map(deal => ({ ...deal, lease_end_date: new Date(deal.lease_end_date) }))
      .sort((a, b) => a.lease_end_date - b.lease_end_date)
      .filter(deal => deal.lease_end_date >= now)
      .slice(0, 3);
    setRenewals(filteredRenewals);

    const filteredMoveIns = deals
      .filter(deal => deal.move_date)
      .map(deal => ({ ...deal, move_date: new Date(deal.move_date) }))
      .sort((a, b) => a.move_date - b.move_date)
      .filter(deal => deal.move_date >= now)
      .slice(0, 3);
    setMoveIns(filteredMoveIns);
  }, [deals]);

  useEffect(() => {
    if (deals?.length > 0) {
      get_upcoming();
    }
  }, [deals, get_upcoming])

  return (
    <div className="upcomingContainer">
      <div className="upcomingCol">
        <h4 className="upcomingTitle">Upcoming Renewals</h4>
        <div className="upcomingTableWrap">
          {renewals.length > 0 ? (
            <table className="upcomingTable">
              <thead className="upcomingThead">
                <tr>
                  <th className="upcomingThFirst">Client</th>
                  <th className="upcomingThLast">Lease End Date</th>
                </tr>
              </thead>
              <tbody>
                {renewals.map((deal) => (
                  <tr key={deal.id} className="upcomingRow">
                    <td className="upcomingTd">{deal.client_name}</td>
                    <td className="upcomingTdSm">{deal.lease_end_date.toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="upcomingEmpty">No upcoming renewals...</p>
          )}
        </div>
      </div>
      <div className="upcomingCol">
        <h4 className="upcomingTitle">Upcoming Move-Ins</h4>
        <div className="upcomingTableWrap">
          {move_ins.length > 0 ? (
            <table className="upcomingTable">
              <thead className="upcomingThead">
                <tr>
                  <th className="upcomingThFirst">Client</th>
                  <th className="upcomingThLast">Move-In Date</th>
                </tr>
              </thead>
              <tbody>
                {move_ins.map((deal) => (
                  <tr key={deal.id} className="upcomingRow">
                    <td className="upcomingTd">{deal.client_name}</td>
                    <td className="upcomingTdSm">{deal.move_date.toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="upcomingEmpty">No upcoming move-ins...</p>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  error: state.auth.error,
  user: state.auth.user,
  deals: state.agent.deals,
});

export default connect(mapStateToProps, {})(Upcoming);
