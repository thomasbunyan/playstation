import React, { Component } from "react";
import "./ViewGame.css";
import axios from "axios";

import Game from "../../interfaces/GameInterface";

export class ViewGame extends Component<{ toggleViewGame: any; game: string }> {
  state = {
    game: {} as Game
  };

  componentDidMount = () => {
    if (this.props.game) {
      const url = "http://localhost:4000/api/games/" + this.props.game;
      axios
        .get(url)
        .then((game) => {
          this.setState({ game: game.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  closeModal = (e: any) => {
    if (e.target.className === "viewGame" || e.target.id === "closeModal") {
      this.props.toggleViewGame();
    }
  };

  getFormattedDate = (date: string): string => {
    const d = new Date(date);
    return d.getUTCMonth() + 1 + "/" + (d.getUTCDate() + 1) + "/" + d.getUTCFullYear();
  };

  getFormattedString = (text: string): string => {
    if (text) {
      return text.toLowerCase();
    }
    return text;
  };

  getBoxArt = () => {
    if (this.state.game.boxArt) {
      return "http://localhost:4000/box_art/" + this.state.game.boxArt;
    }
  };

  render() {
    return (
      <div className="viewGame" onClick={this.closeModal}>
        <div className="gameModal">
          <i id="closeModal" className="fas fa-times" onClick={this.closeModal}></i>
          <div className="boxArt">
            <img src={this.getBoxArt()} alt="boxArt"></img>
          </div>
          <div className="infoArea">
            <h1>{this.state.game.name}</h1>
            <h3>{this.state.game.platform}</h3>
            <div className="row">
              <div>
                <p>
                  <span>Release date: </span>
                  {this.getFormattedDate(this.state.game.releaseDate)}
                </p>
                <p>
                  <span>Genre: </span>
                  {this.getFormattedString(this.state.game.genre)}
                </p>
                <p>
                  <span>Publisher: </span>
                  {this.getFormattedString(this.state.game.publisher)}
                </p>
                <p>
                  <span>Players: </span>
                  {this.state.game.players}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewGame;
