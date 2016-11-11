/*

================= BOARD SETUP =================

*/


var board = $("#checkerBoard");

var row = ['a','b','c','d','e','f','g','h'];
var col = ['1','2','3','4','5','6','7','8'];
var redStart = ['a2','a4','a6','a8','b1','b3','b5','b7','c2','c4','c6','c8'];
var blackStart = ['f1','f3','f5','f7','g2','g4','g6','g8','h1','h3','h5','h7'];
var legalSpaces = [];
var reverse = '';
var selected = false;
var turn = true;

/*
* Making the board
* Rows a-h
* Cols 1-8
*/
for(x = 0; x < row.length; x++){

	board.append("<div id='row-" + row[x] + "'class='parent'>");

	reverse = false;
	if (x % 2){
		reverse = true;
	}

	for (y = 0; y < col.length; y++){

		var xyCords = row[x]+col[y];
		
		if (reverse){

			if ( !(y % 2) ){
				legalSpaces.push(xyCords);
			}

			$("#row-" + row[x]).append("<div data-position='" + xyCords + "' class='square'></div>");

		} else {

			if ( y % 2 ){
				legalSpaces.push(xyCords);
			}

			$("#row-" + row[x]).prepend("<div data-position='" + xyCords + "' class='square'></div>");

		}
		
	}

	board.append("</div>");

}

//Putting the Red pieces on the board.
$.each(redStart,function(key,val){
	var redPiece = $("div").find("[data-position='" + val + "']");
	redPiece.append('<div data-color="red" class="red"></div>');
});

//Putting the Black pieces on the board.
$.each(blackStart,function(key,val){
	var blackPiece = $("div").find("[data-position='" + val + "']");
	blackPiece.append('<div data-color="black" class="black"></div>');
});





/*

================= GAME FUNCTIONS =================

*/

function isEmpty(position){
	if ( position.children().length ) {
		return false;
	}
	return true;
}

function legalMove(position){
	if ( legalSpaces.includes(position) ){
		return true;
	}
	return false;
}

function checkTurn(color) {
	if (turn && color == "black") {
		return "black";
	}
	if (!turn && color == "red") {
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

		if ( !(isEmpty(self)) ) {
			selected = true;
			$('.square').off('click');
			self.children().toggleClass('selected');
			$(document).trigger('selected',[position,color]);
		}

	}
	if (checkTurn(color) == "red") {

		if ( !(isEmpty(self)) ) {
			selected = true;
			$('.square').off('click');
			self.children().toggleClass('selected');
			$(document).trigger('selected',[position,color]);
		}

	}
	

};

// function move(position, color){

// 	var self = $(this);
// 	var cords = self.data("position");

// 	if ( isEmpty(self) && legalMove(cords) ) {
// 		self.append("<div data-color='" + color + "' class='" + color + "'></div>");
// 		$(position).children().remove();
// 		selected = false;
// 		$('.square').off('click');
// 		$('.square').on('click', selectPiece)
// 	} else {
// 		console.log("No");
// 	}

// }


/*

================= GAME LOGIC =================

*/


//Return the color and position of piece clicked.
//And Pass it to trigger selected.
if (!(selected)){

	$('.square').on('click', selectPiece);
}


$(document).on('selected',function(event,position,color){

	if (selected){

		$('.square').on('click', function(){

			var self = $(this);
			var cords = self.data("position");

			if ( isEmpty(self) && legalMove(cords) ) {
				self.append("<div data-color='" + color + "' class='" + color + "'></div>");
				$(position).children().remove();
				selected = false;
				turn = turn ? false : true;
				$('.square').off('click');
				$('.square').on('click', selectPiece)
			} else {
				console.log("No");
			}

		} );

	}

});