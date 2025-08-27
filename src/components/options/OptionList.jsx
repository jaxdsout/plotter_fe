import { Reorder } from "framer-motion";
import { connect } from "react-redux";
import { set_option_order } from "../../store/actions/listmaker";
import OptionDetail from "./OptionDetail";

function OptionList({ options, isReorderMode, set_option_order }) {


    return (
        <div className="overflow-y-auto mb-4">
            {options?.length > 0 ? (
                isReorderMode ? (
                    <Reorder.Group values={options} onReorder={set_option_order} className="bg-[#dbdbdb] rounded-xl p-6 drop-shadow-md">
                        {options.map((option) => (
                            <Reorder.Item key={option.id} value={option} className="p-1 hover:bg-white active:bg-accent active:drop-shadow-lg rounded-lg">
                                <OptionDetail option={option} />
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                ) : (
                    <div className="overflow-y-auto bg-[#dbdbdb] rounded-xl p-6 drop-shadow-md">
                        {options.map((option) => (
                            <div key={option.id} className="p-1">
                                <OptionDetail option={option} />
                            </div>
                        ))}
                    </div>
                )
            ) : (
                <div className="container text-center">
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
