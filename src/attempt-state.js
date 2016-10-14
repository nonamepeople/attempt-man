class AttemptState {
	/**
	 * Create a new Attempt State.
	 */
	constructor (error = null) {
		this.successful = error ? false : true;
		this.error = error;
	}
}

export default AttemptState;