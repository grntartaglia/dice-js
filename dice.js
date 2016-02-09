!function(root, undefined) { // eslint-disable-line
  'use strict';

  function Dice(sides) {
    this.sides = sides;
    this.mods = [];
    this.tmpMods = [];
  }

  Dice.prototype = {
    // Private
    // ========================================================================
    _random: function random() {
      return (Math.random() * this.sides) + 1;
    },

    _refreshTmpMods: function refreshTmpMods() {
      var tmpMods = this.tmpMods;

      tmpMods.forEach(function refresh(mod, i) {
        if (--mod.times === 0) { // eslint-disable-line no-param-reassign
          delete tmpMods[i];
        }
      });
    },

    // Public
    // ========================================================================
    roll: function roll(times) {
      var t = times || 1;
      var res = [];
      var i;

      for (i = 0; i < t; i++) {
        res.push(Math.floor(
          this._random() +
          this.getModsSum() +
          this.getTmpModsSum()
        ));

        this._refreshTmpMods();
      }

      return res.length === 1 ? res[0] : res;
    },

    // Mods
    // ------------------------------------------------------------------------
    addMod: function add(mod) {
      if (isNaN(mod)) {
        throw new Error('Invalid mod type.');
      }

      this.mods.push(mod);
      return this;
    },

    removeMod: function remove(mod) {
      if (isNaN(mod)) {
        throw new Error('Invalid mod type.');
      }

      this.mods.splice(this.mods.indexOf(mod), 1);
      return this;
    },

    resetMods: function reset() {
      this.mods = [];
      return this;
    },

    getModsSum: function get() {
      var total = 0;
      this.mods.forEach(function sum(mod) {
        total += mod;
      });

      return total;
    },

    // Tmp Mods
    // ------------------------------------------------------------------------
    addTmpMod: function add(val, t) {
      var times = t || 1;
      var mod = { val: val, times: times };

      if (isNaN(mod.val) || isNaN(mod.times)) {
        throw new Error('Invalid mod.');
      }

      this.tmpMods.push(mod);
      return this;
    },

    resetTmpMods: function reset() {
      this.tmpMods = [];
      return this;
    },

    getTmpModsSum: function get() {
      var total = 0;
      this.tmpMods.forEach(function sum(mod) {
        total += mod.val;
      });

      return total;
    },
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Dice;
    }
  } else {
    root.Dice = Dice; // eslint-disable-line no-param-reassign
  }
}(this);
