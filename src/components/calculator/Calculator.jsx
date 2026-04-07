import { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, FormField } from "semantic-ui-react";
import "./calculator.css";

function Calculator() {
  const [formData, setFormData] = useState({
    lease_term: 0,
    rent_free: 0,
    cash_allowance: 0,
    monthly_rent: 0,
    net_effective: 0
  });

  const { lease_term, rent_free, cash_allowance, monthly_rent, net_effective } = formData;

  const calculateNER = (data) => {
    const { lease_term, rent_free, cash_allowance, monthly_rent } = data;
    if (lease_term > 0) {
      return cash_allowance
        ? Math.round((((monthly_rent * (lease_term - rent_free)) - cash_allowance) / lease_term) * 100) / 100
        : Math.round(((monthly_rent * (lease_term - rent_free)) / lease_term) * 100) / 100;
    }
    return 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value === "" ? "" : parseFloat(value);
    const updatedFormData = { ...formData, [name]: numericValue };
    const updatedNetEffective = calculateNER(updatedFormData);
    setFormData({ ...updatedFormData, net_effective: updatedNetEffective });
  };

  const handleReset = () => {
    setFormData({ lease_term: 0, rent_free: 0, cash_allowance: 0, monthly_rent: 0, net_effective: 0 });
  };

  return (
    <div className="calculatorWrapper">
      <div className="calculatorHeader">
        <h4>Net Effective Rent Calculator</h4>
      </div>
      <Form>
        <div className="calculatorGrid">
          <FormField>
            <label className="calculatorLabel">Lease Term:</label>
            <div className="calculatorFieldWrapper">
              <span className="calculatorSuffix">mos</span>
              <input
                className="calculatorInput"
                type="number"
                name="lease_term"
                value={lease_term}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
          </FormField>
          <FormField>
            <label className="calculatorLabel">Monthly Rent:</label>
            <div className="calculatorFieldWrapper">
              <span className="calculatorPrefix">$</span>
              <span className="calculatorSuffix">/ mo</span>
              <input
                className="calculatorInputIndent"
                type="number"
                step="any"
                name="monthly_rent"
                value={monthly_rent}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
          </FormField>
          <FormField>
            <label className="calculatorLabel">Rent-Free Months:</label>
            <div className="calculatorFieldWrapper">
              <span className="calculatorSuffix">mos</span>
              <input
                className="calculatorInput"
                type="number"
                step="any"
                name="rent_free"
                value={rent_free}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
          </FormField>
          <FormField>
            <label className="calculatorLabel">Cash Allowance:</label>
            <div className="calculatorFieldWrapper">
              <span className="calculatorPrefix">$</span>
              <input
                className="calculatorInputIndent"
                type="number"
                name="cash_allowance"
                value={cash_allowance}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
          </FormField>
        </div>
        <div className="calculatorFullWidth">
          <FormField>
            <label className="calculatorLabel">Net Effective Rent:</label>
            <div className="calculatorFieldWrapper">
              <span className="calculatorPrefix">$</span>
              <span className="calculatorSuffix">/ mo</span>
              <input
                className="calculatorResultInput"
                type="text"
                name="net_effective"
                value={net_effective}
                placeholder="0"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
          </FormField>
        </div>
      </Form>
      <div className="calculatorResetRow">
        {net_effective > 0 && (
          <Button size="tiny" inverted color="grey" onClick={handleReset}>RESET</Button>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {})(Calculator);
