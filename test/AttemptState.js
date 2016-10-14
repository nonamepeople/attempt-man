import AttemptState from '../src/attempt-state';

import { assert } from 'chai';

describe('AttemptState', () => {
	describe('#constructor', () => {
		it('should be successful by default.', () => {
			var state = new AttemptState();

			assert.isTrue(state.successful);
			assert.isNull(state.error);
		});

		it('should mark it as failed when an error given.', () => {
			var error = {};

			var state = new AttemptState(error);

			assert.isFalse(state.successful);
			assert.equal(state.error, error);
		});
	});
});