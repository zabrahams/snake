( function () {
    if (typeof SnakeGame === 'undefined'){
      window.SnakeGame = {};
    }

    var Coord = SnakeGame.Coor = function () {};

    Coord.plus = function (first, second) {
      return [first[0] + second[0], first[1] + second[1]]
    };

    Coord.indexOf = function (array, el) {
      for (var i = 0; i < array.length; i++) {
        var testEl = array[i];
        if (testEl[0] === el[0] && testEl[1] === el[1] ) {
          return i;
        }
      }

      return -1; //el not found!
    }


    var Snake = SnakeGame.Snake = function () {
      this.dir = "N";
      this.segments = [[10, 10]];
    };

    Snake.dir = {N: [0, -1], E: [1, 0], S: [0, 1], W: [-1, 0]};

    Snake.prototype.move = function () {
      for (var i = 0; i < this.segments.length; i++) {
        this.segments[i] = Coord.plus(this.segments[i], Snake.dir[this.dir]);
      }
    };

    Snake.prototype.turn = function (newDir) {
      this.dir = newDir;
    };

    var Board = SnakeGame.Board = function () {
      this.snake = new Snake();
      this.apples = [];  // For later!
    };

    Board.SIZE = 30;

    Board.prototype.render = function () {
        var boardStr = "";
        for (var i = 0; i < Board.SIZE; i++) {
          for (var j = 0; j < Board.SIZE; j++) {
            if (Coord.indexOf(this.snake.segments, [j,i]) === -1){
              boardStr += "_";
            } else {
              boardStr += "S";
            }
          }
          boardStr += "<br>";
        }
        return boardStr;
    };

})();
