var Client = require('./mpp-client-xt');
var client = new Client;
var url = Proxy
client.setChannel('lobby7');
client.start();
client.on("connect", () => (url, "connected"));
client.on("disconnect", () => (url, "disconnected"));
client.on('hi', () => {
	client.setName('⚽')
});

function randomSign() {
	let a = Math.random();
	if (a < 0.5) {
		return 1
	}
	return -1
}

function distance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}
let ground = 61;
let x = 50;
let y = 0;
let gravity = 1;
let xVelocity = 1;
let yVelocity = 2;
let bounceY = 0;
let bounceX = 0.3;
let scoreLeft = 0;
let scoreRight = 0;
let ellapsedTime = 0;
let botname = "⚽";
foo = setInterval(() => {
	ellapsedTime += 60;
	if (ellapsedTime > 10000) {
		client.sendArray([{}, ]);
		ellapsedTime = 0
	}
	yVelocity += gravity;
	x += xVelocity;
	y += yVelocity;
	if (y > ground) {
		y = ground;
		yVelocity = -bounceY * yVelocity;
		xVelocity = bounceX * xVelocity
	}
	if (y < 0) {
		y = 0;
		yVelocity = -bounceY * yVelocity
	}
	if (x < 0) {
		x = 0;
		xVelocity = -bounceX * xVelocity;
		scoreLeft += 1
	}
	if (x > 100) {
		x = 100;
		xVelocity = -bounceX * xVelocity;
		scoreRight += 1
	}
	client.sendArray([{
		m: 'm',
		x: x.toString(),
		y: y.toString()
	}])
}, 60);
client.on('m', function (msg) {
	if (distance(x, y, msg.x, msg.y) < 10) {
		xVelocity = -Math.sign(msg.x - x) * 5;
		yVelocity = 15
	}
})
