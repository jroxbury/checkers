/*

================= BOARD SETUP =================

*/


var dom = $("#checkerBoard");

//Need to make function to chage board state.
//Set selected postion to empty
//Add new piece/color to new positin.
var board = {

	state: {
		a2:{color:"R", row:1, index:1, king:false},
		a4:{color:"R", row:1, index:2, king:false},
		a6:{color:"R", row:1, index:3, king:false},
		a8:{color:"R", row:1, index:4, king:false},

		b1:{color:"R", row:2, index:1, king:false},
		b3:{color:"R", row:2, index:2, king:false},
		b5:{color:"R", row:2, index:3, king:false},
		b7:{color:"R", row:2, index:4, king:false},

		c2:{color:"R", row:3, index:1, king:false},
		c4:{color:"R", row:3, index:2, king:false},
		c6:{color:"R", row:3, index:3, king:false},
		c8:{color:"R", row:3, index:4, king:false},

		d1:{color:"" , row:4, index:1, king:false},
		d3:{color:"" , row:4, index:2, king:false},
		d5:{color:"" , row:4, index:3, king:false},
		d7:{color:"" , row:4, index:4, king:false},

		e2:{color:"" , row:5, index:1, king:false},
		e4:{color:"" , row:5, index:2, king:false},
		e6:{color:"" , row:5, index:3, king:false},
		e8:{color:"" , row:5, index:4, king:false},

		f1:{color:"B", row:6, index:1, king:false},
		f3:{color:"B", row:6, index:2, king:false},
		f5:{color:"B", row:6, index:3, king:false},
		f7:{color:"B", row:6, index:4, king:false},

		g2:{color:"B", row:7, index:1, king:false},
		g4:{color:"B", row:7, index:2, king:false},
		g6:{color:"B", row:7, index:3, king:false},
		g8:{color:"B", row:7, index:4, king:false},

		h1:{color:"B", row:8, index:1, king:false},
		h3:{color:"B", row:8, index:2, king:false},
		h5:{color:"B", row:8, index:3, king:false},
		h7:{color:"B", row:8, index:4, king:false},
	},

	selected: {
		king: false,
		position: "",
		color: "",
		row: "",
		index: "",
	},

	// rows: {
	// 	1:["a2","a4","a6","a8"],
	// 	2:["b1","b3","b5","b7"],
	// 	3:["c2","c4","c6","c8"],
	// 	4:["d1","d3","d5","d7"],
	// 	5:["e2","e4","e6","e8"],
	// 	6:["f1","f3","f5","f7"],
	// 	7:["g2","g4","g6","g8"],
	// 	8:["h1","h3","h5","h7"],
	// },

	setup: {
		row: ['a','b','c','d','e','f','g','h'],
		col: ['1','2','3','4','5','6','7','8'],
		redStart: ['a2','a4','a6','a8','b1','b3','b5','b7','c2','c4','c6','c8'],
		blackStart: ['f1','f3','f5','f7','g2','g4','g6','g8','h1','h3','h5','h7'],
	},
	
	legalSpaces: ["a2", "a4", "a6", "a8", "b1", "b3", "b5", "b7", "c2", "c4", "c6", "c8", "d1", "d3", "d5", "d7", "e2", "e4", "e6", "e8", "f1", "f3", "f5", "f7", "g2", "g4", "g6", "g8", "h1", "h3", "h5", "h7"],
	reverse: '',
	turn: true,
	red: {
		pieces:12,
		display:"<div data-color='red' class='red'></div>",
		king:"&#9733;",
	},
	black: {
		pieces:12,
		display:"<div data-color='black' class='black'></div>",
		king:"&#9734;",
	},

	isOpen: function(pos) {
		if( this.state[pos] != undefined && !(this.state[pos].color.length) ){
			return true;
		}
		return false;
	},

	legalMove: function(position) {
		if ( this.legalSpaces.includes(position) ) {
			return true;
		}
		return false;
	},

	checkTurn: function(color) {
		if (this.turn && color == "black") {
			return "black";
		}
		if (!this.turn && color == "red") {
			return "red";
		}
	},

	getColor: function (pos){
		if( this.state[pos] != undefined && this.state[pos].color.length){
			return this.state[pos].color === "R" ? "red" : "black";
		}
	},

	toggleTurn: function(){
		return this.turn === true ? this.turn = false : this.turn = true;
	},

	storeClick: function(pos,color) {
		this.selected.position = pos;
		this.selected.color = color;
		this.selected.row = this.state[pos].row;
		this.selected.index = this.state[pos].index;
	},

	clearClick: function() {
		this.selected.position = "";
		this.selected.color = "";
		this.selected.row = "";
		this.selected.index = "";
	},


	// Dom functions
	getPosition: function(click){
		return $(click).data("position");
	},

	toggleSelected: function(pos) {
		$("[data-position=" + pos + "]").children().toggleClass("selected");
	},

	removePiece: function(pos) {
		$("[data-position=" + pos + "]").children().remove();
		this.state[pos].color = "";
	},

	setPiece: function(pos) {
		$("[data-position=" + pos + "]").append(this[this.selected.color].display);
		var color;
		this.selected.color == "red" ? color = "R" : color = "B";
		this.state[pos].color = color;
	},

	canMove: function(pos) {
		if ( this.selected.color === "black" && this.selected.row == (this.state[pos].row + 1) && (this.selected.index == this.state[pos].index  || this.selected.index == (this.state[pos].index + 1) ) ) {
			return true;
		}else if ( this.selected.color === "red" && this.selected.row == (this.state[pos].row - 1) && (this.selected.index == this.state[pos].index  || this.selected.index == (this.state[pos].index - 1) ) ) {
			return true;
		}else {
			return false;
		}
	},
	

	jump: function() {

	},

	captured: function(color) {
		this[color].pieces -= 1;
	},
}



