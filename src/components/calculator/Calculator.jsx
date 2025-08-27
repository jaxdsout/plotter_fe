import { connect } from "react-redux";
import { Form, FormField, Divider, Button } from "semantic-ui-react";
import { useState } from "react";

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

        setFormData({
            ...updatedFormData,
            net_effective: updatedNetEffective,
        });
    };

    const handleReset = () => {
        setFormData({
            lease_term: 0,
            rent_free: 0,
            cash_allowance: 0,
            monthly_rent: 0,
            net_effective: 0
        })
    }

    return (
        <div className="flex flex-col items-center justify-start rounded-lg text-white bg-gray-500">
            <div className="mt-4 mb-2 flex flex-col items-center">
                <h4 className='text-center'>Net Effective Rent Calculator</h4>
            </div>
            <div className="mb-2">
                <Form className="p-5">
                    <div>
                        <FormField type="number">
                            <label htmlFor='lease_term' className="!text-white">Lease Term:</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-32 flex items-center text-[1rem] font-bold text-white pointer-events-none">mos</span>
                                <input
                                    className="!bg-black !bg-opacity-30 !text-white pl-12"
                                    type='number'
                                    name='lease_term'
                                    value={lease_term}
                                    autoComplete="off"
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                        </FormField>
                        <FormField>
                            <label htmlFor='monthly_rent' className="!text-white">Monthly Rent:</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[1rem] font-bold text-white pointer-events-none">$</span>
                                <span className="absolute inset-y-0 left-0 pl-32 flex items-center text-[1rem] font-bold text-white pointer-events-none">/ mo</span>
                                <input
                                    className="!bg-black !bg-opacity-30 !text-white pl-12 indent-4"
                                    type='number'
                                    step='any'
                                    name='monthly_rent'
                                    value={monthly_rent}
                                    autoComplete="off"
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                        </FormField>
                    </div>
                    <Divider />
                    <div>
                        <FormField>
                            <label htmlFor='rent_free' className="!text-white">No. of Rent-Free Months:</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-32 flex items-center text-[1rem] font-bold text-white pointer-events-none">mos</span>
                                <input
                                    className="!bg-black !bg-opacity-30 !text-white pl-12"
                                    type='number'
                                    step='any'
                                    name='rent_free'
                                    value={rent_free}
                                    autoComplete="off"
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                        </FormField>
                        <FormField>
                            <label htmlFor='cash_allowance' className="!text-white">Tenant Cash Allowance:</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[1rem] font-bold text-white pointer-events-none">$</span>
                                <input
                                    className="!bg-black !bg-opacity-30 !text-white indent-4"
                                    type='number'
                                    name='cash_allowance'
                                    value={cash_allowance}
                                    autoComplete="off"
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                        </FormField>
                    </div>
                    <Divider />
                    <div>
                        <FormField>
                            <label htmlFor='net_effective' className="!text-white">Net Effective Rent:</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[1rem] font-bold text-white pointer-events-none">$</span>
                                <span className="absolute inset-y-0 left-0 pl-32 flex items-center text-[1rem] font-bold text-white pointer-events-none">/ mo</span>
                                <input
                                    className="!bg-[#FF8B3D] !bg-opacity-30 !text-white indent-4"
                                    type='text'
                                    name='net_effective'
                                    value={net_effective}
                                    placeholder="0"
                                    autoComplete="off"
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                        </FormField>
                    </div>
                </Form>
            </div>
            <div className="mb-6">
                {net_effective > 0 ? (
                    <Button size="tiny" color="red" inverted onClick={handleReset}>RESET</Button>
                ) : (
                    <>
                    </>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(Calculator);