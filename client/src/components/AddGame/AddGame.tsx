import React, { Component } from "react";
import "./AddGame.css";
import axios from "axios";
import validateGame from "../../validation/validateGame";

import ps from "../../images/ps.png";
import ps2 from "../../images/ps2.svg";
import ps3 from "../../images/ps3.svg";
import ps4 from "../../images/ps4.png";

export class AddGame extends Component<{ toggleAddGame: any }> {
  state = {
    platform: "",
    previewImg: "",
    name: "",
    publisher: "",
    genre: "",
    players: "",
    releaseDate: "",
    boxArt: "",
    error: ""
  };

  componentDidMount = (): void => {
    window.addEventListener("wheel", this.handleScroll, { passive: false });
  };
  componentWillUnmount = (): void => {
    window.removeEventListener("wheel", this.handleScroll);
  };

  handleScroll = (e: any) => {
    e.preventDefault();
  };

  closeWindow = (e: any) => {
    if (e.target.className === "addGame" || e.target.id === "closeModal") {
      this.props.toggleAddGame();
    }
  };

  selectPlatform = (e: any) => {
    this.setState({ platform: e.target.getAttribute("data-index") });
  };

  getSelectedStyle = (index: string) => {
    if (index === this.state.platform) {
      return {
        borderColor: "#016FCE"
      };
    }
  };

  textInput = (e: any): void => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addGameArt = () => {
    if (this.state.previewImg === "") {
      return (
        <div className="gameArtPlaceholder">
          <i className="fas fa-file-upload"></i>
          <p>Click to upload game art</p>
        </div>
      );
    } else {
      return <img alt="gameArt" src={this.state.previewImg}></img>;
    }
  };

  uploadGameArt = (e: any) => {
    if (!e.target.files[0] || (e.target.files[0].type !== "image/png" && e.target.files[0].type !== "image/jpeg")) return;
    const fd = new FormData();
    fd.append("boxArt", e.target.files[0], e.target.files[0].name);
    const prevImg = URL.createObjectURL(e.target.files[0]);
    axios
      .post("http://localhost:4000/api/games/image", fd)
      .then((res) => {
        this.setState({ previewImg: prevImg });
        this.setState({ boxArt: res.data.path });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addGame = () => {
    let newGame = {
      name: this.state.name,
      publisher: this.state.publisher,
      genre: this.state.genre,
      players: this.state.players,
      releaseDate: this.state.releaseDate,
      platform: this.state.platform,
      boxArt: this.state.boxArt
    };

    const errs = validateGame(newGame);
    if (Object.entries(errs).length === 0 && errs.constructor === Object) {
      this.setState({ error: "" });
      axios
        .post("http://localhost:4000/api/games/", newGame)
        .then((res) => {
          this.props.toggleAddGame(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({ error: Object.values(errs)[0] });
    }
  };

  getErrors = () => {
    return this.state.error;
  };

  getErrorStyle = () => {
    if (this.state.error !== "") {
      return {
        opacity: 1
      };
    }
  };

  render() {
    return (
      <div className="addGame" onClick={this.closeWindow}>
        <div className="addWindow">
          <i id="closeModal" className="closeWindowButton fas fa-times" onClick={this.closeWindow}></i>
          <div className="left">
            <div className="addGameArt">
              <input type="file" accept="image/png, image/jpeg" onChange={this.uploadGameArt} />
              {this.addGameArt()}
            </div>
          </div>
          <div className="right">
            <div className="platform">
              <div className="platformIcon" data-index={"PS"} onClick={this.selectPlatform} style={this.getSelectedStyle("PS")}>
                <img src={ps} alt="ps"></img>
              </div>
              <div className="platformIcon" data-index={"PS2"} onClick={this.selectPlatform} style={this.getSelectedStyle("PS2")}>
                <img src={ps2} alt="ps2"></img>
              </div>
              <div className="platformIcon" data-index={"PS3"} onClick={this.selectPlatform} style={this.getSelectedStyle("PS3")}>
                <img src={ps3} alt="ps3"></img>
              </div>
              <div className="platformIcon" data-index={"PS4"} onClick={this.selectPlatform} style={this.getSelectedStyle("PS4")}>
                <img src={ps4} alt="ps4"></img>
              </div>
            </div>
            <div className="inputArea">
              <div className="formGroup">
                <label>Name:</label>
                <input className="textInput" type="text" name="name" onChange={this.textInput}></input>
              </div>
              <div className="formGroup">
                <label>Publisher:</label>
                <input className="textInput" type="text" name="publisher" onChange={this.textInput}></input>
              </div>
              <div className="formGroup">
                <label>Genre:</label>
                <input className="textInput" type="text" name="genre" onChange={this.textInput}></input>
              </div>
              <div className="formGroup">
                <label>Players:</label>
                <input className="textInput" type="text" name="players" onChange={this.textInput}></input>
              </div>
              <div className="formGroup">
                <label>Release date:</label>
                <input className="textInput" type="text" name="releaseDate" onChange={this.textInput}></input>
              </div>
            </div>
            <div className="errors" style={this.getErrorStyle()}>
              Error: {this.getErrors()}
            </div>
            <input type="button" value="ADD GAME" className="addGameButton" onClick={this.addGame}></input>
          </div>
        </div>
      </div>
    );
  }
}

export default AddGame;
