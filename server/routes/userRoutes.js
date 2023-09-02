import express from "express";
import * as dotenv from "dotenv";

import userData from "../mongodb/models/userData.js";

dotenv.config();

const router = express.Router();

//GET ALL POSTS
router.route("/").get(async (req, res) => {
  try {
    const allData = await userData.find({});

    res.status(200).json({ success: "true", data: allData });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});


//CREATE A POST
router.route("/").post(async(req,res)=>{
  try{
    const {email,fullName, age, highestEdu, institute, study, workExp, canadaInstitute, canadaProgram, applyingCountry, futureGoals, listeningScores, readingScores, speakingScores, writingScores, paidTuitionFee, tuitionFee, gic, payGIC} = req.body;

    const newData = await userData.create({
      email,fullName, age, highestEdu, institute, study, workExp, canadaInstitute, canadaProgram, applyingCountry, futureGoals, listeningScores, readingScores, speakingScores, writingScores, paidTuitionFee, tuitionFee, gic, payGIC
    });

    res.status(201).json({success:true, data: newData});
  } catch(err){
    res.status(500).json({success:false, message: err});
  }
})

export default router;