import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Icon, Loader, Modal, Popup } from "semantic-ui-react";
import { reset_commission } from "../../store/actions/ui";
import MapBox from "../maps/MapBox";
import PropertySearch from "../search/PropertySearch";
import PropDetail from "./PropDetail";
import "./props.css";

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

  useEffect(() => {
    if (!polygonProps?.length) {
      setPassedProps(properties)
    }
  }, [properties, polygonProps])

  return (
    <div className="searchPage">
      <div className="searchControls">
        <PropertySearch />
        {property !== null && (
          <div className="searchReset">
            <Button size="tiny" inverted onClick={handleCommSearchReset}>RESET</Button>
          </div>
        )}
        <div className="searchTabs">
          <Button onClick={() => tabSwitch('list')} toggle active={activeTab === 'list'} className="searchTabBtn">List</Button>
          <Button onClick={() => tabSwitch('map')} toggle active={activeTab === 'map'} className="searchTabBtn">Map</Button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="searchContent"
          initial={{ translateY: 500 }}
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
        <Modal className="modalSm" open={showModal} onClose={handleCloseModal}>
          <Modal.Header>
            <div className="propModalHeader">
              {propSel?.name}
              <Modal.Actions>
                <Button className="button" onClick={handleCloseModal}>CLOSE</Button>
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
  }, [properties, sortConfig]);

  return (
    <div className="propList">
      {properties.length > 0 ? (
        <table className="propTable">
          <thead className="propThead">
            <tr>
              <th className="propThFirst">Property</th>
              <th className="propTh" onClick={() => sortProperties('send')}>
                Send {sortConfig.key === 'send' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="propTh" onClick={() => sortProperties('escort')}>
                Escort {sortConfig.key === 'escort' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="propThLast" onClick={() => sortProperties('flat_fee')}>
                Flat Fee {sortConfig.key === 'flat_fee' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedProperties.map(property => (
              <tr key={property.id} className="propRow">
                <td className="propTdName">
                  <div className="propNameCell" onClick={() => handleOpenModal(property)}>
                    <p className="propNameText">
                      {property.name}
                      <Popup
                        className="propInfoPopup"
                        content={property.commission.updated_date}
                        trigger={<Icon name="info circle icon" className="propInfoIcon" />}
                      />
                    </p>
                    <p className="propAddress">{property.address} | {property.neighborhood}</p>
                  </div>
                </td>
                <td className="propTdSm">{property.commission.send}%</td>
                <td className="propTdSm">{property.commission.escort}%</td>
                <td className="propTdSm">${property.commission.flat_fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="propEmpty">
          <Loader inverted active />
        </div>
      )}
    </div>
  )
}

function PropMap({ properties, handleOpenModal }) {
  return (
    <div className="propMapContainer">
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
