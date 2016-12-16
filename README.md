# checkers

TODO

1) If a player is able to make a capture, there is no option -- the jump must be made. If more than one capture is available, the player is free to choose whichever he or she prefers.(Jump must be in same direction if not a king)
	*after jump check if another jump is possible.
	*if so - set turn toggleturn back and set selected state of last position.
	*repeat until no more jumps.

2) Game Over - I have check for if all pieces are gone but not checking if all pieces left are blocked in(checkmate).
