import { Button, Loader, Icon, Popup, Modal } from "semantic-ui-react"
import { connect } from "react-redux";
import PropertySearch from "../search/PropertySearch";
import { useState, useEffect } from "react";
import { reset_commission } from "../../store/actions/ui";
import PropDetail from "./PropDetail";
import MapBox from "../maps/MapBox"
import { AnimatePresence, motion } from "framer-motion";

function AllProps({ property, properties, reset_commission, polygonProps }) {
    const [propSel, setPropSel] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('list');
    const [passedProps, setPassedProps] = useState(properties)

    const handleCommSearchReset = () => {
        reset_commission();
        setPropSel(null)
    }

    const handleOpenModal = (property) => {
        console.log(property, "handleOpenmodal")
        setPropSel(property)
        setShowModal(true);
    };

    const handleCloseModal = async () => {
        setPropSel(null)
        setShowModal(false);
    }

    const tabSwitch = (string) => {
        if (activeTab !== string) {
            setActiveTab(string);
        }
    };

    useEffect(() => {
        if (polygonProps?.length > 0) {
            setPassedProps(polygonProps)
        }
    }, [polygonProps])

    return (
        <div className="flex flex-col w-full max-h-[49rem]">
            <div className="flex flex-row justify-evenly items-center relative mt-4">
                <PropertySearch />
                {property !== null && (
                    <div className="ml-5 absolute left-5">
                        <Button size="tiny" olor="red" inverted onClick={handleCommSearchReset}>RESET</Button>
                    </div>
                )}
                <div className="bg-gray-300 p-1 flex flex-row items-start justify-start rounded-md">
                    <Button onClick={() => tabSwitch('list')} toggle active={activeTab === 'list'} className="border-2 border-black text-start !mx-0.5">List</Button>
                    <Button onClick={() => tabSwitch('map')} toggle active={activeTab === 'map'} className={`border-2 border-black text-start !mx-0.5`}>Map</Button>
                </div>
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    className="flex flex-col items-center justify-center w-full h-full min-h-[24rem]"
                    initital={{ translateY: 500 }}
                    animate={{ translateY: 0 }}
                    exit={{ translateY: 500 }}
                    transition={{ duration: 0.5 }}
                >
                    {activeTab === 'list' && (
                        <PropList properties={passedProps} property={property} handleOpenModal={handleOpenModal} />
                    )}
                    {activeTab === 'map' && (
                        <PropMap properties={passedProps} handleOpenModal={handleOpenModal} />
                    )}
                </motion.div>
            </AnimatePresence>


            {propSel && (
                <Modal className='!w-11/12 sm:!w-[500px] !mb-10' open={showModal} onClose={handleCloseModal}>
                    <Modal.Header>
                        <div className="flex flex-row items-center justify-between">
                            {propSel?.name}
                            <Modal.Actions className="flex justify-end">
                                <Button onClick={handleCloseModal}>CLOSE</Button>
                            </Modal.Actions>
                        </div>

                    </Modal.Header>
                    <Modal.Content>
                        <PropDetail propSel={propSel} handleCloseModal={handleCloseModal} />
                    </Modal.Content>

                </Modal>
            )}
        </div>
    )
}

function PropList({ properties, property, handleOpenModal }) {
    const [sortConfig, setSortConfig] = useState({ key: 'send', direction: 'desc' });
    const [sortedProperties, setSortedProperties] = useState(properties);

    const sortProperties = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });
    };

    useEffect(() => {
        const sortedArray = [...properties].sort((a, b) => {
            if (a.commission[sortConfig.key] < b.commission[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
            if (a.commission[sortConfig.key] > b.commission[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
        setSortedProperties(sortedArray);
        console.log('all props firing')
    }, [properties, sortConfig]);

    return (
        <div className="flex flex-col overflow-x-hidden text-left mt-3 mb-10 snap-start w-full p-3">
            {properties.length > 0 ? (
                <table>
                    <thead className="sticky text-white bg-[#1f2124] text-xs">
                        <th className="text-left p-2 rounded-tl-md rounded-bl-md">Property</th>
                        <th className="text-left p-2 " onClick={() => sortProperties('send')}>
                            Send {sortConfig.key === 'send' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="text-left p-2 " onClick={() => sortProperties('escort')}>
                            Escort {sortConfig.key === 'escort' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="text-left text-wrap sm:text-nowrap p-2 rounded-tr-md rounded-br-md" onClick={() => sortProperties('flat_fee')}>
                            Flat Fee {sortConfig.key === 'flat_fee' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                    </thead>
                    <tbody className="overflow-y-auto">
                        {sortedProperties.map(property => (
                            <tr key={property.id} className="font-bold text-black hover:text-white hover:bg-gray-500 transition odd:bg-none even:bg-gray-200">
                                <td className="p-2 pr-4 md:pr-12">
                                    <div className="flex flex-col cursor-pointer" onClick={() => handleOpenModal(property)}>
                                        <p className="text-sm">
                                            {property.name}
                                            <Popup
                                                className="!text-xs"
                                                content={property.commission.updated_date}
                                                trigger={<Icon name="info circle icon" className="!text-xs !text-gray-500 !ml-2" />}
                                            />
                                        </p>
                                        <p className="text-xs text-nowrap">{property.address} | {property.neighborhood}</p>
                                    </div>
                                </td>
                                <td className="p-1 text-[0.7rem] sm:text-base">{property.commission.send}%</td>
                                <td className="p-1 text-[0.7rem] sm:text-base">{property.commission.escort}%</td>
                                <td className="p-1 text-[0.7rem] sm:text-base">${property.commission.flat_fee}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center text-white">
                    <Loader inverted active />
                </div>
            )}
        </div>
    )
}

function PropMap({ properties, handleOpenModal }) {


    return (

        <div className="w-full h-[64rem] flex flex-col items-center justify-center p-5">
            <MapBox properties={properties} handleOpenModal={handleOpenModal} />
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    error: state.auth.error,
    properties: state.agent.properties,
    property: state.listmaker.property,
    polygonProps: state.agent.polygonProps
})

export default connect(mapStateToProps, { reset_commission })(AllProps);