export function createSpriteLayer(entities, width = 64, height = 64) { //esp tothe loaders
	const spriteBuffer = document.createElement('canvas'); //creates the new canvas
	spriteBuffer.width = width; //
	spriteBuffer.height = height; // 
	const spriteBufferContext = spriteBuffer.getContext('2d');

	return function drawSpriteLayer(context, camera) {  
		entities.forEach(entity => {  
			if(entity.pos.y > camera.size.y 
				|| entity.pos.x > camera.pos.x + camera.size.x) {
				return;
			}
			
			spriteBufferContext.clearRect(0, 0, width, height);  

			entity.draw(spriteBufferContext); 

			context.drawImage(
				spriteBuffer,
				Math.floor(entity.pos.x - camera.pos.x),
				Math.floor(entity.pos.y - camera.pos.y)); 
	    });										
	};
}		