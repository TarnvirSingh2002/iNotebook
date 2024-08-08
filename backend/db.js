const mongoose = require('mongoose') 

exports.connect = ()=>{

    mongoose.connect("mongodb://localhost:27017/first",
    {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log('DB connected successfully'))
    .catch((err)=>{
        console.log('DB connection failed')
        console.log(err);
        process.exit(1)
    })
};