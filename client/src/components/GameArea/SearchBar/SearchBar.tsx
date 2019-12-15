import React, { Component } from "react";
import "./SearchBar.css";

export class SearchBar extends Component<{ updateSearchQuery: any }> {
  state = {
    searchQuery: ""
  };

  handleInput = (e: any) => {
    this.setState({ searchQuery: e.target.value });
    this.props.updateSearchQuery(e.target.value);
  };

  render() {
    return (
      <div className="searchBar">
        <input className="inputBar" value={this.state.searchQuery} onChange={this.handleInput}></input>
        <i className="fas fa-search"></i>
      </div>
    );
  }
}

export default SearchBar;
