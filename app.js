//jshint esversion:6

var express = require("express");
const app = express();
var bodyParser=require('body-parser');
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
const fs = require("fs");


var android= 4;
var web=4;
var prod =4;
var digi=4;
var ds=4;
var math=4;
var message="";


///////////////Loading Json Files ///////////////////

fs.readFile(`${__dirname}/android.json`,'utf-8',(err,data) => {
const productData = JSON.parse(data);
android= productData;

});
fs.readFile(`${__dirname}/web.json`,'utf-8',(err,data) => {
const productData = JSON.parse(data);
web= productData;

});
fs.readFile(`${__dirname}/prod.json`,'utf-8',(err,data) => {
const productData = JSON.parse(data);
prod= productData;

});
fs.readFile(`${__dirname}/digi.json`,'utf-8',(err,data) => {
const productData = JSON.parse(data);
digi= productData;

});
fs.readFile(`${__dirname}/ds.json`,'utf-8',(err,data) => {
const productData = JSON.parse(data);
ds= productData;

});
fs.readFile(`${__dirname}/math.json`,'utf-8',(err,data) => {
const productData = JSON.parse(data);
math= productData;

});

//////////////////////Loading Template Files//////////////////////
const tempCard = fs.readFileSync(`${__dirname}/tempcard.html`,'utf-8');
const page = fs.readFileSync(`${__dirname}/views/show.ejs`,'utf-8');


///////////////////////Data Filling Function////////////////////
const replaceTemplate =(temp , el) =>{
let output = temp.replace(/{%%link%%}/g,el.link);
 output = output.replace(/{%%img%%}/g,el.img);
 return output;
}
//////////////Starting server///////////////////////////////

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);



app.listen(port,function(){
console.log(`Server Has started on port ${port}  Successfully`);
});
//////////////////////////Getting Requests from the Server//////////////////
app.get("/",function(req,res){
res.render("index");
});


app.get("/index",function(req,res){
  res.render("index");
});


app.get("/paid",function(req,res){
const y = web.map(el => replaceTemplate(tempCard,el)).join('');
const x = page.replace(/{%%data%%}/g,y);
res.end(x);
});


app.get("/Android",function(req,res){
const y = android.map(el => replaceTemplate(tempCard,el)).join('');
const x = page.replace(/{%%data%%}/g,y);
res.end(x);
});


app.get("/Web",function(req,res){
const y = web.map(el => replaceTemplate(tempCard,el)).join('');
const x = page.replace(/{%%data%%}/g,y);
res.end(x);
});


app.get("/Prod",function(req,res){
const y = prod.map(el => replaceTemplate(tempCard,el)).join('');
const x = page.replace(/{%%data%%}/g,y);
res.end(x);
});


app.get("/Digi",function(req,res){
const y = digi.map(el => replaceTemplate(tempCard,el)).join('');
const x = page.replace(/{%%data%%}/g,y);
res.end(x);
});



app.get("/Ds",function(req,res){
const y = ds.map(el => replaceTemplate(tempCard,el)).join('');
const x = page.replace(/{%%data%%}/g,y);
res.end(x);
});


app.get("/Math",function(req,res){
const y = math.map(el => replaceTemplate(tempCard,el)).join('');
const x = page.replace(/{%%data%%}/g,y);
res.end(x);
});



app.get("/@@!Admin",function(req,res){
res.render("Admin",{message:""});
});

////////////////Admin Validation post Method//////////////

app.post("/Login",function(req,res){

            if( req.body.urId=="NaddyAltair"&& req.body.urPass=="meriwebsite" )
            {
              console.log("Admin Authorization Granted");
              res.render("add",{message:""});
            }
            else{
                 res.render("Admin",{message:"Id or Password is incorrect"});
                 }
});

/////////Course Adding post method////////////////
app.post("/add",function (req,res) {
    const c=req.body.urId;
    const d=req.body.urPass;
    const u= req.body.filename;
    var t = false;


    if(c!=null && c!="")
    {
      if(d!=null && d!="")
      {
        t=true;
      }
    }


    if(t) {
        fs.readFile(`${__dirname}/${u}.json`, 'utf-8', (err, data) => {

            const productData = JSON.parse(data);
            productData.push({img: `${c}`, link: `${d}`});

            fs.writeFile(`${__dirname}/${u}.json`, JSON.stringify(productData), 'utf-8', function (err) {
                if (err) throw err
                console.log('Done!')
            });


        });
        res.render("add", {message: "Added"});
    }
    else  res.render("add",{message:"Please enter the values"});
});


////////////////Course Removing Post Method///////////////


app.post("/remove",function (req,res) {
    const c=req.body.rlink;
    const u= req.body.filename1;





fs.readFile(`${__dirname}/${u}.json`, 'utf-8', (err, data) => {
        const productData = JSON.parse(data);
        var s=0;
        for(var i=0;i<productData.length;i++)
        {
          if(productData[i].img == c){
            productData.splice(i,1);
            console.log("removed");
          console.log(productData.length);
          s=1;
          i=-1;
        }

      }
        fs.writeFile(`${__dirname}/${u}.json`, JSON.stringify(productData), 'utf-8', function (err) {
      if (err) throw err
      });
      if(s!=0){
          res.render("add", {message: " removed"});
      }
                else {
                  if(productData.length==0)
                  console.log(productData);

                  res.render("add", {message: "Could'nt remove"});
                }



});


});
