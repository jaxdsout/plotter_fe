import { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, FormField, Modal } from "semantic-ui-react";
import { load_list, update_option } from "../../store/actions/listmaker";

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
            <div>
                <button onClick={handleOpenModal} className="p-3 bg-[#1f2124] text-white rounded-lg mr-2 hover:text-[#90B8F8]">
                    <i className="edit icon !-mr-1 !ml-0"></i>
                </button>
            </div>

            <Modal open={showModal} onClose={handleCloseModal} className="!w-5/6 sm:!w-[500px]">
                <Modal.Header className="text-center">Update Option: {option.prop_name}</Modal.Header>
                <Modal.Content className="bg-dark-subtle">
                    <Form onSubmit={handleSubmit} autocomplete="off">
                        <FormField>
                            <label className="noto-sans" htmlFor='price'>Price:</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[1rem] font-bold pointer-events-none">$</span>
                                <input
                                    type='number'
                                    className="indent-4"
                                    name='price'
                                    value={price || option.price}
                                    onChange={handleChange}
                                />
                            </div>
                        </FormField>
                        <FormField>
                            <label className="noto-sans" htmlFor='unit_number'>Unit Number:</label>
                            <input
                                type='text'
                                name='unit_number'
                                value={unit_number}
                                onChange={handleChange}
                            />
                        </FormField>
                        <FormField>
                            <label className="noto-sans" htmlFor='layout'>Layout:</label>
                            <input
                                type='text'
                                name='layout'
                                value={layout}
                                onChange={handleChange}

                            />
                        </FormField>
                        <FormField>
                            <label className="noto-sans" htmlFor='sq_ft'>Sq Ft:</label>
                            <input
                                type='text'
                                name='sq_ft'
                                value={sq_ft}
                                onChange={handleChange}
                            />
                        </FormField>
                        <FormField>
                            <label className="noto-sans" htmlFor='available'>Available:</label>
                            <input
                                type='date'
                                name='available'
                                value={available}
                                onChange={handleChange}

                            />
                        </FormField>
                        <FormField>
                            <label className="noto-sans" htmlFor='notes'>Notes/Specials:</label>
                            <input
                                type='text'
                                name='notes'
                                value={notes}
                                onChange={handleChange}
                            />
                        </FormField>
                        <div className="flex justify-center">
                            <Button className="drop-shadow-sm" type="submit" color="green">UPDATE OPTION</Button>

                        </div>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button className="drop-shadow-sm" onClick={handleCloseModal} color="red">CANCEL</Button>
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