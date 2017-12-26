const express=require('express');

var app=express();
app.get('/',(req,res)=>{
	//res.send("hello express");
	res.send({
		name:"Ravi",
		language:['java','php','node']
	})

});

app.get('/about',(req,res)=>{
	//res.send("hello express");
	res.send("about page")

});


app.listen(3000);