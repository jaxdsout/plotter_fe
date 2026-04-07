import { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, FormField, Modal } from "semantic-ui-react";
import { load_list, update_option } from "../../store/actions/listmaker";
import "./options.css";

function UpdateOption({ option, list, update_option, load_list }) {
    const [showModal, setShowModal] = useState(false);
    const [optionForm, setOptionForm] = useState({
        price: option.price || '',
        unit_number: option.unit_number || '',
        layout: option.layout || '',
        sq_ft: option.sq_ft || '',
        available: option.available || '',
        notes: option.notes || '',
    });
    const { price, unit_number, layout, sq_ft, available, notes } = optionForm;

    const optionID = option.id;
    const listID = list.id;
    const property = option.property;

    const handleChange = (e) => setOptionForm({ ...optionForm, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await update_option(optionID, price, unit_number, layout, sq_ft, available, notes, property, listID);
        await load_list(listID);
        setShowModal(false);
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <button onClick={handleOpenModal} className="updateOptionBtn">
                <i className="edit icon" style={{ marginRight: '-0.25rem', marginLeft: 0 }}></i>
            </button>

            <Modal open={showModal} onClose={handleCloseModal} className="modalSm">
                <Modal.Header style={{ textAlign: 'center' }}>Update Option: {option.prop_name}</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={handleSubmit} autoComplete="off">
                        <FormField>
                            <label htmlFor='price'>Price:</label>
                            <div className="updateOptionFieldWrapper">
                                <span className="updateOptionPrefix">$</span>
                                <input
                                    type='number'
                                    className="updateOptionIndent"
                                    name='price'
                                    value={price || option.price}
                                    onChange={handleChange}
                                />
                            </div>
                        </FormField>
                        <FormField>
                            <label htmlFor='unit_number'>Unit Number:</label>
                            <input
                                type='text'
                                name='unit_number'
                                value={unit_number}
                                onChange={handleChange}
                            />
                        </FormField>
                        <FormField>
                            <label htmlFor='layout'>Layout:</label>
                            <input
                                type='text'
                                name='layout'
                                value={layout}
                                onChange={handleChange}
                            />
                        </FormField>
                        <FormField>
                            <label htmlFor='sq_ft'>Sq Ft:</label>
                            <input
                                type='text'
                                name='sq_ft'
                                value={sq_ft}
                                onChange={handleChange}
                            />
                        </FormField>
                        <FormField>
                            <label htmlFor='available'>Available:</label>
                            <input
                                type='date'
                                name='available'
                                value={available}
                                onChange={handleChange}
                            />
                        </FormField>
                        <FormField>
                            <label htmlFor='notes'>Notes/Specials:</label>
                            <input
                                type='text'
                                name='notes'
                                value={notes}
                                onChange={handleChange}
                            />
                        </FormField>
                        <div className="updateOptionSubmitRow">
                            <Button type="submit" color="green">UPDATE OPTION</Button>
                        </div>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={handleCloseModal} color="red">CANCEL</Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}

const mapStateToProps = state => ({
    list: state.listmaker.list,
    error: state.auth.error,
});

export default connect(mapStateToProps, { update_option, load_list })(UpdateOption);
