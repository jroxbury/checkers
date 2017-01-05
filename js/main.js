/*

================= BOARD SETUP =================

*/

//Select HTML entry point to build game board.
var dom = $("#checkerBoard");


var board = {

	//Current state of the board.
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

	//Current Selected Game Piece.
	selected: {},

	//Toggle if opponent in front.
	enemyAhead: false,

	//Store for near by opponent pieces.
	redEnemyNear: [],

	//Store for near by opponent pieces.
	blackEnemyNear: [],

	//Store for near by opponent pieces.
	kingEnemyNear: [],

	//Alternative reference for the rows.
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

	//Used to create the game board and set the pieces.
	setup: {
		row: ['a','b','c','d','e','f','g','h'],
		col: ['1','2','3','4','5','6','7','8'],
		redStart: ['a2','a4','a6','a8','b1','b3','b5','b7','c2','c4','c6','c8'],
		blackStart: ['f1','f3','f5','f7','g2','g4','g6','g8','h1','h3','h5','h7'],
	},
	
	//All the legal positions.
	legalSpaces: ["a2", "a4", "a6", "a8", "b1", "b3", "b5", "b7", "c2", "c4", "c6", "c8", "d1", "d3", "d5", "d7", "e2", "e4", "e6", "e8", "f1", "f3", "f5", "f7", "g2", "g4", "g6", "g8", "h1", "h3", "h5", "h7"],
	
	//Toggle for setting the board. Changes per row to have the checker board offset.
	reverse: '',
	//Toggle check for whos turn it is.
	turn: true,
	//Toggles to true if can jump again.
	jumping: false,

	//Keeping track of red pieces left and also the different html display for the red pieces.
	red: {
		pieces:12,
		display:"<div data-color='red' class='red'></div>",
		kingDisplay:"<div data-color='red' class='red'>&#9733;</div>",
	},
	//Keeping track of black pieces left and also the different html display for the black pieces.
	black: {
		pieces:12,
		display:"<div data-color='black' class='black'></div>",
		kingDisplay:"<div data-color='black' class='black'>&#9734;</div>",
	},

	/*=-=-=-=-=-=-=-=-=-=-=-=-=-= Dom Functions =-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
	
	/**
	 * Returns the data-position string attached to the clicked piece.
	 * 
	 * @param  object click The HTML div("game piece") clicked.
	 * @return string       Position of piece clicked. Ex: "a2"
	 */
	getPosition: function(click){
		return $(click).data("position");
	},

	/**
	 * Set "selected" class(For display purposes)
	 * 
	 * @param  string pos Position clicked.
	 * @return null
	 */
	toggleSelected: function(pos) {
		$("[data-position=" + pos + "]").children().toggleClass("selected");
	},

	/**
	 * Remove piece from HRML board and clears piece from JS object.
	 * 
	 * @param  string pos Position clicked.
	 * @return null
	 */
	removePiece: function(pos) {
		$("[data-position=" + pos + "]").children().fadeOut();
		this.state[pos].color = "";
		this.state[pos].king = false;
	},

	/**
	 * To display game messages / alerts.
	 * 
	 * @param string selector Where in the HTML to append the message.
	 * @param string msg      The game message / Alert to show.
	 */
	addMsg: function(selector,msg){
		$(selector).append(msg);
	},

	/**
	 * Remove the game message / alert after 2 seconds of being displayed.
	 * 
	 * @param  string selector Location where the message was appended.
	 * @return null
	 */
	removeMsg: function(selector) {
		setTimeout(function(){
		    $(selector).children().fadeOut();
		},2000)
	},
	
	/**
	 * After a player move, set the game piece in the new position.
	 * 
	 * @param string pos New position clicked.
	 */
	setPiece: function(pos) {
		var color;
		var king;
		this.selectedIsRed() ? color = "R" : color = "B";
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

	/**
	 * Checks if the click is an open space on the board.
	 * 
	 * @param  string  pos Position clicked.
	 * @return Boolean
	 */
	isOpen: function(pos) {
		return this.state[pos] != undefined && !(this.state[pos].color.length) ? true : false;
	},

	/**
	 * Make sure the click is a legal position, checks board.legalSpaces array.
	 * 
	 * @param  string pos Position Clicked
	 * @return Boolean
	 */
	legalMove: function(pos) {
		return this.legalSpaces.indexOf(pos) > -1 ? true : false;
	},

	/**
	 * Checks which players turn it is. Red or Black.
	 * 
	 * @param  string color Color of current selected piece.
	 * @return string       Returns the current players color.
	 */
	checkTurn: function(color) {
		if (this.turn && color == "black") {
			return "black";
		}
		if (!this.turn && color == "red") {
			return "red";
		}
	},

	/**
	 * Checks the board.state for the color of the position clicked.
	 * 
	 * @param  string pos Position clicked.
	 * @return string    Returns the color of the position clicked.
	 */
	getColor: function (pos){
		if( this.state[pos] != undefined && this.state[pos].color.length){
			return this.state[pos].color === "R" ? "red" : "black";
		}
	},

	/**
	 * Toggles the board.state to the next player.
	 * 
	 * @return Boolean Toggles board.turn.
	 */
	toggleTurn: function(){
		return this.turn === true ? this.turn = false : this.turn = true;
	},

	/**
	 * Subtracts from the board.state for the color captured.
	 * 
	 * @param  string  color The color of the piece that was jumped over.
	 * @return null.
	 */
	isCaptured: function(color) {
		this[color].pieces -= 1;
	},

	/**
	 * If Red/Black runs out of pieces, the game is over.
	 * 
	 * @return Boolean Returns false unless one players loses all pieces.
	 */
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
	
	/**
	 * Stores info of current selected piece.
	 * 
	 * @param  string   pos   Position clicked.
	 * @param  string	color Color of position clicked.
	 * @return null
	 */
	storeClick: function(pos,color) {
		this.selected.position = pos;
		this.selected.color = color;
		this.selected.row = this.state[pos].row;
		this.selected.index = this.state[pos].index;
		this.selected.king = this.state[pos].king;
	},

	/**
	 * Clears the "Selected" Object.
	 * 
	 * @return null
	 */
	clearClick: function() {
		this.selected = {
			color:"",
		};
	},

	/**
	 * Checks if selected piece is black.
	 * 
	 * @return Boolean True if selected piece is black otherwise false.
	 */
	selectedIsBlack: function() {
		return this.selected.color === "black" ? true : false;
	},

	/**
	 * Checks if selected piece is red.
	 * 
	 * @return Boolean True if selected piece is red otherwise false.
	 */
	selectedIsRed: function() {
		return this.selected.color === "red" ? true : false;
	},

	/**
	 * Checks if selected piece is a King.
	 * 
	 * @return Boolean True if selected piece is a King otherwise false.
	 */
	selectedIsKing: function() {
		return this.selected.king === true ? true : false;
	},

	/**
	 * If player makes it to the last row, The piece is transformed into a King.
	 * 
	 * @param  string pos Position clicked.
	 * @return Boolean    Sets the King switch for the selected piece.
	 */
	makeKing: function(pos) {
		if( (this.selectedIsRed() && this.lastRowBottom(pos)) || (this.selectedIsBlack() && this.lastRowTop(pos)) ){
			this.selected.king = true;
		}
		return false;
	},


	/*=-=-=-=-=-=-=-=-=-=-=-=-=-=- Single Move -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/

	/**
	 * Returns True if the click is the row above the selected piece.
	 * 
	 * @param  string pos Position clicked.
	 * @return Boolean
	 */
	rowAbove: function(pos) {
		return this.selected.row == (this.state[pos].row + 1) ? true : false;
	},

	/**
	 * Returns True if the click is the row below the selected piece.
	 * 
	 * @param  string pos Position clicked.
	 * @return Boolean
	 */
	rowBelow: function(pos) {
		return this.selected.row == (this.state[pos].row - 1) ? true : false;
	},

	/**
	 * Returns True if click is the last row (Row 1)
	 * 
	 * @param  string pos Position clicked.
	 * @return Boolean
	 */
	lastRowTop:function(pos) {
		return this.state[pos].row === 1 ? true : false;
	},

	/**
	 * Returns True if click is the last row (Row 8)
	 * 
	 * @param  string pos Position clicked.
	 * @return Boolean
	 */
	lastRowBottom:function(pos) {
		return this.state[pos].row === 8 ? true : false;
	},

	/**
	 * Returns True if the piece selected is currently within an even row.
	 * 
	 * @return Boolean
	 */
	evenRow: function() {
		return !(this.selected.row % 2) ? true : false;
	},

	/**
	 * Helper function for singleMove. Checks to make sure click is one of the two legal diagonal moves.
	 * 
	 * @param  string pos Position clicked.
	 * @return Boolean
	 */
	isDiagnoal: function(pos) {
		if( this.evenRow() ) {
			//If selected.index is same index as click or click index plus 1.
			return this.selected.index == this.state[pos].index || (this.state[pos].index + 1) ? true : false;
		}
		if( !(this.evenRow()) ) {
			//If selected.index is same index as click or click index minus 1.
			return this.selected.index == this.state[pos].index || (this.state[pos].index - 1) ? true : false;
		}		
		return false;
	},

	/**
	 * Returns True if the click for a single move is legal.
	 * Checks that is one of the two legal diagonal positions.
	 * Checks based on Color/King Which direction the piece can move.
	 * 
	 * @param  string pos Position clicked.
	 * @return Boolean
	 */
	singleMove: function(pos) {
		if ( this.isDiagnoal(pos) ){

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

	/**
	 * Returns True if the click is a legal jump upwards.
	 * 
	 * @param  string pos Position clicked.
	 * @return Boolean
	 */
	clickIsJumpUp: function(pos) {
		return this.selected.row == (this.state[pos].row + 2) ? true : false;
	},

	/**
	 * Returns True if the click is a legal jump downwards.
	 * 
	 * @param  string pos Position clicked.
	 * @return Boolean
	 */
	clickIsJumpDown: function(pos) {
		return this.selected.row == (this.state[pos].row - 2) ? true : false;
	},

	jump: function(startIndex,pos) {
		if ( this.opponentAhead() && this.jumpCheck(startIndex,pos) && this.canJump(pos) ) {
			if ( this.clickIsJumpUp(pos) && this.selectedIsBlack() ) {
				return true;
			}
			if ( this.clickIsJumpDown(pos) && this.selectedIsRed() ) {
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

	/**
	 * Returns an array of the possible jump indexes based on the current position.
	 * 
	 * @param  number startIndex The current position of the selected game piece.
	 * @return array            The next available jump positions if possible.
	 */
	jumps: function(startIndex){
		switch(startIndex) {
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

	/**
	 * Checks to see if clicked position is in the array of next available jumps positions.
	 * 
	 * @param  number startIndex Current selected game piece index position.
	 * @param  string pos        Position clicked.
	 * @return Boolean            True or false if can jump.
	 */
	jumpCheck: function(startIndex,pos){
		return this.jumps(startIndex).indexOf(this.state[pos].index) > -1 ? true : false;
	},

	/**
	 * Helper function for canJumpAgain().
	 * Checks the spots in the next row to see if clear to jump again.
	 * 
	 * @param  array jumpRow   This is the next available row to jump to if possible.
	 * @param  array nextJumps An array from jumps() - returns the next possible jump indexed based on current position.
	 * @return Boolean          ture or false if there is more available jumps.
	 */
	checkNextJumpSpots: function(jumpRow,nextJumps) {

		//Check to see that there is a row available to jump to.
		if (nextJumps.length > 0) {
			var check = false;
			for(x in this.state){

				//jumpRow is the next row that can be jumped to.
				if (this.state[x].row == jumpRow) {

					var i = 0;
					//nextJumps is array of possible jumps based on current position.
					for ( ; i < nextJumps.length; i++){

						//Check the board state for available jumps position.
						if ( board.state[x].index == nextJumps[i] ) {

							//If the available position is open. Then yuo can jump there.
							if ( board.state[x].color === "" ) {
								console.log(board.state[x]);
								check = true;
							}
						}
					}

				}
			}
		}
		//Return true if more possible jumps, otherwise false.
		return check ? true : false;
	},

	canJumpAgain: function(pos) {
		var jumpRow = '';
		console.log('Can I jump again?');
		console.log(this.jumps(this.state[pos].index) + ' Next jump indexes');

		if ( this.selectedIsKing() ) {

		} else if ( this.selectedIsRed() ) {

			jumpRow = this.state[pos].row + 2;

		} else if ( this.selectedIsBlack() ) {

			jumpRow = this.state[pos].row - 2;
		}
		
		if ( this.opponentAhead() && this.checkNextJumpSpots( jumpRow, this.jumps(this.state[pos].index) ) ){
			console.log('Yes I can jump again');
			return true;
			
		}
		return false;
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
		var pos3 = '';
		var pos4 = '';
		var index1 = '';
		var index2 = '';
		var index3 = '';
		var index4 = '';
		var moves = [];
		var topRow = '';
		var bottomRow = '';
		var color = '';
		var check = false;
		if ( this.selectedIsKing() ){

			this.selectedIsRed() ? color = "B" : color = "R";

			moves = this.checkNextRow(this.selected.index);
			index1 = moves[0];
			index2 = moves[1] ? moves[1] : false;

			if( this.selected.row != 1 ) {
				
				topRow = this.selected.row - 1;

				if (moves.length != 2 && this.selected.index == 0){
					index2 = moves[0];
					pos2 = this.rows[topRow][index2];
				}else {
					pos1 = this.rows[topRow][index1];				
					pos2 = index2 ? this.rows[topRow][index2] : false;
				}
			}

			if ( this.selected.row != 8 ) {
				bottomRow = this.selected.row + 1;

				if (moves.length != 2 && this.selected.index == 0){
					
					index2 = moves[0];
					pos4 = this.rows[bottomRow][index2];

				}else {

					pos3 = this.rows[bottomRow][index1];
					pos4 = index2 ? this.rows[bottomRow][index2] : false;
				}
			}

			if( pos1 && this.state[pos1].color === color ) {
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

			if (moves.length != 2 && this.selected.index == 0){
				index2 = moves[0];
				pos2 = this.rows[topRow][index2];
			}else {
				index1 = moves[0];
				pos1 = this.rows[topRow][index1];
				index2 = moves[1] ? moves[1] : false;
				pos2 = index2 ? this.rows[topRow][index2] : false;
			}
			

			if( pos1 && this.state[pos1].color === "R" ) {
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

			if (moves.length != 2 && this.selected.index == 0){
				index2 = moves[0];
				pos2 = this.rows[bottomRow][index2];
			}else {
				index1 = moves[0];
				pos1 = this.rows[bottomRow][index1];
				index2 = moves[1] ? moves[1] : false;
				pos2 = index2 ? this.rows[bottomRow][index2] : false;
			}

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

	console.log(typeof(_click))
	console.log(_click)
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
	if( !(board.isOpen(pos)) && board.legalMove(pos) && (board.selected.color === board.getColor(pos)) && !board.jumping ){
		//Turn off selected state of previous piece
		board.toggleSelected(board.selected.position);
		//Store new piece position
		board.storeClick(pos,board.selected.color);
		//Toggle selected state for new piece.
		board.toggleSelected(pos);
		return;
	}

	//Piece selected && click on open space && Legal position && Valid Move.
	if( board.selected.position && board.isOpen(pos) && board.legalMove(pos) && board.singleMove(pos) ) {

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

	if( board.selected.position && board.isOpen(pos) && board.legalMove(pos) && board.jump(board.selected.index,pos) ) {

		//Clear previous position
		board.removePiece(board.selected.position);

		//Remove Captured piece from piece count.
		board.isCaptured( board.getColor( board.capturedPosition(pos) ) );

		//Remove Captured piece from board.
		board.removePiece(board.capturedPosition(pos));

		//Reached other side ? Make king : No.
		board.makeKing(pos);

		//Set piece in new position.
		board.setPiece(pos);

		//JUMP AGAIN?????
		if ( board.canJumpAgain(pos) ) {
			console.log('Jump Again')

			//Store new piece position
			board.storeClick(pos,board.selected.color);

			//Toggle selected state for new piece.
			board.toggleSelected(pos);

			board.jumping = true;

			return;
		}
		//???????????????
		
		board.jumping = false;
		
		//Clear Selected Object.
		board.clearClick();

		//Switch turn to next player.
		board.toggleTurn();

		//Check if game is over.
		board.isGameOver();

	}

});