export class Matrix { // especially to the  Level.js
	constructor() {
		this.grid = []; // array of object with names of tiles
	}

	forEach(callback) { // put here the function 
		this.grid.forEach((column, x) => { // for each array from grid array at position x
			column.forEach((value, y) => { // for each object from column array at y 
				callback(value, x, y); // execute function that provided in args with val,x,y
			});
		});
	}

	delete(x, y) {
		const col = this.grid[x]; // then looking for same in objs from grid array  
		if (col) {
			delete col[y]; // if there is, then returns y line
		}
	}

	get(x, y) { // takes arguments
		const col = this.grid[x]; // then looking for same in objs from grid array  
		if (col) {
			return col[y]; // if there is, then returns y line
		}
		return undefined; // if isn't
	}

	set(x, y, value) { // given params, first is the number of range in JSON
		if (!this.grid[x]) { // if isn't >>...
			this.grid[x] = []; // ...create empty grid array
		}
		
		this.grid[x][y] = value; // then it's equals given value ( x, y, and tilename(str) )
	}
}

export class Vec2 { // object that exported to Entity.js 
	constructor(x, y) { //takes coordinates
		this.set(x, y); // and set it here
	}

	copy(vec2) {
		this.x = vec2.x;
		this.y = vec2.y;
	}

	set(x, y) {
		this.x = x;// (return later)
		this.y = y;
	}
}