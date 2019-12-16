import React, { Component } from "react";
import "./GameList.css";
import axios from "axios";

import ViewGame from "../../ViewGame/ViewGame";
import Game from "../../../interfaces/GameInterface";

export class GameList extends Component<{ searchQuery: string; appendGame: any }> {
  state = {
    games: [] as Array<Game>,
    filtered: [],
    viewGame: false,
    game: ""
  };

  componentDidMount = () => {
    this.props.appendGame(this.appendNewGame);

    axios
      .get("http://localhost:4000/api/games")
      .then((games) => {
        this.setState({ games: games.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  appendNewGame = (game: Game): void => {
    const games = this.state.games;
    games.push(game);
    this.setState({ games });
  };

  toggleViewGame = (game: Game) => {
    if (game) {
      this.setState({ game: game._id });
    } else {
      this.setState({ game: "" });
    }
    this.setState({ viewGame: !this.state.viewGame });
  };

  getViewGame = () => {
    if (this.state.viewGame) {
      return <ViewGame toggleViewGame={this.toggleViewGame} game={this.state.game} />;
    }
  };

  removeGame = (e: any) => {
    console.log("remove");
  };

  applySearch = () => {
    return this.state.games.filter((game) => {
      return game.name.includes(this.props.searchQuery.toUpperCase());
    });
  };

  getImage = (game: string): string => {
    return "http://localhost:4000/box_art/" + game;
  };

  getGames = () => {
    let filtered = this.applySearch();
    if (!this.props.searchQuery) {
      filtered = this.state.games;
    }
    if (filtered.length === 0) {
      return <div className="noGames">No games to display...</div>;
    }
    return filtered.map((game) => {
      return (
        <div key={game._id} className="game noselect">
          <img src={this.getImage(game.boxArt)} alt="boxArt"></img>
          <div className="overlay">
            <div className="oButton" onClick={() => this.toggleViewGame(game)}>
              <i className="fas fa-eye"></i>
            </div>
            {/* <div className="oButton remove" onClick={this.removeGame}>
              <i className="fas fa-trash"></i>
            </div> */}
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="gameList">
        {this.getGames()}
        {this.getViewGame()}
      </div>
    );
  }
}

export default GameList;
