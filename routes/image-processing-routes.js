var fs = require('fs'); 
var multer = require('multer'); 
var sharp = require('sharp'); 
  
var upload = multer({dest : './img/posts'})  
  
module.exports = function (app){      
    
    app.post('/upload', upload.single("avatar"), (req, res)=> 
    { 
        fs.rename(req.file.path, './img/posts/avatar.jpg', (err)=>{ 
            console.log(err); 
        }) 
    
        sharp(__dirname + '/img/posts/avatar.jpg').resize(200,200) 
        .jpeg({quality : 50}).toFile(__dirname  
            + '/img/posts/avatar_thumb.jpg'); 
    
    
        sharp(__dirname + '/img/posts/avatar.jpg').resize(640,480) 
        .jpeg({quality : 80}).toFile(__dirname  
            + '/img/posts/avatar_preview.jpg'); 
    
        //return res.json("File Uploaded Successfully!"); 
        res.redirect("/members");
    }); 
}