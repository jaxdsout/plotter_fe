import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Icon, Popup } from "semantic-ui-react";
import MapBox from "../components/maps/MapBox";
import { retrieve_list } from "../store/actions/listmaker";
import { set_client_view } from "../store/actions/ui";

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

    console.log(retrlist)

    return (
        <>
            {isClientView && retrlist !== null ? (
                <div className="flex flex-col items-center">

                    <div className="w-11/12 max-w-[900px] p-5 mt-5 bg-[#26282B] shadow-inner shadow-md rounded-lg">
                        <h2 className="text-center text-white">{retrlist.client_name}</h2>
                    </div>

                    <div className='w-11/12 max-w-[900px] p-5 mb-5 mt-5 bg-white shadow-inner shadow-md rounded-lg'>
                        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start">
                            <div>
                                <MapBox retr_options={retrlist.options} />
                            </div>
                            <div>
                                <ul>
                                    {retrlist.options.map(option => (
                                        <li key={option.id} className="pl-5 pr-5 lg:pr-0 mt-5 lg:mt-0">
                                            <div className="p-5 font-bold text-white hover:text-black hover:bg-gray-100 w-[23rem] mb-2 rounded-md shadow-inner shadow-md  transition odd:bg-[#26282B] even:bg-[#232425]">
                                                <div className="flex flex-row items-start justify-between">
                                                    <p className="text-xl">{option.prop_name}</p>
                                                    <a href={`https://${option.website}`} target="_blank" rel="noopener noreferrer">
                                                        <Icon name="building" className="!text-xl" />
                                                    </a>
                                                </div>
                                                <div className="flex flex-row items-start justify-between -mt-4 mb-3">
                                                    <p className="text-xl">${Math.round(option.price)}</p>
                                                </div>
                                                <div className="flex flex-row justify-between">
                                                    <div className="font-light">
                                                        <p className="-mb-1">Unit {option.unit_number}</p>
                                                        <p className="-mb-1">{option.layout} | {option.sq_ft} sq. ft.</p>
                                                        <p className="mb-0">Available: {option.available}</p>
                                                    </div>
                                                    <div className="flex items-end mb-2">
                                                        {!option.notes ? (
                                                            <></>
                                                        ) : (
                                                            <Popup
                                                                trigger={<Icon name='sticky note' />}
                                                                content={<p>{option.notes}</p>} />
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

                    <div className='w-11/12 max-w-[900px] flex flex-row items-center justify-center p-5 mb-10 bg-white shadow-inner shadow-md rounded-lg '>
                        <div>
                            <Popup
                                hoverable="false"
                                position='right center'
                                trigger={
                                    <img src={retrlist.agent_avatar} className="shadow-lg rounded-full w-16 h-16 object-cover" alt="avatar" />
                                }
                                content={
                                    <div>
                                        {retrlist.agent_phone ? (
                                            <p><b>Phone:</b> <a href={`tel:${retrlist.agent_phone}`}>{retrlist.agent_phone}</a></p>
                                        ) : (
                                            <></>
                                        )}
                                        {retrlist.agent_email ? (
                                            <p><b>Email:</b> <a href={`mailto:${retrlist.agent_email}`}>{retrlist.agent_email}</a></p>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                }
                            />
                        </div>
                        <div className="text-left ml-6">
                            <p className="text-black">Prepared by <b>{retrlist.agent_name}</b></p>
                            <p className="text-black -mt-2">{formatDate(retrlist.date)}</p>
                        </div>
                    </div>
                </div>
            )
                :
                (
                    <>
                    </>
                )}
        </>
    )
}

const mapStateToProps = state => ({
    retrlist: state.listmaker.retrlist,
    isClientView: state.ui.isClientView
});

export default connect(mapStateToProps, { retrieve_list, set_client_view })(PublicList);