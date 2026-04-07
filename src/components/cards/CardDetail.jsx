import { Divider, Loader } from "semantic-ui-react";
import "./cards.css";

function CardDetail({ card }) {

  const formatDate = (datetimeStr) => {
    const dateObj = new Date(datetimeStr);
    return dateObj.toLocaleString('default', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div>
      {card ? (
        <div className="cardDetailWrapper">
          <div className="cardDetailHeader">
            <p><b>Guest Card Sent: </b>{formatDate(card.date)}</p>
            <Divider />
          </div>
          <div className="cardDetailColumns">
            <div className="cardDetailCol">
              <p><b>Client: </b>{card.client_name}</p>
              <p><b>Property: </b>{card.prop_name}</p>
              <p><b>Message: </b></p>
              <p className="cardDetailText">
                {card.msg}
              </p>
              <p><b>Interested In: </b>{card.interested}</p>
              <p><b>Move-in Date: </b>{card.move_by}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="cardMapArea">
          <Loader inverted active />
        </div>
      )}
    </div>
  )
}

export default CardDetail;
