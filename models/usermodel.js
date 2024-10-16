const mongoose = require('mongoose'); // Erase if already required
const bcrpt=require('bcrypt')

// Declare the Schema of the Mongo model
const feedUserSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true
    },
    location:{
        type:String
    },
    phoneNumber:{
        type:String,
        unique:true,
        spare:true
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        default:"user"
    }
},
    {
        timestamps: true
    },
);

feedUserSchema.pre( 'save', async function (next) { 
    if(this.isModified( "password")){
        this.password=await bcrpt.hash(this.password,10)
    }
} );

module.exports = mongoose.model('FeedUser', feedUserSchema);
