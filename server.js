//middleware function
const express =require("express");
const hbs =require('hbs');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname+ "/views/partials"); 

app.set("view engine", "hbs");

app.use(express.static(__dirname + '/public')); //1

//middlewre function, 'next' is for telling when the middleware function is done
//****************** with app.use we use a middle ware that shows how the server is working

app.use((req, res,next )=>{
    var now = new Date().toString();//getting the date
    var log = `${now}: ${req.method} ${req.url}`;//if we go to expressjs.com and api reference 4x,  then request, and response 
    //choose request, req.method and req.url 
    //we have to referesh the page to see this 
   fs.appendFile('server.log',log + '\n', (err)=>{ //it will create a server.log file with the log information, n is next line and err is for error
       if(err)
       {
           console.log("unable to append to server log");
       }
   }); //we should referesh the page and the open server.log file on vcode

    next(); //so if we don't put next() the code won't work, we can run the code without this code, and will see the code won't work, because
            //without this code, the compiler doesn't know when the app.use() functuin is done
});


//we add a meintenance.hbs to in the views folder 
app.use((req, res, next)=>{
    res.render('maintenance.hbs'); //passing the file that we want to render
    //now if we refresh the page, the maintenance page will appear, becuase we hvan't had next(), any of the below code won't run, which means
    //that any page we go, we get content of  maintenance.hbs page, however because //1 is defined before app.use(), if we go to help.html page  
    //it will show the content of that page, to avoid that we can trasnfer //1 to after this line of code
    //and when we don't need the maintenance code we remove it from the code, and code works as expected
});


//*******************
app.get("/", (req, res)=>{ 
    res.render("home.hbs", {
        pageTitle: "Home page",
        WelcomeMessage: "welcome to my website",
        currentYear : new Date().getFullYear()
    });
});

app.get("/about", (req, res)=>{
    res.render('about.hbs', {
        pageTitle: "About page",
        currentYear : new Date().getFullYear()
    }); 
});

app.get("/bad", (req, res)=>{
   res.send( {errorMessage : "unable to handle request "}); 
    //we get: about page
});

app.listen(3000, ()=>{ 
    console.log('server is up on port 3000');
}); 