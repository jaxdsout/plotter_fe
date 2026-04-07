import "./props.css";

function PropDetail({ propSel }) {
  return (
    <div className="propDetailWrapper">
      <div className="propDetailInfo">
        <img src={propSel?.image} alt='property_img' className="propDetailImg" />
        <a className="propDetailLabel" href={`https://www.google.com/maps/search/?q=${propSel.name}`} target="_blank" rel="noopener noreferrer">{propSel.address}</a>
        <p className="propDetailLabel">{propSel.neighborhood}</p>
        <a href={`${propSel.website}`}>Website</a>
      </div>
      <div className="propDetailCommission">
        <div className="propCommTableWrap">
          <table className="propCommTable">
            <thead className="propCommThead">
              <tr>
                <th className="propCommTh">Send</th>
                <th className="propCommTh">Escort</th>
                <th className="propCommTh">Flat Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr className="propCommRow">
                <td className="propCommTd">{propSel.commission.send}%</td>
                <td className="propCommTd">{propSel.commission.escort}%</td>
                <td className="propCommTd">${propSel.commission.flat_fee}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="propDetailNote">Last Updated: {propSel.commission.updated_date}</p>
      </div>
    </div>
  )
}

export default PropDetail;
