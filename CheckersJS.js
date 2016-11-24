/*

================= BOARD SETUP =================

*/


var dom = $("#checkerBoard");

//Need to make function to chage board state.
//Set selected postion to empty
//Add new piece/color to new positin.
var board = {

	state: {
		a2:"R", a4:"R", a6:"R", a8:"R",
		b1:"R", b3:"R", b5:"R", b7:"R",
		c2:"R", c4:"R", c6:"R", c8:"R",
		d1: "", d3: "", d5: "", d7: "",
		e2: "", e4: "", e6: "", e8: "",
		f1:"B", f3:"B", f5:"B", f7:"B",
		g2:"B", g4:"B", g6:"B", g8:"B",
		h1:"B", h3:"B", h5:"B", h7:"B",
	},

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

	isOpen: function(pos) {
		if( this.state[pos] != undefined && !(this.state[pos].length) ){
			return true;
		}
		return false;
	},

	legalMove: function(position) {
		if ( this.legalSpaces.includes(position) ){
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
		if(this.state[pos] != undefined && this.state[pos].length){
			return this.state[pos] === "R" ? "red" : "black";
		}
	},

	getPosition: function(click){
		return $(click).data("position");
	},

	toggleTurn: function(){
		return this.turn === true ? this.turn = false : this.turn = true;
	},

	setSelectedPosition: function(pos) {

		this.selectedPosition = pos;

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

	//Get click position.
	var pos = board.getPosition(this);

	//Check if click is valid position.
	if (board.legalMove(pos)){

		//Return click color.
		var color = board.getColor(pos);

		//Black turn && Black click || Red Turn && Red click.
		if ( board.checkTurn(color) ) {

			//Switch Turn.
			// board.toggleTurn();

			board.setSelectedPosition(pos);

		}
	}
	

});