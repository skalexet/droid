import Trait from '../Trait.js';
import Stomper from '../traits/Stomper.js';
import CheckPoint from '../CheckPoint.js';

const COIN_LIFE_THRESHOLD = 100;

export default class Player extends Trait { // extends by proto
	constructor() {
		super('player');
		this.name = 'UNNAMED'; // named
		this.coins = 0;
		this.lives = 3;
		this.score = 0;
		this.checkPoint = new CheckPoint();
	}

	addCoins(count) {
		this.coins += count;
		this.queue(entity => entity.sounds.add('coin'));
		while (this.coins >= COIN_LIFE_THRESHOLD) {
			this.addLives(1);
			this.coins -= COIN_LIFE_THRESHOLD;
		}
	}

	addLives(count) {
		this.lives += count;
	}
}
