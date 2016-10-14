import AttemptState from '../../src/attempt-state';
import AttemptsFailedError from '../../src/exceptions/attempts-failed';

import { assert } from 'chai';

describe('AttemptsFailedError', () => {
	describe('#getLastError', () => {
		it('should return the error of the last attempts that in the \'attempts\'collection.', () => {
			var error = new Error();
			var attempts = [
				new AttemptState(new Error()),
				new AttemptState(new Error()),
				new AttemptState(error),
			];

			var attemptsFailed = new AttemptsFailedError(attempts);

			assert.equal(attemptsFailed.getLastError(), error);
		});
	});
});