import { Divider, Loader } from "semantic-ui-react";

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
                <div className="flex flex-col mb-4">
                    <div className="text-center">
                        <p><b>Guest Card Sent: </b>{formatDate(card.date)}</p>
                        <Divider />
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row justify-evenly items-center text-black">
                        <div className="flex flex-col">
                            <p><b>Client: </b>{card.client_name}</p>
                            <p><b>Property: </b>{card.prop_name}</p>
                            <p><b>Message: </b></p>
                            <p className="text-sm text-wrap pl-3 pr-3">
                                {card.msg}
                            </p>
                            <p><b>Interested In: </b>{card.interested}</p>
                            <p><b>Move-in Date: </b>{card.move_by}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='h-[40rem] flex flex-col items-center justify-center mt-3 pt-5'>
                    <Loader inverted active />
                </div>

            )}
        </div>
    )
}



export default CardDetail;