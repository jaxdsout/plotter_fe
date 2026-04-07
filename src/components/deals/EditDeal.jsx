import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Checkbox, Divider, Form, FormField, FormGroup } from "semantic-ui-react";
import { load_deal, update_deal } from "../../store/actions/agent";
import { reset_deal_mode } from "../../store/actions/ui";
import "./deals.css";

function EditDeal({ dealID, user, load_deal, deal, isDealMode, update_deal, reset_deal_mode }) {
  const [flatFee, setFlatFee] = useState(false);

  const [formData, setFormData] = useState({
    rent: '',
    rate: '',
    commission: '',
    flat_fee: '',
    move_date: '',
    unit_no: '',
    lease_term: '',
  });

  const { unit_no, move_date, lease_term, rent, rate, flat_fee, commission } = formData;

  const handleFlatFee = () => {
    if (flatFee) { setFlatFee(false) } else { setFlatFee(true) }
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDealMode) {
      console.log(deal.id, deal.property, user.id, deal.client, unit_no, move_date, lease_term, rent, rate, flat_fee, commission)
      await update_deal(deal.id, deal.property, user.id, deal.client, unit_no, move_date, lease_term, rent, rate, flat_fee, commission);
      await reset_deal_mode()
      await handleResetDeal();
    }
  };

  const handleResetDeal = async () => {
    setFormData({
      rent: '',
      rate: '',
      commission: '',
      flat_fee: '',
      move_date: '',
      unit_no: '',
      lease_term: '',
    });
    setFlatFee(false);
  }

  useEffect(() => {
    if (deal) {
      setFormData({
        rent: deal.rent || '',
        rate: deal.rate || '',
        commission: deal.commission || '',
        flat_fee: deal.flat_fee || '',
        move_date: deal.move_date || '',
        unit_no: deal.unit_no || '',
        lease_term: deal.lease_term || '',
      });
    }
  }, [deal]);


  useEffect(() => {
    if (dealID) {
      load_deal(dealID);
    }
  }, [dealID, load_deal])



  return (
    <div>
      <Form>
        <div className="editDealColumns">
          <FormField className="editDealCol">
            <label htmlFor='client'>Client:</label>
            <input
              type='text'
              className="editDealReadonly"
              name='client'
              value={deal.client_name}
              disabled
            />
          </FormField>
          <FormField className="editDealCol">
            <label htmlFor='pro'>Property:</label>
            <input
              type='text'
              className="editDealReadonly"
              name='property'
              value={deal.prop_name}
              disabled
            />
          </FormField>
          <Button className="button" size="tiny" onClick={handleSubmit} color="green">SAVE DEAL</Button>
        </div>
      </Form>
      <Divider />
      <Form onSubmit={handleSubmit}>
        <FormGroup className="editDealFieldRow">
          <FormField className="editDealCol">
            <label htmlFor='unit_no'>Unit Number:</label>
            <input
              type='text'
              name='unit_no'
              value={unit_no}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField className="editDealCol">
            <label htmlFor='move_date' className="editDealWide">Move Date:</label>
            <input
              type='date'
              name='move_date'
              value={move_date}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField className="editDealCol">
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
        </FormGroup>
        <FormGroup className="editDealFieldRow">
          <FormField className="editDealCol">
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
          <FormField className="editDealCol">
            <label htmlFor='rate'>Rate:</label>
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
          <FormField className="editDealCol">
            <label htmlFor='flat_fee'>
              <div className="dealFlatFeeLabel">
                <span>Flat Fee?:</span>
                <Checkbox toggle className="dealFlatFeeToggle" onClick={handleFlatFee} style={{ transform: 'scale(0.75)' }} />
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
          <FormField className="editDealCol">
            <label htmlFor='commission'>Total:</label>
            <div className="inputWrapper">
              <span className="editDealTotalPrefix">$</span>
              <input
                type='number'
                name='commission'
                value={commission}
                onChange={handleChange}
                className="editDealTotal"
                required
              />
            </div>
          </FormField>
        </FormGroup>
      </Form>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.auth.error,
  isDealMode: state.ui.isDealMode,
  deal: state.agent.deal
});

export default connect(mapStateToProps, { update_deal, load_deal, reset_deal_mode })(EditDeal);
