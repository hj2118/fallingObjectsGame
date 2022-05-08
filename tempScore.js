class TempScore {
	constructor(scoreAmount, x) {
		this.amount = scoreAmount;
		this.position = createVector(x + 50, height - 200);
		this.lifespan = 100;
	}

	update() {
		this.lifespan -= 2;
	}

	display() {
		if (!this.isDead() && gameStart) {
			textFont(font, 24);
			text(this.amount, this.position.x, this.position.y);
		}
	}

	isDead() {
		if (this.lifespan < 0) {
			return true;
		}
		else {
			return false;
		}
	}
}
