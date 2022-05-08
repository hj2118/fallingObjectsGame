// temporary score appears when the character collects any item
class TempScore {
	constructor(scoreAmount, x) {
		this.amount = scoreAmount;	// the amount to be displayed
		this.position = createVector(x + 50, height - 200);	// position where the score to be displayed
		this.lifeTime = 100;
		this.dead = false;
	}

	update() {
		// decrease the lifeTime
		this.lifeTime -= 2;

		// if the lifeTime becomes less than 0, then it is dead
		if (this.lifeTime < 0) {
			this.dead = true;
		}
	}

	display() {
		// if not dead
		if (!this.dead) {
			// display the temporary score
			fill(139, 69, 19, this.lifeTime * 3);
			textFont(font, 24);
			text(this.amount, this.position.x, this.position.y);
		}
	}
}
