import {findPlayers} from '../player.js';
import Player from '../traits/Player.js';

function getPlayer(entities) {
	for (const entity of findPlayers(entities)) {
		return entity;
	}
}

export function createPlayerProgressLayer(font, level) {
	const size = font.size;
	
	const spriteBuffer = document.createElement('canvas'); //creates the new canvas
	spriteBuffer.width = 32; //
	spriteBuffer.height = 32; // 
	const spriteBufferContext = spriteBuffer.getContext('2d');
    
	return function drawPlayerProgress(context) {
		const entity = getPlayer(level.entities);
		const player = entity.traits.get(Player);
		font.print('D R O I D ' + level.name, context, size * 22, size * 22);
		font.print('LEVEL ' + level.name, context, size * 14, size * 14);

		spriteBufferContext.clearRect(0, 0, 
			spriteBuffer.width, spriteBuffer.height);
		entity.draw(spriteBufferContext);
		context.drawImage(spriteBuffer, size * 12, size * 15);
	};
}