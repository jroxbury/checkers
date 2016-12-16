/*

================= BOARD SETUP =================

*/


var dom = $("#checkerBoard");

//Need to make function to chage board state.
//Set selected postion to empty
//Add new piece/color to new positin.
var board = {

	state: {
		a2:{color:"R", row:1, index:0, king:false},
		a4:{color:"R", row:1, index:1, king:false},
		a6:{color:"R", row:1, index:2, king:false},
		a8:{color:"R", row:1, index:3, king:false},

		b1:{color:"R", row:2, index:0, king:false},
		b3:{color:"R", row:2, index:1, king:false},
		b5:{color:"R", row:2, index:2, king:false},
		b7:{color:"R", row:2, index:3, king:false},

		c2:{color:"R", row:3, index:0, king:false},
		c4:{color:"R", row:3, index:1, king:false},
		c6:{color:"R", row:3, index:2, king:false},
		c8:{color:"R", row:3, index:3, king:false},

		d1:{color:"" , row:4, index:0, king:false},
		d3:{color:"" , row:4, index:1, king:false},
		d5:{color:"" , row:4, index:2, king:false},
		d7:{color:"" , row:4, index:3, king:false},

		e2:{color:"" , row:5, index:0, king:false},
		e4:{color:"" , row:5, index:1, king:false},
		e6:{color:"" , row:5, index:2, king:false},
		e8:{color:"" , row:5, index:3, king:false},

		f1:{color:"B", row:6, index:0, king:false},
		f3:{color:"B", row:6, index:1, king:false},
		f5:{color:"B", row:6, index:2, king:false},
		f7:{color:"B", row:6, index:3, king:false},

		g2:{color:"B", row:7, index:0, king:false},
		g4:{color:"B", row:7, index:1, king:false},
		g6:{color:"B", row:7, index:2, king:false},
		g8:{color:"B", row:7, index:3, king:false},

		h1:{color:"B", row:8, index:0, king:false},
		h3:{color:"B", row:8, index:1, king:false},
		h5:{color:"B", row:8, index:2, king:false},
		h7:{color:"B", row:8, index:3, king:false},
	},

	selected: {},

	enemyAhead: false,

	redEnemyNear: [],

	blackEnemyNear: [],

	kingEnemyNear: [],

	rows: {
		1:["a2","a4","a6","a8"],
		2:["b1","b3","b5","b7"],
		3:["c2","c4","c6","c8"],
		4:["d1","d3","d5","d7"],
		5:["e2","e4","e6","e8"],
		6:["f1","f3","f5","f7"],
		7:["g2","g4","g6","g8"],
		8:["h1","h3","h5","h7"],
	},

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
		kingDisplay:"<div data-color='red' class='red'>&#9733;</div>",
	},
	black: {
		pieces:12,
		display:"<div data-color='black' class='black'></div>",
		kingDisplay:"<div data-color='black' class='black'>&#9734;</div>",
	},

	/*=-=-=-=-=-=-=-=-=-=-=-=-=-= Dom Functions =-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
	
	getPosition: function(click){
		return $(click).data("position");
	},

	toggleSelected: function(pos) {
		$("[data-position=" + pos + "]").children().toggleClass("selected");
	},

	removePiece: function(pos) {
		$("[data-position=" + pos + "]").children().remove();
		this.state[pos].color = "";
		this.state[pos].king = false;
	},

	setPiece: function(pos) {
		var color;
		var king;
		this.selected.color === "red" ? color = "R" : color = "B";
		this.selected.king === true ? king = true : king = false;
		this.state[pos].color = color;
		this.state[pos].king = king;

		if(!this.state[pos].king){
			$("[data-position=" + pos + "]").append(this[this.selected.color].display);
		}else {
			$("[data-position=" + pos + "]").append(this[this.selected.color].kingDisplay);
		}
	},

	/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-= Checks =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/

	isOpen: function(pos) {
		return this.state[pos] != undefined && !(this.state[pos].color.length) ? true : false;
	},

	legalMove: function(position) {
		return this.legalSpaces.indexOf(position) > -1 ? true : false;
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
	isCaptured: function(color) {
		this[color].pieces -= 1;
	},
	isGameOver: function() {
		if ( !(this.red.pieces) ){
			alert('Black won!')
			return true;
		}
		if ( !(this.black.pieces) ){
			alert('Red won!')
			return true;
		}
		return false;
	},


	/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-= Selected State =-=-=-=-=-=-=-=-=-=-=-=-=-*/
	
	storeClick: function(pos,color) {
		this.selected.position = pos;
		this.selected.color = color;
		this.selected.row = this.state[pos].row;
		this.selected.index = this.state[pos].index;
		this.selected.king = this.state[pos].king;
	},

	clearClick: function() {
		this.selected = {
			color:"",
		};
	},

	selectedIsBlack: function() {
		return this.selected.color === "black" ? true : false;
	},
	selectedIsRed: function() {
		return this.selected.color === "red" ? true : false;
	},
	selectedIsKing: function() {
		return this.selected.king === true ? true : false;
	},


	/*=-=-=-=-=-=-=-=-=-=-=-=-=-=- Single Move -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/

	rowAbove: function(pos) {
		return this.selected.row == (this.state[pos].row + 1) ? true : false;
	},
	rowBelow: function(pos) {
		return this.selected.row == (this.state[pos].row - 1) ? true : false;
	},
	lastRowTop:function(pos) {
		return this.state[pos].row === 1 ? true : false;
	},
	lastRowBottom:function(pos) {
		return this.state[pos].row === 8 ? true : false;
	},
	evenRow: function() {
		return !(this.selected.row % 2) ? true : false;
	},
	singleMove: function(pos) {
		if( this.evenRow() ) {
			return this.selected.index == this.state[pos].index  || this.selected.index == (this.state[pos].index + 1) ? true : false;
		}
		if( !(this.evenRow()) ) {
			return this.selected.index == this.state[pos].index  || this.selected.index == (this.state[pos].index - 1) ? true : false;
		}		
		return false;
	},

	moveOneRow: function(pos) {
		if ( this.singleMove(pos) ){

			if ( !(this.selected.king) ) {

				if ( this.selectedIsBlack() && this.rowAbove(pos) )  {
					return true;
				}
				if ( this.selectedIsRed() && this.rowBelow(pos) )  {
					return true;
				}
			}
			if (this.selected.king && ( this.rowAbove(pos) || this.rowBelow(pos) ) ){
				return true;
			}
		}
		return false;
	},


	/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Jump Logic -=-=-=-=-=-=-=-=-=-=-=-=-=-*/
	clickIsJumpUp: function(pos) {
		return this.selected.row == (this.state[pos].row + 2) ? true : false;
	},
	clickIsJumpDown: function(pos) {
		return this.selected.row == (this.state[pos].row - 2) ? true : false;
	},

	jump: function(pos) {
		if ( this.opponentAhead() && this.jumpCheck(pos) && this.canJump(pos) ) {
			if ( this.clickIsJumpUp(pos) && this.selected.color === "black" ) {
				return true;
			}
			if ( this.clickIsJumpDown(pos) && this.selected.color === "red" ) {
				return true;
			}
			if (this.selected.king && ( this.clickIsJumpUp(pos) || this.clickIsJumpDown(pos) ) ) {
				return true;
			}
		}
	},

	capturedPosition: function(pos) {

		if ( this.selectedIsKing() ){

			if (this.state[pos].row > this.selected.row) {
				return this.state[pos].index >= this.selected.index ? this.kingEnemyNear[3].pos : this.kingEnemyNear[2].pos;
			}else {
				return this.state[pos].index >= this.selected.index ? this.kingEnemyNear[1].pos : this.kingEnemyNear[0].pos;
			}
		}
		if ( this.selectedIsBlack() ) {
			return this.state[pos].index >= this.selected.index ? this.redEnemyNear[1].pos : this.redEnemyNear[0].pos;
		}
		if ( this.selectedIsRed() ) {
			return this.state[pos].index >= this.selected.index ? this.blackEnemyNear[1].pos : this.blackEnemyNear[0].pos;
		}
	},
	canJump:function (pos) {
		return this.capturedPosition(pos) != undefined ? true : false;
	},

	jumps: function(){
		switch(this.selected.index) {
		    case 0:
		        return [1];
		        break;
		    case 1:
		        return [0,2];
		        break;
		    case 2:
		        return [1,3];
		        break;
		    case 3:
		        return [2];
		        break;
		}
	},

	jumpCheck: function(pos){
		return this.jumps().indexOf(this.state[pos].index) > -1 ? true : false;
	},

	checkNextRow: function(pos) {
		if ( this.evenRow() ){

			switch(pos) {
			    case 0:
			        return [0];
			        break;
			    case 1:
			        return [0,1];
			        break;
			    case 2:
			        return [1,2];
			        break;
			    case 3:
			        return [2,3];
			        break;
			}

		}else if( !this.evenRow() ){

			switch(pos) {
			    case 0:
			        return [0,1];
			        break;
			    case 1:
			        return [1,2];
			        break;
			    case 2:
			        return [2,3];
			        break;
			    case 3:
			        return [3];
			        break;
			}
		}
	},

	isNum:function(num){
		!isNaN(num) && num !== undefined ? true : false;
	},
	
	//Check two diaganol spaces to see if opponent is there
	opponentAhead: function() {
		this.blackEnemyNear = [];
		this.redEnemyNear = [];
		this.kingEnemyNear = [];
		var pos1 = '';
		var pos2 = '';
		var index1 = '';
		var index2 = '';
		var index3 = '';
		var index4 = '';
		var moves = [];
		var topRow = '';
		var bottomRow = '';
		var color = '';
		if ( this.selectedIsKing() ){

			this.selected.color === "red" ? color = "B" : color = "R";

			moves = this.checkNextRow(this.selected.index);
			index1 = moves[0];
			index2 = moves[1] ? moves[1] : false;

			if( this.selected.row != 1 ) {
				topRow = this.selected.row - 1;
				pos1 = this.rows[topRow][index1];				
				pos2 = index2 ? this.rows[topRow][index2] : false;
			}

			if ( this.selected.row != 8 ) {
				bottomRow = this.selected.row + 1;
				pos3 = this.rows[bottomRow][index1];
				pos4 = index2 ? this.rows[bottomRow][index2] : false;
			}

			if( pos1  && this.state[pos1].color === color ) {
				this.kingEnemyNear.push({
						pos:pos1,
						index:this.state[pos1].index,
				})
				check = true;
			}else {
				this.kingEnemyNear.push({});
			}

			if( pos2 && this.state[pos2].color === color ) {
				this.kingEnemyNear.push({
						pos:pos2,
						index:this.state[pos2].index,
				})
				check = true;
			}else {
				this.kingEnemyNear.push({});
			}

			if( pos3 && this.state[pos3].color === color ) {
				this.kingEnemyNear.push({
						pos:pos3,
						index:this.state[pos3].index,
				})
				check = true;
			}else {
				this.kingEnemyNear.push({});
			}
			
			if( pos4 && this.state[pos4].color === color ) {
				this.kingEnemyNear.push({
						pos:pos4,
						index:this.state[pos4].index,
				})
				check = true;
			}else {
				this.kingEnemyNear.push({});
			}

			return check ? true : false;
			
		}

		if ( this.selectedIsBlack() ){
			topRow = this.selected.row - 1;
			
			moves = this.checkNextRow(this.selected.index);
			index1 = moves[0];
			pos1 = this.rows[topRow][index1];
			index2 = moves[1] ? moves[1] : false;
			pos2 = index2 ? this.rows[topRow][index2] : false;

			if( this.state[pos1].color === "R" ) {
				this.redEnemyNear.push({
						pos:pos1,
						index:this.state[pos1].index,
				})
				check = true;
			}else {
				this.redEnemyNear.push({});
			}
			if ( pos2 && this.state[pos2].color === "R" ){
				this.redEnemyNear.push(
					{
						pos:pos2,
						index:this.state[pos2].index,
				})
				check = true;
			}else {
				this.redEnemyNear.push({});
			}

			return check ? true : false;

		}

		if ( this.selectedIsRed() ){
			bottomRow = this.selected.row + 1;
			
			moves = this.checkNextRow(this.selected.index);
			index1 = moves[0];
			pos1 = this.rows[bottomRow][index1];
			index2 = moves[1] ? moves[1] : false;
			pos2 = index2 ? this.rows[bottomRow][index2] : false;

			if( pos1 && this.state[pos1].color === "B" ) {
				this.blackEnemyNear.push({
						pos:pos1,
						index:this.state[pos1].index,
				})
				check = true;
			}else {
				this.blackEnemyNear.push({});
			}
			if ( pos2 && this.state[pos2].color === "B" ){
				this.blackEnemyNear.push(
					{
						pos:pos2,
						index:this.state[pos2].index,
				})
				check = true;
			}else {
				this.blackEnemyNear.push({});
			}

			return check ? true : false;

		}

	},

	canJumpAgain: function() {
		//After jump, Check to see if can jump again.
		//All Jumps must been taken.
	},

	makeKing: function(pos) {
		if( (this.selectedIsRed() && this.lastRowBottom(pos)) || (this.selectedIsBlack() && this.lastRowTop(pos)) ){
			this.selected.king = true;
		}
		return false;
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
	redPiece.append(board.red.display);
});

