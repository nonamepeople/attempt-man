import Attempter from '../src/attempter';
import AttemptsFailedError from '../src/exceptions/attempts-failed';
import sinon from 'sinon';
import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

describe('Attempter', () => {
	describe('#run', () => {
		it('should call the given callback and return the value that the callback returns.', async () => {
			var attempter = new Attempter();
			var stub = sinon.stub().returns('foobar');

			var result = await attempter.run(stub);

			assert.equal(result, 'foobar');
			assert.isOk(stub.calledOnce, 'the callback should be called once.');
		});


		it('should throws the \'AttemptsFailedError\' exception when the failures up to the default maximum (3).', async () => {
			var attempter = new Attempter();
			var stub = sinon.stub().throws();

			await assert.isRejected(attempter.run(stub), AttemptsFailedError);

			assert.equal(stub.callCount, 5);
		});

		it('should throws the \'AttemptsFailedError\' exception when the failures up to the given maximum (5).', async () => {
			var attempter = new Attempter(5);
			var stub = sinon.stub().throws();

			await assert.isRejected(attempter.run(stub), AttemptsFailedError);

			assert.equal(stub.callCount, 5);
		});

		it('should call the callback multiple times until it succeeded when an exception throws within it.', async () => {
			var attempter = new Attempter();
			var error = new Error();
			var stub = sinon.stub();

			stub.onFirstCall().throws(error);
			stub.onSecondCall().throws(error);
			stub.onThirdCall().returns('foobar');

			var result = await attempter.run(stub);

			assert.equal(result, 'foobar');
		});

		it('should set the previous failed attempts to its \'attempts\' property.', async () => {
			var attempter = new Attempter();
			var error = new Error();
			var error2 = new Error();
			var stub = sinon.stub();

			stub.onFirstCall().throws(error);
			stub.onSecondCall().throws(error2);
			stub.onThirdCall().returns('foobar');

			await assert.eventually.equal(attempter.run(stub), 'foobar');

			assert.lengthOf(attempter.attempts, 2);
			assert.equal(attempter.attempts[0].error, error);
			assert.equal(attempter.attempts[1].error, error2);
		});

		it('should throws the AttemptsFailedError exception when all attempts failed.', async () => {
			var attempter = new Attempter();
			var stub = sinon.stub().throws();

			var error = await assert.isRejected(attempter.run(stub), AttemptsFailedError);

			assert.equal(error.attempts, attempter.attempts, 'the exception\'s attempts should be equal to the' +
			                                                 ' attempter\'s');
		});
	});
});