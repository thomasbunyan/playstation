interface Errors {
  [key: string]: any;
}

let checkInRange = (date: string): boolean => {
  let d = new Date(date);
  let p = new Date(1970, 1, 1);
  return d > p;
};

export default (game: any) => {
  const err: Errors = {};

  if (game.name === "") {
    err["name"] = "Invalid name";
  }
  if (game.publisher === "") {
    err["publisher"] = "Invalid publisher";
  }
  if (game.genre === "") {
    err["genre"] = "Invalid genre";
  }
  if (game.players === "" || isNaN(parseInt(game.players))) {
    err["players"] = "Invalid number of players";
  }
  if (game.releaseDate === "" || isNaN(Date.parse(game.releaseDate)) || !checkInRange(game.releaseDate)) {
    err["releaseDate"] = "Invalid date";
  }
  if (game.platform === "") {
    err["platform"] = "Pick a platform";
  }
  if (game.boxArt === "") {
    err["boxArt"] = "Add some box art";
  }
  return err;
};
