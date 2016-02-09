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
    let res;

    if (t === 1) {
      res = this._random();
    } else {
      res = [];

      for (let i = 0; i < t; i++) {
        res.push(this.roll());
      }
    }

    return res;
  }
}

module.exports = Dice;
