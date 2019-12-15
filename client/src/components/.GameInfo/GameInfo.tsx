import React, { Component } from "react";
import "./GameInfo.css";

export class GameInfo extends Component {
  state = {
    gameData: {
      name: "GOD OF WAR",
      platform: "PS4",
      releaseDate: "04-20-18",
      genre: "Action / Adventure",
      publisher: "SIEE",
      players: 1
    }
  };

  // styles = {
  //   infoBoxA: {
  //     display: "flex",
  //     flexDirection: "column" as "column"
  //   },
  //   infoBoxB: {
  //     display: "flex",
  //     flexDirection: "row" as "row"
  //   }
  // };

  render() {
    return (
      <div>
        <div className="gameInfo">
          <div className="boxArt">
            <img src="https://images-eu.ssl-images-amazon.com/images/I/51MYSwycENL.jpg" alt="gameArt" />
          </div>
          <h2>GOD OF WAR</h2>
          <div className="platformImage">PS4</div>
          <div className="gameInfoCols">
            <div>
              <p>
                Release date: <span>{this.state.gameData.releaseDate}</span>
              </p>
              <p>
                Genre: <span>{this.state.gameData.genre}</span>
              </p>
            </div>
            <div>
              <p>
                Publisher: <span>{this.state.gameData.publisher}</span>
              </p>
              <p>
                Number of players: <span>{this.state.gameData.players}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameInfo;
