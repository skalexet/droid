function createEntityLayer(entities) {
	return function drawBoundingBox(context, camera) {
		context.strokeStyle = 'red'; //same as above
		entities.forEach(entity => {
			context.beginPath();
			context.rect(
				entity.bounds.left - camera.pos.x,  
				entity.bounds.top - camera.pos.y, // pay attention to camera object
				entity.size.x, entity.size.y); // 
			context.stroke(); // stroke it
		});
	}
}

function createTileCandidateLayer(tileResolver) {
	const resolvedTiles = []; // create array

	const tileSize = tileResolver.tileSize; // obvius

	const getByIndexOriginal = tileResolver.getByIndex; // save func that returns tile with parms
	tileResolver.getByIndex = function getByIndexFake(x, y) { // redefine func to fake
		resolvedTiles.push({x, y}); // that pushes object with x and y to the array above
		return getByIndexOriginal.call(tileResolver, x, y); // and returns call of original func
	} 

	return function drawTileCandidates(context, camera) {
		context.strokeStyle = 'blue'; // param 
		resolvedTiles.forEach(({x, y}) => { // each obj from above with x & y >>
			context.beginPath();  			// starting path, line to draw or something 
			context.rect(	//
				x * tileSize - camera.pos.x, 
				y * tileSize - camera.pos.y, // pay attention to camera pos
				tileSize, 
				tileSize);			// draws rectangle with given size and coords 
			context.stroke(); // provide it in action
		});

		resolvedTiles.length = 0;
	}
}

export function createCollisionLayer(level) { // esp. to the main (Level obj)
	
	const drawTileCandidates = level.tileCollider.resolvers.map(createTileCandidateLayer);
	const drawBoundingBoxes = createEntityLayer(level.entities);

	return function drawCollision(context, camera) {
		drawTileCandidates.forEach(draw => draw(context, camera));
		drawBoundingBoxes(context, camera);
	};
}