import React, {Component} from "react";

class SearchBar extends Component {
    render() {
        return (
            <form className="searchBar" onSubmit={this.props.handleSubmit}>
                <input type="text" value={this.props.query} onChange={this.props.handleChange} placeholder="Search Here" />
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

export default SearchBar;
