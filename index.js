var express = require('express')
var app = express();
var fs = express("fs");
var webpush = require('web-push');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json());

app.use(cors());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type','Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



app.set('port', (process.env.PORT || 5001))
app.use(express.static(__dirname + '/public'))

app.get('/', function (request, response) {
	console.log(fs);
	response.sendfile('./index.html');
})

app.get('/amp', function (request, response) {
	console.log(fs);
	response.sendfile('./apm.html');
})

app.get('/login', function (request, response) {
	console.log(fs);
	response.sendfile('./login.html');
	//  response.redirect(301,'http://stackoverflow.com');
});

//app.get('/:name', function(request, response) {
//
//    var options = {
//        root: __dirname + '/',
//        headers: {
//            'x-timestamp': Date.now(),
//            'x-sent': true
//        }
//    }; 
//
//    var fileName = request.params.name;
//    response.sendFile(fileName, options, function (err) {
//        if (err) {
//            console.log(err);
//        } else {
//            console.log('Sent:', fileName);
//        }
//    });
//})

app.post("/sendnotification", function (req, res) {
	webpush.setGCMAPIKey('AIzaSyBgtX_-6hCWfshS4xyUVq-pNPYEM0GXNGo');
	var pushSubscription = {
		endpoint: req.body.endpoint,
		keys: {
			auth: req.body.authSecret,
			p256dh: req.body.key
		}
	}
	webpush.sendNotification(pushSubscription, JSON.stringify({
		'title': req.body.title,
		'icon': req.body.icon,
		'body': req.body.body,
		'url': req.body.link
	}))
	.then(function () {
		console.log("sent push")
		res.send({
			"status": "sucess"
		});
	}, function (err) {
		console.log('webpusherr', err);
		res.send({
			"status": "error",
			"error": err
		});
	});



});

app.get("/vapidkeys",function(req,res){
	const vapidKeys = webpush.generateVAPIDKeys();
	res.send(vapidKeys);
});


app.post("/ampsendnotification", function (req, res) {
	webpush.setGCMAPIKey('JuudbNLmjGby75Va6UpO7GOfSK8HOZY4oGpWP-ZhEWE');
	var pushSubscription = {
		endpoint: req.body.endpoint,
		keys: {
			auth: req.body.authSecret,
			p256dh: req.body.key
		}
	}
	webpush.sendNotification(pushSubscription, JSON.stringify({
		'title': req.body.title,
		'icon': req.body.icon,
		'body': req.body.body,
		'url': req.body.link
	}))
	.then(function () {
		console.log("sent push")
		res.send({
			"status": "sucess"
		});
	}, function (err) {
		console.log('webpusherr', err);
		res.send({
			"status": "error",
			"error": err
		});
	});



});



app.listen(app.get('port'), function () {
	console.log("Node app is running at localhost:" + app.get('port'))
})
