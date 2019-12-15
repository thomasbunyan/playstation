import React, { Component } from "react";
import "./GameArea.css";

import SearchBar from "./SearchBar/SearchBar";
import GameList from "./GameList/GameList";

export class GameArea extends Component<{ appendGame: any; mobile: boolean }> {
  state = {
    searchQuery: ""
  };

  updateSearchQuery = (newQuery: string) => {
    this.setState({ searchQuery: newQuery });
  };

  getStyle = () => {
    if (this.props.mobile) {
      return {
        margin: 0
      };
    }
  };

  render() {
    return (
      <div className="gameArea" style={this.getStyle()}>
        <SearchBar updateSearchQuery={this.updateSearchQuery} />
        <GameList appendGame={this.props.appendGame} searchQuery={this.state.searchQuery} />
      </div>
    );
  }
}

export default GameArea;
