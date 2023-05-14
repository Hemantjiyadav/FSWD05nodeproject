const express = require('express');
const app = express();

let port = 3000;
const path = require('path');
const empCollection = require('./db/db');

const templates_path = path.join(__dirname, '../template/views');

app.set('view engine', 'hbs');
app.set('views', templates_path);

app.use(express.urlencoded({ extended: false }));

require('./db/db');


app.get('/', (req, res) => {
    res.render('index')
})

app.post('/empdata', async (req, res) => {
   try{
    const password = req.body.password;
    const cpassword = req.body.cpassword;
 
    if(password === cpassword){
     const empdata = new empCollection({
         name: req.body.name,
         email: req.body.email,
         phone: req.body.phone,
         password: req.body.password,
         cpassword: req.body.cpassword
     });
  
    //  Here is a Create Data

     const postData = await empdata.save();
     res.send(postData);
    }else{
     res.send("passward are not matching...")
    };
   } catch(error){
         res.send(error);
   }
});

// Here is a Read Data

async function search(){
    const result = await empCollection.find({name : "Hemant Yadav"});
    console.log(result);
}
search();

// Here is a Update Data

async function updata(){
     const answer = await empCollection.updateOne({name : "Hemant Yadav"},{
        $set : {
            name: "Hemant Kumar"
        }
    })
    console.log(answer);
}
updata();

// Here is a Delete Data

async function deleteUpdate(){
    const del = await empCollection.deleteOne({name: "Hemant Kumar"});
    console.log(del);
}
deleteUpdate();

app.listen(port, () => {
    console.log(`Listing to the port no ${port}`);
})