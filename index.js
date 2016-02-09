'use strict';
class Dice {
  constructor(sides) {
    this.sides = sides;
    this.mods = [];
    this.tmpMods = [];
  }

  _random() {
    return (Math.random() * this.sides) + 1;
  }

  _refreshTmpMods() {
    this.tmpMods.forEach((mod, i) => {
      if (--mod.times === 0) { // eslint-disable-line no-param-reassign
        delete this.tmpMods[i];
      }
    });
  }

  roll(times) {
    const t = times || 1;
    const res = [];

    for (let i = 0; i < t; i++) {
      res.push(Math.floor(
        this._random() +
        this.getModsSum() +
        this.getTmpModsSum()
      ));

      this._refreshTmpMods();
    }

    return res.length === 1 ? res[0] : res;
  }

  addMod(mod) {
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

  addTmpMod(val, t) {
    const times = t || 1;
    const mod = { val, times };

    if (isNaN(mod.val) || isNaN(mod.times)) {
      throw new Error('Invalid mod.');
    }

    this.tmpMods.push(mod);
    return this;
  }

  resetTmpMods() {
    this.tmpMods = [];
    return this;
  }

  getTmpModsSum() {
    let total = 0;
    this.tmpMods.forEach(mod => total += mod.val);
    return total;
  }
}

module.exports = Dice;
