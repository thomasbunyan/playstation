import React, { Component } from "react";
import "./Sidebar.css";

import AddGame from "../AddGame/AddGame";

export class Sidebar extends Component<{ appendGame: any; mobile: boolean; side: boolean }> {
  state = {
    addGameOpen: false
  };

  toggleAddGame = (newGame?: any): void => {
    this.setState({ addGameOpen: !this.state.addGameOpen });
    if (newGame && newGame.name) {
      this.props.appendGame(newGame);
    }
  };

  addGame = () => {
    if (this.state.addGameOpen) {
      return <AddGame toggleAddGame={this.toggleAddGame} />;
    }
  };

  getStyle = () => {
    if (this.props.mobile && this.props.side) {
      return {
        left: -250 + "px"
      };
    }
  };

  render() {
    return (
      <div>
        <div style={this.getStyle()} className="wrapper noselect">
          <img src="https://1000logos.net/wp-content/uploads/2017/05/PlayStation-Logo.png" alt="Logo" />
          <h1>Game Library</h1>
          <span onClick={this.toggleAddGame}>
            <i className="fas fa-gamepad"></i>Add Game
          </span>
        </div>
        {this.addGame()}
      </div>
    );
  }
}

export default Sidebar;
