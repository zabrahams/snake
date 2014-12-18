( function () {
    if (typeof SnakeGame === 'undefined'){
      window.SnakeGame = {};
    }

    var Coord = SnakeGame.Coord = function () {};

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

    Coord.is_eq = function (co1, co2) {
      return (co1[0] === co2[0] && co1[1] === co2[1])
    };

    var Snake = SnakeGame.Snake = function () {
      this.dir = "N";
      this.segments = [[10, 10]];
    };

    Snake.dir = {N: [0, -1], E: [1, 0], S: [0, 1], W: [-1, 0]};

    Snake.prototype.move = function () {
      var firstSeg = this.segments[0];
      newSeg = Coord.plus(firstSeg, Snake.dir[this.dir]);
      this.segments.pop();
      this.segments.unshift(newSeg);
    };

    // // Weird tumor style movement
    // Snake.prototype.move = function () {
    //   for (var i = 0; i < this.segments.length; i++) {
    //     this.segments[i] = Coord.plus(this.segments[i], Snake.dir[this.dir]);
    //   }
    // };

    Snake.prototype.isDead = function () {
      var snakeBody = this.segments.slice(1);
      var snakeHead = this.segments[0];
      var headX = snakeHead[0];
      var headY = snakeHead[1];
      return (headX < 0 ||
              headX > 29 ||
              headY < 0 ||
              headY > 29 ||
              Coord.indexOf(snakeBody, snakeHead) !== -1)
    }

    Snake.prototype.turn = function (newDir) {
      this.dir = newDir;
    };

    Snake.prototype.grow = function () {
      var lastSeg = this.segments[this.segments.length - 1];
      var newSeg = [];
      if (this.dir === "N") {
        console.log(lastSeg);
        console.log(Snake.dir['S'])
        newSeg = Coord.plus(lastSeg, Snake.dir['S']);
        this.segments.push(newSeg);
      } else if (this.dir === "S") {
        newSeg = Coord.plus(lastSeg, Snake.dir['N']);
        this.segments.push(newSeg);
      } else if (this.dir === "E") {
        newSeg = Coord.plus(lastSeg, Snake.dir['W']);
        this.segments.push(newSeg);
      } else if (this.dir === "W") {
        newSeg = Coord.plus(lastSeg, Snake.dir['E']);
        this.segments.push(newSeg);
      }
    };


    var Board = SnakeGame.Board = function () {
      this.snake = new Snake();
      this.apples = [];
      this.score = 0;
    };

    Board.SIZE = 30;

    Board.prototype.eat = function () {
      var appleIdx = Coord.indexOf(this.apples, this.snake.segments[0]);
      if (appleIdx !== -1) {
        this.snake.grow();
        this.score += 1000;
        this.apples.splice(appleIdx, 1);
      }
    };

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

    Board.prototype.generateApple = function () {
        var x = Math.floor((Board.SIZE) *Math.random());
        var y = Math.floor((Board.SIZE) *Math.random());
        this.apples.push([x,y]); //may over count twice, fix later
    };

})();
