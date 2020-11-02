import Player from '../traits/Player.js';
import LevelTimer from '../traits/LevelTimer.js';
import {findPlayers} from '../player.js';

function getPlayerTrait(entities) {
	for (const entity of findPlayers(entities)) {
		return entity.traits.get(Player);
	}
}

function getTimerTrait(entities) {
	for (const entity of entities) {
		if (entity.traits.has(LevelTimer)) {
			return entity.traits.get(LevelTimer);
		}
	}
}

export function createDashboardLayer(font, level) {  
	const LINE1 = font.size;
	const LINE2 = font.size * 2;

	const timerTrait = getTimerTrait(level.entities);

	return function drawDashboard(context) {
		const playerTrait = getPlayerTrait(level.entities);
		if (playerTrait) {
			font.print('D/A - move', context, 152, LINE1);
			font.print('SPACE - jump', context, 152, LINE2);
			font.print('S - run', context, 8, LINE2);
			font.print('ENTER - fight', context, 8, LINE1);
		}
	};
}