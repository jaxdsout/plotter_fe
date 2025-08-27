function PropDetail({ propSel }) {
    return (
        <div className="text-black flex flex-row items-start justify-between">
            <div>
                <img src={propSel?.image} alt='property_img' className="rounded-lg mt-4 max-w-[17rem]" />
                <a className="text-gray-500 text-nowrap" href={`https://www.google.com/maps/search/?q=${propSel.name}`} target="_blank" rel="noopener noreferrer">{propSel.address}</a>
                <p className="text-gray-500 text-nowrap">{propSel.neighborhood}</p>
                <a href={`${propSel.website}`} >Website</a>
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="border-[2px] border-[#1f2124] rounded-tl-lg rounded-tr-lg">
                    <table className="w-full">
                        <thead className="text-white bg-[#1f2124] text-xs">
                            <th className="text-left py-2 px-3">
                                Send
                            </th>
                            <th className="text-left py-2 px-3">
                                Escort
                            </th>
                            <th className="text-left text-wrap sm:text-nowrap py-2 px-3">
                                Flat Fee
                            </th>
                        </thead>
                        <tbody>
                            <tr className="font-bold text-black bg-gray-100 transition text-center ">
                                <td className="p-1 text-[0.7rem] sm:text-base">{propSel.commission.send}%</td>
                                <td className="p-1 text-[0.7rem] sm:text-base">{propSel.commission.escort}%</td>
                                <td className="p-1 text-[0.7rem] sm:text-base">${propSel.commission.flat_fee}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs mt-3">Last Updated: {propSel.commission.updated_date}</p>
            </div>
        </div>
    )
}

export default PropDetail