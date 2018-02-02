var dbName = yelp_camp_profiles.images;

dbName.find().exec(function(err, output){

    var jsonOutput=JSON.stringify(output);

    fs.writeFile('downloads/output.json', output, function (err) {

        if (err) {
            console.log(err);
            res.send('error');
        }

        else{
            var filename = 'res.json';
            var mimetype = 'application/json';

            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.setHeader('Content-type', mimetype);
            res.end(jsonOutput);
        }
    }

    )

});