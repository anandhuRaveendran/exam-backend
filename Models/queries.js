const {Schema}=require('mongoose');
const {model} = require('mongoose');
const users=new Schema({
token_id:{type:String,required:true},
patient_name:{type:String,required:true},
doctor_name:{type:String,required:true},
appointment_date:{type:String,required:true},
appointment_time:{type:String,required:true}
});
const record=model('appointment_list',users);
module.exports=record;