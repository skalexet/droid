export default class EntityCollider { //esp. to Level.js
	constructor(entities) {
		this.entities = entities;
	}

	check(subject) {
		this.entities.forEach(candidate => {
			if (subject === candidate) {
				return;
			}

			if (subject.bounds.overlaps(candidate.bounds)) {
				subject.collides(candidate);
			}
		});
	}
}