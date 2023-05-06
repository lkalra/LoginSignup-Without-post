const express = require("express")
const path = require("path")
const Register = require("./models/registers")
require("../src/db/conn")

const app = express()
const port = process.env.PORT || 3000

//can use static website(normal html css js) like this
const staticPath = path.join(__dirname, "../")
app.use(express.static(staticPath))

app.use(express.json())
app.use(express.urlencoded({extended:false}))


// for static
app.get("/", function(req, res){
    res.send("Hello, World!")
})

app.post("/register",async (req,res)=>{

    const {firstname, lastname, email, password, confirmpassword} = req.body

    try {
        const user = await
        Register.findOne({email:email})
        
        if(user){
            res.send({message:"User already registered, Please login!"})
            // res.status(403).send({message:"User already registered"})
        }else{
            if(password===confirmpassword){
                const user = new Register({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password,
                    confirmpassword:confirmpassword
                })
                const myUser = user.save();

                if(!myUser){
                    res.send("Cannot register")
               }else{
                   res.send({message:"successfully registered, Please Login!"})
               }
            }else{
                res.send({message:"Passwords do NOT match"})
            }
        }
    } catch (err) {
        if(err){
            res.send(err)
        }
    }
})

app.listen(port,function(){
    console.log("Server started")
})
