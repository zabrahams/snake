(function () {
  if (typeof SnakeGame === 'undefined'){
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function (board, $el){
    this.board = board;
    this.$el = $el;
    this.display();
    this.bindKeyEvents();
    setInterval(this.step.bind(this), 500);
  };

  View.prototype.display = function () {
      var v = this.board.render();
      this.$el.html("<p>"+ v + "</p>");

  };

  View.prototype.bindKeyEvents = function () {
    this.$el.on("keydown", this.handleKeyEvent.bind(this));
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
    }
  };


  View.prototype.step = function () {
    this.board.snake.move();
    this.display();
  };

})();
