import React, { Component } from "react";
import "./Dashboard.css";

import Sidebar from "../Sidebar/Sidebar";
import GameArea from "../GameArea/GameArea";
import Game from "../../interfaces/GameInterface";

export class Dashboard extends Component {
  state = {
    cb: (game: Game) => {},
    mobile: false,
    side: true
  };

  componentDidMount() {
    this.updateWindowDimensions();
    this.setState({ side: !this.state.mobile });
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    if (window.innerWidth < 670 && !this.state.mobile) {
      this.setState({ mobile: true });
    } else if (window.innerWidth > 670 && this.state.mobile) {
      this.setState({ mobile: false });
    }
  };

  callAppendGame = (game: Game) => {
    this.state.cb(game);
  };

  appendGame = (cb: any) => {
    this.setState({ cb });
  };

  getMobileStyle = () => {
    if (this.state.mobile) {
      return {
        flexDirection: "column" as "column"
      };
    }
  };

  toggleSideBar = () => {
    this.setState({ side: !this.state.side });
  };

  getMobileTitle = () => {
    if (this.state.mobile) {
      return (
        <div className="mobileTitle">
          <i className="fas fa-bars" onClick={this.toggleSideBar}></i>
          <h1>Game Library</h1>
          <i className="fab fa-playstation"></i>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="dashboard" style={this.getMobileStyle()}>
        {this.getMobileTitle()}
        <Sidebar mobile={this.state.mobile} side={this.state.side} appendGame={this.callAppendGame} />
        <GameArea mobile={this.state.mobile} appendGame={this.appendGame} />
      </div>
    );
  }
}

export default Dashboard;
