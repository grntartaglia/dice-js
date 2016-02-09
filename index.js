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
        this._random() +
        this.getModsSum()
      ));
    }

    return res.length === 1 ? res[0] : res;
  }

  addMod(mod) {
    if (Array.isArray(mod)) {
      mod.forEach((m) => this.addMod(m));
      return this;
    }

    if (isNaN(mod)) {
      throw new Error('Invalid mod type.');
    }

    this.mods.push(mod);
    return this;
  }

  removeMod(mod) {
    if (isNaN(mod)) {
      throw new Error('Invalid mod type.');
    }

    this.mods.splice(this.mods.indexOf(mod), 1);
    return this;
  }

  resetMods() {
    this.mods = [];
    return this;
  }

  getModsSum() {
    let total = 0;
    this.mods.forEach(mod => total += mod);
    return total;
  }
}

module.exports = Dice;
