import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Checkbox, Divider, Form, FormField, Modal } from "semantic-ui-react";
import { load_deals, new_deal } from "../../store/actions/agent";
import ClientSearch from "../search/ClientSearch";
import PropertySearch from "../search/PropertySearch";

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
            <div className="flex justify-center items-center p-4">
                <Button color="blue" onClick={handleOpenModal} className="!bg-[#90B8F8] hover:!bg-[#5F85DB] !font-extrabold">+</Button>
            </div>
            <div>
                <Modal open={showModal} onClose={handleCloseModal} className='!w-11/12 sm:!w-[500px]'>
                    <Modal.Header>
                        <div className="flex flex-row justify-between items-end">
                            Add New Deal
                            <Button className="drop-shadow-sm" color="red" onClick={handleResetDeal}>RESET</Button>
                        </div>
                    </Modal.Header>
                    <Modal.Content>
                        <div className="flex flex-col md:flex-row justify-center">
                            <div className="p-3 text-center">
                                <ClientSearch />
                                <div className="mt-5">
                                    {clientSel && client !== null ? (
                                        <Button size="tiny" color="black" disabled>CLIENT SELECTED</Button>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="p-3 text-center">
                                <PropertySearch />
                                <div className="mt-5">
                                    {propSel && property !== null ? (
                                        <Button size="tiny" color="black" disabled>PROPERTY SELECTED</Button>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <Form onSubmit={handleSubmit} autocomplete="off">
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
                                <div className="relative">
                                    <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-[1rem] font-bold pointer-events-none">mos</span>
                                    <input
                                        type='text'
                                        name='lease_term'
                                        value={lease_term}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                            </FormField>
                            <div>
                            </div>
                            <FormField>
                                <label htmlFor='rent'>Rent:</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[1rem] font-bold pointer-events-none">$</span>
                                    <input
                                        className="indent-4"
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
                                    <div className="relative">
                                        <span className="absolute inset-y-0 right-0 pr-7 flex items-center text-[1rem] font-bold pointer-events-none">%</span>
                                        <input
                                            type='number'
                                            name='rate'
                                            value={rate}
                                            onChange={handleChange}
                                            className=""
                                            required
                                        />
                                    </div>

                                )}

                            </FormField>
                            <FormField>
                                <label htmlFor='flat_fee'>
                                    <div className="flex flex-row justify-start items-start -mb-2" >
                                        <p>Flat Fee?:</p>
                                        <Checkbox toggle className="pl-2" onClick={handleFlatFee} />
                                    </div>
                                </label>
                                {flatFee ? (
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[1rem] font-bold pointer-events-none">$</span>
                                        <input
                                            type='number'
                                            name='flat_fee'
                                            value={flat_fee}
                                            className="indent-4"
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
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[1rem] font-bold pointer-events-none">$</span>
                                    <input
                                        type='number'
                                        name='commission'
                                        value={commission}
                                        onChange={handleCommissionChange}
                                        className="indent-4"
                                        required
                                    />
                                </div>
                            </FormField>
                            <div className="flex justify-center">
                                <Button className="drop-shadow-sm" type="submit" color="green">SUBMIT DEAL</Button>
                            </div>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <div className="flex flex-row items-end mb-3">
                            <Button className="drop-shadow-sm" onClick={handleCloseModal}>CLOSE</Button>
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

