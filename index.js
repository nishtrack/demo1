var express = require('express')
var app = express()
var fs = express("fs");
var webPush = require('web-push');
var bodyParser = require('body-parser')

app.set('port', (process.env.PORT || 5001))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
 console.log(fs);
response.sendfile('./index.html');
})

app.get('/amp', function(request, response) {
 console.log(fs);
response.sendfile('./apm.html');
})

app.get('/login', function(request, response) {
 console.log(fs);
response.sendfile('./login.html');
  //  response.redirect(301,'http://stackoverflow.com');
})

app.get('/:name', function(request, response) {

    var options = {
        root: __dirname + '/',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }; 

    var fileName = request.params.name;
    response.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
})

app.post("/send/push",function(request,response){
 webPush.sendNotification(req.body.endpoint, {
      payload: JSON.stringify({
        'title': req.body.title,
        'icon': req.body.icon,
        'body': req.body.body,
        'url': req.body.link
      }),
      userPublicKey: req.body.key,
      userAuth: req.body.authSecret,
    })
    .then(function() {
      console.log("sent push")
    res.send({"status":"sucess"});
    }, function(err) {
      console.log('webpusherr', err);
res.send({"status":"error","error":err});
    });
	
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})