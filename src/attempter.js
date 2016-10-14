import AttemptState from './attempt-state';
import AttemptsFailedError from './exceptions/attempts-failed';

class Attempter {
	/**
	 * Create a new Attempter object.
	 */
	constructor (maxAttempts = 5) {
		this.attempts = [];
		this.maxAttempts = maxAttempts;
	}

	/**
	 * Run the attempt.
	 */
	async run (callback) {
		for (let attempts = 1; attempts <= this.maxAttempts; attempts++) {
			try {
				return await callback();
			} catch (err) {
				this.attempts.push(new AttemptState(err));

				if (attempts >= this.maxAttempts) {
					throw new AttemptsFailedError(this.attempts);
				}
			}
		}
	}
}

export default Attempter;