/*
* Making the board
* Rows a-h
* Cols 1-8
*/
for(x = 0; x < board.setup.row.length; x++){

	dom.append("<div id='row-" + board.setup.row[x] + "'class='parent'>");

	board.setup.reverse = false;
	if (x % 2){
		board.setup.reverse = true;
	}

	for (y = 0; y < board.setup.col.length; y++){

		var xyCords = board.setup.row[x] + board.setup.col[y];
		
		if (board.setup.reverse){

			$("#row-" + board.setup.row[x]).append("<div data-position='" + xyCords + "' class='square'></div>");

		} else {

			$("#row-" + board.setup.row[x]).prepend("<div data-position='" + xyCords + "' class='square'></div>");

		}

	}

	dom.append("</div>");

}

//Putting the Red pieces on the board.
$.each(board.setup.redStart, function(key,val) {
	var redPiece = $("div").find("[data-position='" + val + "']");
	redPiece.append('<div data-color="red" class="red"></div>');
});

//Putting the Black pieces on the board.
$.each(board.setup.blackStart, function(key,val) {
	var blackPiece = $("div").find("[data-position='" + val + "']");
	blackPiece.append('<div data-color="black" class="black"></div>');
});


/*

================= GAME LOGIC =================

*/


$('.square').on('click', function(){
	var _click = this;
	//Get click position.
	var pos = board.getPosition(_click);

	/*
	*	If player hasn't selected a piece yet.
	*	If valid position && Piece not yet selected.
	*/
	if (board.legalMove(pos) && !board.selected.position ){

		//Return click color.
		var color = board.getColor(pos);

		//Black turn && Black click || Red Turn && Red click.
		if ( board.checkTurn(color) ) {

			//Store inital click position.
			board.storeClick(pos,color);

			//Toggle CSS selected state.
			board.toggleSelected(pos);

			return;
		}
	}

	/*
	*	If piece selected and click on piece of same color.
	*	Allow player to switch piece if already selected.
	*/
	if( board.selected.color === board.getColor(pos) ){
		//Turn off selected state of previous piece
		board.toggleSelected(board.selected.position);
		//Store new piece position
		board.storeClick(pos,board.selected.color);
		//Toggle selected state for new piece.
		board.toggleSelected(pos);
		return;
	}

	//If piece already selected and the click is open space, and its a legal move. The intention is to move the piece.
	if( board.selected.position && board.isOpen(pos) && board.legalMove(pos) && board.canMove(pos) ) {

		//Clear previous position
		board.removePiece(board.selected.position);
		//Set piece in new position.
		board.setPiece(pos);
		//Clear Selected Object.
		board.clearClick();
		//Switch turn to next player.
		board.toggleTurn();

	}

});