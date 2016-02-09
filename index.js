'use strict';
class Dice {
  constructor(sides) {
    this.sides = sides;
    this.mods = [];
  }

  _random() {
    return (Math.random() * this.sides) + 1;
  }

  roll(times) {
    const t = times || 1;
    const res = [];

    for (let i = 0; i < t; i++) {
      res.push(Math.floor(
        this._random()
      ));
    }

    return res.length === 1 ? res[0] : res;
  }
}

module.exports = Dice;
