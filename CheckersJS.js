/*

================= BOARD SETUP =================

*/


var dom = $("#checkerBoard");

//Need to make function to chage board state.
//Set selected postion to empty
//Add new piece/color to new positin.
var board = {

	state: {
		a2:["R",1], a4:["R",1], a6:["R",1], a8:["R",1],
		b1:["R",2], b3:["R",2], b5:["R",2], b7:["R",2],
		c2:["R",3], c4:["R",3], c6:["R",3], c8:["R",3],
		d1:[ "",4], d3:[ "",4], d5:[ "",4], d7:[ "",4],
		e2:[ "",5], e4:[ "",5], e6:[ "",5], e8:[ "",5],
		f1:["B",6], f3:["B",6], f5:["B",6], f7:["B",6],
		g2:["B",7], g4:["B",7], g6:["B",7], g8:["B",7],
		h1:["B",8], h3:["B",8], h5:["B",8], h7:["B",8],
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
	selected: false,
	turn: true,
	red:"<div data-color='red' class='red'></div>",
	black:"<div data-color='black' class='black'></div>",
	selectedPosition: "",
	selectedColor: "",

	isOpen: function(pos) {
		if( this.state[pos][0] != undefined && !(this.state[pos][0].length) ){
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
		if(this.state[pos][0] != undefined && this.state[pos][0].length){
			return this.state[pos][0] === "R" ? "red" : "black";
		}
	},

	toggleTurn: function(){
		this.selectedPosition = "";
		return this.turn === true ? this.turn = false : this.turn = true;
	},

	storeClick: function(pos,color) {
		this.selectedPosition = pos;
		this.selectedColor = color;
	},

	clearClick: function() {
		this.selectedPosition = "";
	},


	// Dom functions
	getPosition: function(click){
		return $(click).data("position");
	},

	toggleSelected: function(pos) {
		$("[data-position=" + pos + "]").children().toggleClass("selected");
	},

	removePiece: function(selectedPosition) {
		$("[data-position=" + selectedPosition + "]").children().remove();
		this.state[selectedPosition][0] = "";
	},

	setPiece: function(click) {
		$("[data-position=" + click + "]").append(this[this.selectedColor]);
		var color;
		this.selectedColor == "red" ? color = "R" : color = "B";
		this.state[click][0] = color;
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
	if (board.legalMove(pos) && !board.selectedPosition ){

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
	if( board.selectedColor === board.getColor(pos) ){
		//Turn off selected state of previous piece
		board.toggleSelected(board.selectedPosition);
		//Store new piece position
		board.storeClick(pos,board.selectedColor);
		//Toggle selected state for new piece.
		board.toggleSelected(pos);
		return;
	}

	//If piece already selected and the click is open space, and its a legal move. The intention is to move the piece.
	if( board.selectedPosition && board.isOpen(pos) && board.legalMove(pos) ) {

		//Clear previous position
		board.removePiece(board.selectedPosition);
		//Set piece in new position.
		board.setPiece(pos);
		//Switch turn to next player.
		board.toggleTurn();
	}

});