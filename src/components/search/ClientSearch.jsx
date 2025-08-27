import { Search } from "semantic-ui-react";
import { search_clients, set_search_client, reset_client_results } from "../../store/actions/listmaker";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

function ClientSearch({ client_results, search_clients, userID, set_search_client, reset_client_results, client }) {
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        setSearchValue(client?.name || "");
    }, [client]);

    const handleSearchChange = (e, { value }) => {
        setSearchValue(value);
        if (value.length > 1) {
            console.log(value, userID)
            search_clients(value, userID);
        }
    };

    const handleResultSelect = (e, { result }) => {
        set_search_client(result.id, result.title, result.phone_number, result.email);
    };

    const handleBlur = () => {
        reset_client_results();
    };

    return (
        <Search
            onSearchChange={handleSearchChange}
            onResultSelect={handleResultSelect}
            onBlur={handleBlur}
            results={client_results.map((result) => ({
                title: `${result.first_name} ${result.last_name}`,
                id: result.id,
                phone_number: result.phone_number,
                email: result.email,
            }))}
            value={searchValue}
            id="client_start_list"
            placeholder="Search for client..."
            size="large"
            icon="none"
            className=""
            showNoResults={false}
        />
    );
}

const mapStateToProps = state => ({
    userID: state.auth.user.id,
    error: state.auth.error,
    client_results: state.listmaker.client_results,
    client: state.listmaker.client
});

export default connect(mapStateToProps, { search_clients, set_search_client, reset_client_results })(ClientSearch);