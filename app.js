var express	=	require("express");
var multer	=	require('multer');
var app	=	express();
var path = require('path');
var os = require("os");
var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + '.jpg');
  }
});

var upload = multer({ storage : storage}).single('image');

app.use('/uploads', express.static('uploads'))
// app.use(express.static('uploads'))

app.post('/api/upload',function(req , res){
	upload(req , res , function(err, rs) {
		if(err) {
			return res.json({
                "success": false,
                "error": err
            });
		}
		return res.json({
            "success": true,
            "data": {
              "url": __dirname + "/" + req.file.path,
              "path": req.file.path
            }
        })
	});
});

app.listen(2711,function(){
    console.log("Working on port 2711");
});
