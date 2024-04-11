const mongoose=require("mongoose");
constmongoDB_Url=process.env.MONGODB_URL;
mongoose.connect('mongodb://127.0.0.1:27017/registration');
mongoose.connection.on('error',err=>{
    console.log(err);
});
mongoose.connection.on('connected',res=>{
    console.log('connected');
}); 
