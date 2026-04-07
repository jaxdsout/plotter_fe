import { Reorder } from "framer-motion";
import { connect } from "react-redux";
import { set_option_order } from "../../store/actions/listmaker";
import OptionDetail from "./OptionDetail";
import "./options.css";

function OptionList({ options, isReorderMode, set_option_order }) {

    return (
        <div className="optionListWrapper">
            {options?.length > 0 ? (
                isReorderMode ? (
                    <Reorder.Group values={options} onReorder={set_option_order} className="optionListGroup">
                        {options.map((option) => (
                            <Reorder.Item key={option.id} value={option} className="optionListItem">
                                <OptionDetail option={option} />
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                ) : (
                    <div className="optionListGroup">
                        {options.map((option) => (
                            <div key={option.id} className="optionListItem">
                                <OptionDetail option={option} />
                            </div>
                        ))}
                    </div>
                )
            ) : (
                <div className="optionListEmpty">
                    <p>No options added yet.</p>
                </div>
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    error: state.auth.error,
    isReorderMode: state.ui.isReorderMode,
    options: state.listmaker.options
});

export default connect(mapStateToProps, { set_option_order })(OptionList);