//Putting the Black pieces on the board.
$.each(board.setup.blackStart, function(key,val) {
	var blackPiece = $("div").find("[data-position='" + val + "']");
	blackPiece.append(board.black.display);
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
	if ( board.legalMove(pos) && !(board.selected.position) && !(board.isOpen(pos)) ){

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
	*	Allow player to switch piece.
	*/
	if( !(board.isOpen(pos)) && board.legalMove(pos) && board.selected.color === board.getColor(pos) ){
		//Turn off selected state of previous piece
		board.toggleSelected(board.selected.position);
		//Store new piece position
		board.storeClick(pos,board.selected.color);
		//Toggle selected state for new piece.
		board.toggleSelected(pos);
		return;
	}

	//Piece selected && click on open space && Legal position && Valid Move.
	if( board.selected.position && board.isOpen(pos) && board.legalMove(pos) && board.moveOneRow(pos) ) {

		board.makeKing(pos);

		//Clear previous position
		board.removePiece(board.selected.position);

		//Set piece in new position.
		board.setPiece(pos);

		//Clear Selected Object.
		board.clearClick();
		//Switch turn to next player.
		board.toggleTurn();

		//Check if game is over.
		board.isGameOver();

	}

	if( board.selected.position && board.isOpen(pos) && board.legalMove(pos) && board.jump(pos) ) {

		//Clear previous position
		board.removePiece(board.selected.position);

		//Remove Captured piece from piece count.
		board.isCaptured( board.getColor( board.capturedPosition(pos) ) );

		//Remove jumped piece.
		board.removePiece(board.capturedPosition(pos));

		//Reached other side ? Make king : No.
		board.makeKing(pos);

		//Set piece in new position.
		board.setPiece(pos);

		//Clear Selected Object.
		board.clearClick();
		//Switch turn to next player.
		board.toggleTurn();

		//Check if game is over.
		board.isGameOver();

	}

});