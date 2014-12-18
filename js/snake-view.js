(function () {
  if (typeof SnakeGame === 'undefined'){
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function (board, $el){
    this.board = board;
    this.$el = $el;
    this.display();
    this.bindKeyEvents();
    this.appleCount = 0;
    this.paused = false;
    this.intervalId = setInterval(this.step.bind(this), 50);
  };

  View.prototype.display = function () {
    var _board = this.board;

    var posArray = []
    for (var i = 0; i < 30; i++) {
      for (var j = 0; j < 30; j++) {
        posArray.push([j, i]);
      }
    }

    this.$el.html("<ul class='group'></ul>");
    for (var i = 0; i < 900; i++) {
      var $li = $("<li></li>").data("pos", posArray[i]);
      $("ul").append($li);
    }

    this.$el.append("<h1>Score: " + this.board.score + "</h1>")


    $("li").each(function () {
      var $square = $(this);
      var squarePos = $square.data('pos');
      if (SnakeGame.Coord.indexOf(_board.apples, squarePos) !== -1) {
        $square.addClass("apple");
      }

      if (SnakeGame.Coord.indexOf(_board.snake.segments, squarePos) !== -1) {
        $square.addClass("snake");
      }

    });
  };

  View.prototype.togglePause = function () {
      if (this.pause === true ){
        this.intervalId = setInterval(this.step.bind(this), 50);
      }
      else {
        clearInterval(this.intervalId);
      }
      $("label").toggleClass("paused");
      this.pause = !this.pause;
  }

  View.prototype.bindKeyEvents = function () {
    $("body").on("keydown", this.handleKeyEvent.bind(this));
  };

  View.prototype.handleKeyEvent = function (event) {
    if (event.keyCode === 38 ){
      this.board.snake.turn("N");
    } else if (event.keyCode === 40 ){
      this.board.snake.turn("S");
    } else if (event.keyCode === 39 ){
      this.board.snake.turn("E");
    } else if (event.keyCode === 37 ){
      this.board.snake.turn("W");
    } else if (event.keyCode === 32 ) {
      this.togglePause();
    }
  };


  View.prototype.step = function () {
    this.board.snake.move();
    this.board.eat();
    this.display();
    this.appleCount++;
    if (this.appleCount % 5 === 0) {
      this.board.generateApple();
    }
    if (this.board.snake.isDead() === true) {
      alert("You're totally dead! Like the deadest snake to ever come from deadsville.");
      clearInterval(this.intervalId);
      $("body").off("keydown");
    }
  };

})();
