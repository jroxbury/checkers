var board = $("#checkerBoard");

var row = ['a','b','c','d','e','f','g','h'];
var col = ['1','2','3','4','5','6','7','8'];
var redStart = ['a2','a4','a6','a8','b1','b3','b5','b7','c2','c4','c6','c8'];
var blackStart = ['f1','f3','f5','f7','g2','g4','g6','g8','h1','h3','h5','h7'];
var legalSpaces = [];
var reverse = '';
var selected = false;

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

		var position = row[x]+col[y];
		
		if (reverse){

			if ( !(y % 2) ){
				legalSpaces.push(position);
			}

			$("#row-" + row[x]).append("<div data-position='" + position + "' class='square'></div>");

		} else {

			if ( y % 2 ){
				legalSpaces.push(position);
			}

			$("#row-" + row[x]).prepend("<div data-position='" + position + "' class='square'></div>");

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

//Return the color and position of piece clicked.
if (!(selected)){
	$('.square').on('click',function(){

		var self = $(this);
		var cords = self.data("position");
		var position = $("[data-position='" + cords + "']");
		var color = self.find("div").data("color") ? self.find("div").data("color") : '';

		if ( !(isEmpty(self)) ) {
			$(document).trigger('selected',[position,color]);
		}

	});
}




$(document).on('selected',function(event,position,color){

	selected = true;

	if (selected){

		$('.square').on('click',function(event){

			var self = $(this);
			var cords = self.data("position");

			// console.log(position);
			if ( isEmpty(self) && legalMove(cords) ) {
				self.append("<div data-color='" + color + "' class='" + color + "'></div>");
				position.children().remove();
				selected = false;
			} else {
				console.log("No");
			}

		});

	}


});
// 	if ( !(legalMove(position)) ){
// 		console.log("You cannot move there!");
// 	};
// 	if ( isEmpty(self) && legalMove(position) ){
// 		console.log("Available");
// 	}else {
// 		if(color){console.log(color);}
// 	}
	
// })

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

function select(position){

}
