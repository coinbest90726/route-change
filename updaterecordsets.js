var args = process.argv;
var aws = require('aws-sdk');
aws.config.loadFromPath('./config/aws.json');
var route53 = new aws.Route53();
var lineReader = require('line-reader');
var sleep = require('sleep');

function validateIPaddress(ipaddress) 
{
     if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(myForm.emailAddr.value))
     {
       return (true);
     }
     console.log("You have entered an invalid IP address!");
     return (false);
}


lineReader.eachLine('./src/zones.txt', function(line, last) {

    var newZone = args.pop();
    if(!validateIPaddress(newZone)){
      return false;
    }

    console.log(line);
    var recordparams = {
        HostedZoneId: line,
    }
    sleep.sleep(1);
    route53.listResourceRecordSets(recordparams, function(err, data) {
        if (err) console.log(err, err.stack);
        else {
            for (var j in data.ResourceRecordSets) {

                if (data.ResourceRecordSets[j].Type == 'A') {

                    for (var k in data.ResourceRecordSets[j].ResourceRecords) {
                        if (data.ResourceRecordSets[j].ResourceRecords[k].Value == '212.0.105.180') {
                            name = data.ResourceRecordSets[j].Name;
                            console.log(name);
                            console.log("hostedzone: ", line);
                            console.log(data.ResourceRecordSets[j]);
                            var delparams = {
                                "ChangeBatch": {
                                    "Changes": [{
                                        "Action": 'UPSERT',
                                        "ResourceRecordSet": {
                                            "Name": data.ResourceRecordSets[j].Name,
                                            "Type": data.ResourceRecordSets[j].Type,
                                            "TTL":  data.ResourceRecordSets[j].TTL,
                                            "ResourceRecords": [ 
                                                { 
                                                    "Value": newZone 
                                                } 
                                            ] 
                                        }
                                    }],
                                    "Comment": 'Migration'
                                },
                                "HostedZoneId": line
                            };

                            console.log(delparams);


                            route53.changeResourceRecordSets(delparams, function(err, data) {
                                if (err) console.log(err, err.stack);
                                else {
                                    console.log(data);
                                }
                            });
                        }
                    }
                }
            }
        }
    });
})
