# Dice.js

> Roll some dice with JavaScript.

## Installation

```shell
npm install cappu-dice
```

## Example

```js
var d20 = new Dice(20);

d20.roll();                              // 17
d20.roll(4);                             // [6, 7, 1, 12]

d20.addMod(100);                         // Add +100 to results
d20.roll(4);                             // [117, 109, 120, 107]

d20                                      // You can add more mods at once,
  .addMod(3)                             // +100 +3
  .addMod(2)                             // +100 +3 +2
  .addMod(10);                           // +100 +3 +2 +10

d20                                      // remove some
  .removeMod(100)                        // +3 +2 +10
  .removeMod(2);                         // +3 +10

d20.resetMods();                         // or clean them all

d20.addTmpMod(100);                      // You can also have temporary mods
d20.roll(4);                             // [101, 9, 6, 12]
d20.addTmpMod(100, 3);
d20.roll(4);                             // [107, 108, 116, 3]
```
