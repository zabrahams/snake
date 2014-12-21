(function () {
  if (typeof SnakeGame === 'undefined'){
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function (board, $el){
    this.board = board;
    this.$el = $el;
    this.appleCount = 0;
    this.paused = false;
    this.toDraw = { snakeChange: [],
                    appleChange: []};
    this.bindKeyEvents();
    this.makeBoard();
    this.intervalId = setInterval(this.step.bind(this), 50);
  };

  View.prototype.makeBoard = function () {
    var posArray = [];

    for (var i = 0; i < 30; i++) {
      for (var j = 0; j < 30; j++) {
        posArray.push([j, i]);
      }
    }

    this.boardMatrix = new Array(30);
    for (var i = 0; i < 30; i++) {
      this.boardMatrix[i] = new Array(30);
    }

    var $container = $("<ul class='group'></ul>");

    for (var i = 0; i < 900; i++) {
      var $li = $("<li></li>").data("pos", posArray[i]);
      $($container).append($li);
      this.boardMatrix[posArray[i][0]][posArray[i][1]] = $li;
    }

    for (var i = 0; i < this.board.snake.segments.length; i++) {
      var segX = this.board.snake.segments[i][0];
      var segY = this.board.snake.segments[i][1];
      this.boardMatrix[segX][segY].addClass("snake");
    }

    this.$el.html($container);
  };


  View.prototype.updateBoard = function () {
    var _board = this.board;

    for (var i = 0; i < this.toDraw.snakeChange.length; i++) {
      var segX = this.toDraw.snakeChange[i][0];
      var segY = this.toDraw.snakeChange[i][1];
      if (segX > 0 && segX <= 30 && segY > 0 && segY <= 30 ) {
        this.boardMatrix[segX][segY].toggleClass("snake");
      }
    }

    for (var i = 0; i < this.toDraw.appleChange.length; i++) {
      var segX = this.toDraw.appleChange[i][0];
      var segY = this.toDraw.appleChange[i][1];
      if (segX > 0 && segX <= 30 && segY > 0 && segY <= 30 ) {
        this.boardMatrix[segX][segY].toggleClass("apple");
      }
    }
  };

  View.prototype.togglePause = function () {
      if (this.paused === true ){
        this.intervalId = setInterval(this.step.bind(this), 50);
      }
      else {
        clearInterval(this.intervalId);
      }
      $("label").toggleClass("paused");
      this.paused = !this.paused;
  }

  View.prototype.bindKeyEvents = function () {
    $("body").on("keydown", this.handleKeyEvent.bind(this));
  };

  View.prototype.handleKeyEvent = function (event) {
    if (event.keyCode === 38 && !this.paused ){
      this.board.snake.turn("N");
    } else if (event.keyCode === 40 && !this.paused){
      this.board.snake.turn("S");
    } else if (event.keyCode === 39 && !this.paused){
      this.board.snake.turn("E");
    } else if (event.keyCode === 37 && !this.paused){
      this.board.snake.turn("W");
    } else if (event.keyCode === 32 ) {
      this.togglePause();
    }
  };

  View.prototype.step = function () {
    var startSnake = this.board.snake.segments.slice();
    var startApples = this.board.apples.slice();

    this.board.snake.move();
    this.board.eat();


    this.appleCount++;
    if (this.appleCount % 5 === 0) {
      this.board.generateApple();
    }

    this.toDraw.snakeChange = SnakeGame.Coord.getUniques(startSnake, this.board.snake.segments.slice());
    this.toDraw.appleChange = SnakeGame.Coord.getUniques(startApples, this.board.apples.slice());
    this.updateBoard();

    if (this.board.snake.isDead() === true) {
      console.log("dead");
      alert("You're totally dead! Like the deadest snake to ever come from deadsville.");
      clearInterval(this.intervalId);
      $("body").off("keydown");
    }
  };

})();
