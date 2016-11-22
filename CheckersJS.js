/*

================= BOARD SETUP =================

*/

var setup = {
	row: ['a','b','c','d','e','f','g','h'],
	col: ['1','2','3','4','5','6','7','8'],
	redStart: ['a2','a4','a6','a8','b1','b3','b5','b7','c2','c4','c6','c8'],
	blackStart: ['f1','f3','f5','f7','g2','g4','g6','g8','h1','h3','h5','h7'],
	legalSpaces: ["a2", "a4", "a6", "a8", "b1", "b3", "b5", "b7", "c2", "c4", "c6", "c8", "d1", "d3", "d5", "d7", "e2", "e4", "e6", "e8", "f1", "f3", "f5", "f7", "g2", "g4", "g6", "g8", "h1", "h3", "h5", "h7"],
	reverse: '',
	selected: false,
	turn: true,
	red:"<div data-color='red' class='red'></div>",
	black:"<div data-color='black' class='black'></div>",
}

//Need to make function to chage board state.
//Set selected postion to empty
//Add new piece/color to new positin.
var boardState = {
		a2:"R", a4:"R", a6:"R", a8:"R",
		b1:"R", b3:"R", b5:"R", b7:"R",
		c2:"R", c4:"R", c6:"R", c8:"R",
		d1: "", d3: "", d5: "", d7: "",
		e2: "", e4: "", e6: "", e8: "",
		f1:"B", f3:"B", f5:"B", f7:"B",
		g2:"B", g4:"B", g6:"B", g8:"B",
		h1:"B", h3:"B", h5:"B", h7:"B",
}

var board = $("#checkerBoard");

/*
* Making the board
* Rows a-h
* Cols 1-8
*/
for(x = 0; x < setup.row.length; x++){

	board.append("<div id='row-" + setup.row[x] + "'class='parent'>");

	setup.reverse = false;
	if (x % 2){
		setup.reverse = true;
	}

	for (y = 0; y < setup.col.length; y++){

		var xyCords = setup.row[x] + setup.col[y];
		
		if (setup.reverse){

			$("#row-" + setup.row[x]).append("<div data-position='" + xyCords + "' class='square'></div>");

		} else {

			$("#row-" + setup.row[x]).prepend("<div data-position='" + xyCords + "' class='square'></div>");

		}

	}

	board.append("</div>");

}

//Putting the Red pieces on the board.
$.each(setup.redStart,function(key,val){
	var redPiece = $("div").find("[data-position='" + val + "']");
	redPiece.append('<div data-color="red" class="red"></div>');
});

//Putting the Black pieces on the board.
$.each(setup.blackStart,function(key,val){
	var blackPiece = $("div").find("[data-position='" + val + "']");
	blackPiece.append('<div data-color="black" class="black"></div>');
});


/*

================= GAME FUNCTIONS =================

*/

function isOpen(pos){
	if( boardState[pos] != undefined && !(boardState[pos].length) ){
		return true;
	}
	return false;
}

function legalMove(position){
	if ( setup.legalSpaces.includes(position) ){
		return true;
	}
	return false;
}

function checkTurn(color) {
	if (setup.turn && color == "black") {
		return "black";
	}
	if (!setup.turn && color == "red") {
		return "red";
	}
}

function selectPiece(){
	var self = $(this);
	var cords = self.data("position");
	var position = "[data-position='" + cords + "']";
	var color = self.find("div").data("color") ? self.find("div").data("color") : '';
	console.log(color);
	if (checkTurn(color) == "black") {

		if ( !(isOpen(cords)) ) {
			setup.selected = true;
			$('.square').off('click');
			self.children().toggleClass('selected');
			$(document).trigger('selected',[position,color]);
		}

	}
	if (checkTurn(color) == "red") {

		if ( !(isOpen(cords)) ) {
			setup.selected = true;
			$('.square').off('click');
			self.children().toggleClass('selected');
			$(document).trigger('selected',[position,color]);
		}

	}
	

};

/*

================= GAME LOGIC =================

*/


//Return the color and position of piece clicked.
//And Pass it to trigger selected.
if (!(setup.selected)){

	$('.square').on('click', selectPiece);
}


$(document).on('selected',function(event,position,color){

	if (setup.selected){

		$('.square').on('click', function(){

			var self = $(this);
			var cords = self.data("position");

			if ( isOpen(cords) ) {
				self.append(setup[color]);
				$(position).children().remove();
				setup.selected = false;
				setup.turn = setup.turn ? false : true;
				$('.square').off('click');
				$('.square').on('click', selectPiece)
			} else {
				console.log("No");
			}

		} );

	}

});