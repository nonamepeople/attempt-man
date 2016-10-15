# attempt-man

Beautifully manage attempts for your process!

## Requirements

- Node.js >= 6.0.0

## Installation

Install via npm:

	npm install attempt-man

Import the `Attempt` class: 

~~~js
const Attempter = require('attempt-man').Attempter;
~~~

## Usage

### Create Attempt

If an exception is thrown in the callback function, it will keep start a new attempt within the allowed range.

Create and run an attempt and allow the attempts up to `5` times:

~~~js
let counter = 0;

new Attempter(5).run(() => {
	if (++counter <= 2) throw new Error();

	return 'Hello World! Counter: ' + counter;
}).then(result => {
	console.log(result);
});

// => 'Hello World! Counter: 3';
~~~

Here we can see the callback function has been executed thress times.

> Note: The `Attempter.run()` method is returns a Promise.
> The attempts will not be continued when there was no exception throws in the last attempt.

### Catch Errors

When all attempts fail, it will throws an `AttemptsFailedError`. Since the `run` method
is giving you a Promise, so you can catch it by the `catch` method.

~~~js
var AttemptsFailedError = require('attempt-man').AttemptsFailedError;

new Attempter().run(() => {
	throw new Error('foo');
}).catch(err => {
	console.log('Totally tried: ' + err.attempts.length);
	console.log('Last error: ' + err.getLastError().message);
});

// => Totally tried: 5
// => Last error: foo
~~~

##### Get the attempt state object.

You can get the `AttemptState` object by access the `attempts` array of the `AttemptsFailedError`.

~~~js
err.attempts[1].error;  // The first one.
err.attempts[2].error;  // The second one.
err.attempts[3].error;  // The third one.

// ...
~~~