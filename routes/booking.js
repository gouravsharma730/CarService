const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
const BookService= require('../models/Booking');
const User = require('../models/User');

router.post('/',verifyToken, async function(req,res){
    const bookingDetails = req.body;
    bookingDetails.carDetails.ownerId = req.user.id;
    const booking = new BookService(bookingDetails);
    await booking.save();
    const user = await User.findOneAndUpdate(
        {_id:req['user']['id']},
    {
        $push:{
            bookingHistory:{
                date:new Date(),
                carDetails:bookingDetails.carDetails.carNumber
            }},
            $inc:{bookingCount:1},
        },{new:true}
        )
    return res.status(200).json({message:bookingDetails});
})

router.get('/history',verifyToken, async function (req,res){
    try{
        const ownerId = req.user.id;
        let response=[];
        const bookingHistory = await BookService.find({'carDetails.ownerId':ownerId});
        for(let i =0;i<bookingHistory.length;i++){
            let temp ={};
            const fullDate = new Date(bookingHistory[i]['DateOfPickUp']);
            let date = fullDate.getDate();
            let month = fullDate.getMonth()+1;
            let year = fullDate.getFullYear();
            temp.carNumber= bookingHistory[i]['carDetails']['carNumber'];
            temp.serviceType=bookingHistory[i]['carDetails']['serviceType'];
            temp.serviceStatus=bookingHistory[i]['carDetails']['serviceStatus'];
            temp.dateOfPickUp=`${year}-${month < 10 ? '0' : ''}${month}-${date < 10 ? '0' : ''}${date}`;
            temp._id=bookingHistory[i]['id'];
            response.push(temp)
        }
        return res.status(200).json({message:response});
        }catch(err){
            return console.log(err);
        }
})
module.exports = router;