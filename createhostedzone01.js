var aws = require('aws-sdk');
var lineReader = require('line-reader');
var route53 = new aws.Route53();
var sleep = require('sleep');
lineReader.eachLine('/home/........./domains.txt', function(line, last)
    var params = {
        CallerReference: line,
        Name: line
    };

    route53.createHostedZone(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
    })
    sleep.sleep(5);
});

