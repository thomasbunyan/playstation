import React, { Component } from "react";

import ScrollList from "../ScrollList/ScrollList";
import GameInfo from "../GameInfo/GameInfo";

export class GameLib extends Component {
  styles = {
    wrapper: {
      height: "100vh",
      width: "100%",
      position: "relative" as "relative"
    },
    scrollList: {
      position: "absolute" as "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "50%",
      paddingLeft: "30px"
    },
    gameInfo: {
      position: "absolute" as "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "50%",
      right: "0"
    }
  };

  render() {
    return (
      <div>
        <div style={this.styles.wrapper}>
          <div style={this.styles.scrollList}>
            <ScrollList />
          </div>
          <div style={this.styles.gameInfo}>
            <GameInfo />
          </div>
        </div>
      </div>
    );
  }
}

export default GameLib;
