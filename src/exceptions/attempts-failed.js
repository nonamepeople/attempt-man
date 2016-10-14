class AttemptsFailedError extends Error {
	/**
	 * Create a new AttemptsFailedError Exception.
	 */
	constructor (attempts) {
		super('All attempts failed.');

		this.attempts = attempts;
	}

	/**
	 * Get the error of the last attempts.
	 */
	getLastError () {
		let lastAttempt = this.attempts[this.attempts.length - 1];

		return lastAttempt.error;
	}
}

export default AttemptsFailedError;