const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();
hbs.registerPartials(__dirname+'/views/partials');
app.set("view engine",'hbs');

hbs.registerHelper('date',()=>{
	new Date().getFullYear();
});


hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});


app.use((req,res,next)=>{
	var now=new Date().toString();
	var log=`${now}: ${req.method}, ${req.url}`;
	//fs.appendFile('server.log',log+"\n");    without callback function

	fs.appendFile('server.log',log+"\n",(err)=>{ //with callback function
		if(err){
			console.log(err);
		}else
		console.log("sucessfully created log");
	})



	next();
});


app.use((req,res,next)=>{
	res.render('maintain.hbs');
});

app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>{
	//res.send("hello express");
	res.render('home.hbs',{
		pageTitle:"Home Page",
		welcome:"welcome to the website",
		
	});

});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle:"About Us",
		date:new Date().getFullYear(),
	});

});
app.get('/bad',(req,res)=>{
	//res.send("hello express");
	res.send({
		errorMessage:"unable to reach ur request"
	}
	);

});

app.listen(3000);