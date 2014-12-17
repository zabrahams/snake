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
    setInterval(this.step.bind(this), 250);
  };

  // View.prototype.display = function () {
  //     var v = this.board.render();
  //     this.$el.html("<p>"+ v + "</p>");
  //
  // };

  View.prototype.display = function () {
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

    this.board.snake.segments.forEach( function (segment) {
      $seg = $("li").filter(function() {
        var comp = SnakeGame.Coord.is_eq($(this).data('pos'), segment)
        return comp;
      });
      $seg.addClass("snake");
    });

    this.board.apples.forEach( function (apple) {
      $seg = $("li").filter(function() {
        var comp = SnakeGame.Coord.is_eq($(this).data('pos'), apple)
        return comp;
      });
      $seg.addClass("apple");
    });
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
    this.appleCount++;
    if (this.appleCount % 5 === 0) {
      this.board.generateApple();
    }
  };

})();
