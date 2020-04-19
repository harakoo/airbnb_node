var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uploadSchema = new Schema({
    title:
    {
      type:String,
      required:true
    },

    price: 
    {
        type:Number,
        required:true
    },
    dateCreated: 
    {
        type:Date,
        default:Date.now()
    },
    description:
    {
        type:String,
      required:true
    }
});

var uploadModel = mongoose.model('UploadRoom', uploadSchema);
module.exports = uploadModel;
