import { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";

function Upcoming ({ deals }) {
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
        <div className="flex flex-col-reverse md:flex-row justify-evenly">
            <div className='p-5 w-full md:w-1/2'>
                <h4 className='text-center text-[#1f2124]'>Upcoming Renewals</h4>
                <div className='flex flex-col items-center overflow-y-auto text-left mt-3 mb-10 snap-start border border-gray-300 rounded-md'>
                    {renewals.length > 0 ? (
                        <table className="w-full">
                            <thead className="text-white bg-[#1f2124] text-xs text-center">
                                <tr className="">
                                    <th className="p-2 rounded-tl-md rounded-bl-md">Client</th>
                                    <th className="p-2 ounded-tr-md rounded-br-md">Lease End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renewals.map((deal) => (
                                    <tr
                                        key={deal.id}
                                        className="font-bold text-[#1f2124] hover:text-black hover:bg-gray-100 transition odd:bg-none even:bg-[#f9f9f9] text-center cursor-pointer"
                                    >
                                        <td className="p-2 hover:text-[#5F85DB]">{deal.client_name}</td>
                                        <td className="p-2 text-[0.7rem] sm:text-base hover:text-[#5F85DB]">{deal.lease_end_date.toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className='p-2 text-center text-[#1f2124]'>No upcoming renewals...</p>
                    )}
                </div>
            </div>
            <div className='p-5 w-full md:w-1/2'>
                <h4 className='text-center text-[#1f2124]'>Upcoming Move-Ins</h4>
                <div className='flex flex-col items-center overflow-y-auto text-left mt-3 mb-10 snap-start border border-gray-300 rounded-md'>
                    {move_ins.length > 0 ? (
                        <table className="w-full">
                            <thead className="text-gray-500 bg-[#1f2124] text-xs text-center">
                                <tr className="">
                                    <th className="p-2 rounded-tl-md rounded-bl-md">Client</th>
                                    <th className="p-2 ounded-tr-md rounded-br-md">Move-In Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {move_ins.map((deal) => (
                                    <tr
                                        key={deal.id}
                                        className="font-bold text-[#1f2124] hover:text-black hover:bg-gray-100 transition odd:bg-none even:bg-[#f9f9f9] text-center cursor-pointer"
                                    >
                                        <td className="p-2 hover:text-[#5F85DB]">{deal.client_name}</td>
                                        <td className="p-2 text-[0.7rem] sm:text-base hover:text-[#5F85DB]">{deal.move_date.toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className='text-white bg-[#1f2124] text-xs text-center p-2 rounded-md w-full'>No upcoming renewals...</p>
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

export default connect(mapStateToProps, {  })(Upcoming);