const express=require("express")
const bodyparser=require("body-parser")
const mailchimp=require("@mailchimp/mailchimp_marketing");

const app=express()
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

mailchimp.setConfig({
    apiKey:"890ac35f07c37620664c98bcaf9443d8-us18",
    server:"us18"
})

app.post("/",function(req,res){
    const fname=req.body.fname
    const lname=req.body.lname
    const email=req.body.email

    const listid="47b2a5263a"

    const subscribingUser={
        fname:fname,
        lname:lname,
        email:email
    }

    async function run(){
        const response=await mailchimp.lists.addListMember(listid,{
            email_address:subscribingUser.email,
            status:"subscribed",
            merge_fields:{
                FNAME:subscribingUser.fname,
                LNAME:subscribingUser.lname
            }
        })
            res.sendFile(__dirname+"/success.html")
    }
    run().catch(e=>res.sendFile(__dirname+"/failure.html"))
  
        })


        app.post("/failure",function(req,res){
            res.redirect("/")
        })
app.listen(process.env.PORT||3000,function(){
    console.log("Server is running on port 3000");
})

// 890ac35f07c37620664c98bcaf9443d8-us18
// 