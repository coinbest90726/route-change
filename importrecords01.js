var execsync = require('exec-sync');
var fs = require('fs');
var aws = require('aws-sdk');
var route53 = new aws.Route53();
var dirname = '/home/......../dns/'

route53.listHostedZones({}, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
        console.log(data.NextMarker);
        marker = data.NextMarker;
        var nextparams = {
            Marker: marker
        }
        fs.readdir(dirname, function(err, filenames) {
            if (err) console.log(err)
            
            filenames.forEach(function(filename) {
                fs.readFile(dirname + filename, 'utf-8', function(err, content) {
                    if (err) console.log(err)
                    
                    file = filename.replace(/\.[^/.]+$/, "") + "."
                    
                    for (var i in data.HostedZones) {
                        zone = data.HostedZones[i].Name
                        if (file == zone) {
                            var dns = file + "dns"
                            console.log("Name matched. Importing into zone: ", zone);
                            execsync("cli53 import --file " + dirname + dns + " " + zone);
                        }
                    }
                });
            });
        });
        route53.listHostedZones(nextparams, function(err, data) {
            if (err) console.log(err)
            else {
                console.log(data.NextMarker)
                marker1 = data.NextMarker
                var nextparams1 = {
                    Marker: marker1
                }
                fs.readdir(dirname, function(err, filenames) {
                    if (err) console.log(err)

                    filenames.forEach(function(filename) {

                        fs.readFile(dirname + filename, 'utf-8', function(err, content) {
                            if (err) console.log(err)
                            file = filename.replace(/\.[^/.]+$/, "") + "."

                            for (var i in data.HostedZones) {
                                zone = data.HostedZones[i].Name

                                if (file == zone) {
                                    var dns = file + "dns"
                                    console.log("Name matched. Importing into zone: ", zone);
                                    execsync("cli53 import --file " + dirname + dns + " " + zone);
                                }
                            }
                        });
                    });
                });
                route53.listHostedZones(nextparams1, function(err, data) {
                    if (err) console.log(err)
                    else {
                        console.log(data.NextMarker);
                        marker2 = data.NextMarker
                        var nextparams2 = {
                            Marker: marker2
                        }
                        fs.readdir(dirname, function(err, filenames) {
                            if (err) console.log(err)

                            filenames.forEach(function(filename) {

                                fs.readFile(dirname + filename, 'utf-8', function(err, content) {
                                    if (err) console.log(err)
                                    file = filename.replace(/\.[^/.]+$/, "") + "."

                                    for (var i in data.HostedZones) {
                                        zone = data.HostedZones[i].Name

                                        if (file == zone) {
                                            var dns = file + "dns"
                                            console.log("Name matched. Importing into zone: ", zone);
                                            execsync("cli53 import --file " + dirname + dns + " " + zone);
                                        }
                                    }
                                });
                            });
                        });
                        route53.listHostedZones(nextparams2, function(err, data) {
                            if (err) console.log(err)
                            else {
                                console.log(data.NextMarker);
                                fs.readdir(dirname, function(err, filenames) {
                                    if (err) console.log(err)

                                    filenames.forEach(function(filename) {

                                        fs.readFile(dirname + filename, 'utf-8', function(err, content) {
                                            if (err) console.log(err)
                                            file = filename.replace(/\.[^/.]+$/, "") + "."

                                            for (var i in data.HostedZones) {
                                                zone = data.HostedZones[i].Name

                                                if (file == zone) {
                                                    var dns = file + "dns"
                                                    console.log("Name matched. Importing into zone: ", zone);
                                                    execsync("cli53 import --file " + dirname + dns + " " + zone);
                                                }
                                            }
                                        });
                                    });
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});
