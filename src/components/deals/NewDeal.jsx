import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Checkbox, Divider, Form, FormField, Modal } from "semantic-ui-react";
import { load_deals, new_deal } from "../../store/actions/agent";
import ClientSearch from "../search/ClientSearch";
import PropertySearch from "../search/PropertySearch";
import "./deals.css";

function NewDeal({ user, load_deals, new_deal, client, property }) {
  const [showModal, setShowModal] = useState(false);
  const [clientSel, setClientSel] = useState(false);
  const [propSel, setPropSel] = useState(false);
  const [flatFee, setFlatFee] = useState(false);
  const [commission, setCommission] = useState(0);
  const [manualCommission, setManualCommission] = useState(false);

  const handleOpenModal = () => setShowModal(true);

  const handleCloseModal = () => {
    handleResetDeal();
    setShowModal(false);
  };

  const [formData, setFormData] = useState({
    property: null,
    agent: null,
    client: null,
    rent: '',
    rate: '',
    commission: commission,
    flat_fee: '',
    move_date: '',
    unit_no: '',
    lease_term: '',

  });

  const { unit_no, move_date, lease_term, rent, rate, flat_fee } = formData;

  const handleFlatFee = () => {
    if (flatFee) { setFlatFee(false) } else { setFlatFee(true) }
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCommissionChange = (e) => {
    const userValue = parseFloat(e.target.value) || 0;
    setManualCommission(true);
    setCommission(userValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (client && property) {
      await new_deal(property.id, user.id, client.id, unit_no, move_date, lease_term, rent, rate, flat_fee, commission);
      await load_deals(user.id);
      handleCloseModal();
    }
  };

  const handleResetDeal = () => {
    setFormData({
      agent: null,
      property: null,
      client: null,
      rent: '',
      rate: '',
      commission: '',
      flat_fee: '',
      move_date: '',
      unit_no: '',
      lease_term: '',
    });
  }

  useEffect(() => {
    if (user) {
      setFormData(prevFormData => ({
        ...prevFormData,
        agent: user.id
      }));
    }
    if (property) {
      setPropSel(property);
    }
    if (client) {
      setClientSel(client);
    }
  }, [user, property, client]);


  useEffect(() => {
    if (!manualCommission) {
      if (flatFee) {
        setCommission(flat_fee ? parseFloat(flat_fee) : 0);
        setFormData(prevFormData => ({
          ...prevFormData,
          rate: ''
        }))
      } else {
        setCommission(rate && rent ? (parseFloat(rate / 100) * parseFloat(rent)).toFixed(2) : 0);
        setFormData(prevFormData => ({
          ...prevFormData,
          flat_fee: ''
        }))
      }
    }
  }, [flatFee, rate, rent, flat_fee, manualCommission]);

  return (
    <>
      <div className="dataAddRow">
        <Button onClick={handleOpenModal} className="button">+</Button>
      </div>
      <div>
        <Modal open={showModal} onClose={handleCloseModal} className="modalSm">
          <Modal.Header>
            <div className="dealModalHeader">
              Add New Deal
              <Button className="button" color="red" onClick={handleResetDeal}>RESET</Button>
            </div>
          </Modal.Header>
          <Modal.Content>
            <div className="dealSearchRow">
              <div className="dealSearchCol">
                <ClientSearch />
                <div className="dealSelectedRow">
                  {clientSel && client !== null ? (
                    <Button size="tiny" color="black" disabled>CLIENT SELECTED</Button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="dealSearchCol">
                <PropertySearch />
                <div className="dealSelectedRow">
                  {propSel && property !== null ? (
                    <Button size="tiny" color="black" disabled>PROPERTY SELECTED</Button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <Divider />
            <Form onSubmit={handleSubmit} autoComplete="off">
              <FormField>
                <label htmlFor='unit_no'>Unit Number:</label>
                <input
                  type='text'
                  name='unit_no'
                  value={unit_no}
                  onChange={handleChange}
                  required
                />
              </FormField>
              <FormField>
                <label htmlFor='move_date'>Move Date:</label>
                <input
                  type='date'
                  name='move_date'
                  value={move_date}
                  onChange={handleChange}
                  required
                />
              </FormField>
              <FormField>
                <label htmlFor='lease_term'>Lease Term:</label>
                <div className="inputWrapper">
                  <span className="inputSuffixMos">mos</span>
                  <input
                    type='text'
                    name='lease_term'
                    value={lease_term}
                    onChange={handleChange}
                    required
                  />
                </div>
              </FormField>
              <FormField>
                <label htmlFor='rent'>Rent:</label>
                <div className="inputWrapper">
                  <span className="inputPrefix">$</span>
                  <input
                    className="inputIndent"
                    type='number'
                    name='rent'
                    value={rent}
                    onChange={handleChange}
                    required
                  />
                </div>
              </FormField>
              <FormField>
                <label htmlFor='rate'>Commission Rate:</label>
                {flatFee ? (
                  <input
                    type='number'
                    name='rate'
                    value={rate}
                    disabled
                  />
                ) : (
                  <div className="inputWrapper">
                    <span className="inputSuffix">%</span>
                    <input
                      type='number'
                      name='rate'
                      value={rate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
              </FormField>
              <FormField>
                <label htmlFor='flat_fee'>
                  <div className="dealFlatFeeLabel">
                    <p>Flat Fee?:</p>
                    <Checkbox toggle className="dealFlatFeeToggle" onClick={handleFlatFee} />
                  </div>
                </label>
                {flatFee ? (
                  <div className="inputWrapper">
                    <span className="inputPrefix">$</span>
                    <input
                      type='number'
                      name='flat_fee'
                      value={flat_fee}
                      className="inputIndent"
                      onChange={handleChange}
                      required
                    />
                  </div>
                ) : (
                  <input
                    type='number'
                    name='flat_fee'
                    value={flat_fee}
                    disabled
                  />
                )}
              </FormField>
              <FormField>
                <label htmlFor='commission'>Total Commission:</label>
                <div className="inputWrapper">
                  <span className="inputPrefix">$</span>
                  <input
                    type='number'
                    name='commission'
                    value={commission}
                    onChange={handleCommissionChange}
                    className="inputIndent"
                    required
                  />
                </div>
              </FormField>
              <div className="dealSubmitRow">
                <Button className="button" type="submit" color="green">SUBMIT DEAL</Button>
              </div>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <div className="dealCloseRow">
              <Button className="button" onClick={handleCloseModal}>CLOSE</Button>
            </div>
          </Modal.Actions>
        </Modal>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.auth.error,
  property: state.listmaker.property,
  client: state.listmaker.client,
});

export default connect(mapStateToProps, { new_deal, load_deals })(NewDeal);
