import React, { Component, ReactElement } from "react";

export class ScrollList extends Component {
  state = {
    list: ["", "GOD OF WAR", "LAST OF US", "CALL OF DUTY", "IT", "FIFA", "RED DEAD REDEMPTION 2", "PES", "UFC", "BATTLEFIELD", "FORZA", "ANTHEM"],
    selectedIndex: 0,
    lastIndex: -1,
    listAlignment: 4,
    searchAlignment: 3,
    searchQuery: ""
  };

  timeout = setTimeout(() => {}, 0);

  componentDidMount = (): void => {
    window.addEventListener("wheel", this.handleScroll, true);
    window.addEventListener("keydown", this.handleArrow, true);
  };
  componentWillUnmount = (): void => {
    window.removeEventListener("wheel", this.handleScroll);
    window.removeEventListener("keydown", this.handleScroll);
  };

  handleArrow = (e: any): void => {
    if (e.key === "ArrowUp") {
      this.moveList("up");
    } else if (e.key === "ArrowDown") {
      this.moveList("down");
    }
  };

  handleScroll = (e: any): void => {
    if (e.deltaY < 0) {
      this.moveList("up");
    } else if (e.deltaY > 0) {
      this.moveList("down");
    }
  };

  moveList = (direction: string): void => {
    if (direction === "up") {
      if (this.state.selectedIndex > 0) {
        this.setState({ selectedIndex: this.state.selectedIndex - 1 }, () => {});
        this.setState({ listAlignment: this.state.listAlignment + 1 });
      }
    } else if (direction === "down") {
      if (this.state.selectedIndex < this.state.list.length - 1) {
        this.setState({ selectedIndex: this.state.selectedIndex + 1 }, () => {});
        this.setState({ listAlignment: this.state.listAlignment - 1 });
      }
    }
    this.getData();
  };

  clickListItem = (e: any): void => {
    this.setState({ listAlignment: this.state.listAlignment + (this.state.selectedIndex - parseInt(e.target.getAttribute("data-index"))) }, () => {});
    this.setState({ selectedIndex: parseInt(e.target.getAttribute("data-index")) }, () => {});
    this.getData();
  };

  getData = (): void => {
    clearTimeout(this.timeout);
    if (this.state.lastIndex === this.state.selectedIndex) return;
    this.timeout = setTimeout(() => {
      this.setState({ lastIndex: this.state.selectedIndex });
      // Call callback to get data.
      console.log(this.state.list[this.state.selectedIndex]);
    }, 1000);
  };

  getListStyle = (index: number): React.CSSProperties => {
    const style = {
      transition: "all 0.2s ease-in-out",
      fontSize: "1em",
      color: "white",
      fontWeight: 400
    };
    if (this.state.selectedIndex === index) {
      style.fontSize = 4 + "em";
      style.fontWeight = 700;
    } else if (this.state.selectedIndex === index - 1 || this.state.selectedIndex === index + 1) {
      style.fontSize = 1.2 + "em";
      style.color = "rgba(255,255,255,0.45)";
    } else {
      style.fontSize = 0.8 + "em";
      style.color = "rgba(255,255,255,0.25)";
    }
    return style;
  };

  getULOffset = (): React.CSSProperties => {
    return {
      top: this.state.listAlignment + "em",
      position: "absolute" as "absolute",
      transition: "all 0.2s ease-in-out"
    };
  };

  getSearchOffset = (): React.CSSProperties => {
    return {
      top: this.state.listAlignment + "em",
      position: "absolute" as "absolute",
      transition: "all 0.2s ease-in-out",
      backgroundColor: "transparent",
      border: "none",
      borderBottom: "black 1px solid",
      fontSize: "1em"
    };
  };

  getGamesList = (): Array<ReactElement> => {
    return this.state.list.map((game, index) => {
      return (
        <li key={game} data-index={index} onClick={this.clickListItem} style={this.getListStyle(index)}>
          {game}
        </li>
      );
    });
  };

  changeQuery = (e: any): void => {
    this.setState({ searchQuery: e.target.value });
  };

  styles = {
    gameList: {
      height: "200px",
      overflow: "hidden",
      position: "relative" as "relative"
    }
  };

  render() {
    return (
      <div>
        <div style={this.styles.gameList}>
          {/* <input type="text" name="search" value={this.state.searchQuery} onChange={this.changeQuery} style={this.getSearchOffset()}></input> */}
          <ul className="noselect" style={this.getULOffset()}>
            {this.getGamesList()}
          </ul>
        </div>
      </div>
    );
  }
}

export default ScrollList;
