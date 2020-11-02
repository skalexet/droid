 export default class CheckPoint {
    constructor() {
        this.player;
        this.control;
        this.level;
        this.maxPos = 0;
        this.storedPoints = new Map();
    }
    
    checkPos() {
        if (this.player.pos.x > this.maxPos) {
            this.maxPos = this.player.pos.x;
        }
         
        for (let point of this.level.checkPoints) {
            
            if (this.player.pos.x > point.reach) {
                if (!this.storedPoints.has(`reached ${point.reach}`)) {
                    this.storedPoints.set(`reached ${point.reach}`);
                    this.savePoint(point.x, point.y);
                }
            }
        }

    }

    savePoint(x, y) {
        this.control.checkpoint.set(x, y);
        console.log(`saved at ${x} and ${y}`);
    }
}