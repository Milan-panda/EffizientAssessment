import express from "express";
import nodemailer from "nodemailer";
import {htmlToText} from 'nodemailer-html-to-text';
import OpenAI from 'openai';

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
  }
});
transporter.use('compile', htmlToText());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

//Mail the user
router.route("/").post(async (req,res)=>{
  const {email,fullName, age, highestEdu, institute, study, workExp, canadaInstitute, canadaProgram, applyingCountry, futureGoals, listeningScores, readingScores, speakingScores, writingScores, paidTuitionFee, tuitionFee, gic, payGIC} = req.body;

  const aiResponse = await openai.completions.create({
    model: 'text-davinci-003',
    prompt: `Please recommend a perfect future course and future goals that I should pursue. My highest education is ${highestEdu} and course is ${study} and ${workExp} `,
    max_tokens: 500,
  })

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Thanks for submitting the form we will reach out to you soon...', 
    html: `
    <div>
    <h1>Welcome ${fullName}</h1>
    <p>Kindly have a look to the details you have submitted<p>
    <table border="1" style="background-color:#daf1fe;border-collapse:collapse;border:1px solid #6366f1;color:#000000;width:auto" >
    <tr>
      <td>Email</td>
      <td>${email}</td>
    </tr>
    <tr>
      <td>Name</td>
      <td>${fullName}</td>
    </tr>
    <tr>
      <td>Age</td>
      <td>${age}</td>
    </tr>
    <tr>
      <td>Highest Level of Education</td>
      <td>${highestEdu}</td>
    </tr>
    <tr>
      <td>Institute where you completed your highest level of education</td>
      <td>${institute}</td>
    </tr>
    <tr>
      <td>What did you study</td>
      <td>${study}</td>
    </tr>
    <tr>
      <td>Do you have any relevant work experience?</td>
      <td>${workExp}</td>
    </tr>
    <tr>
      <td>What institute did you get admitted to in Canada?</td>
      <td>${canadaInstitute}</td>
    </tr>
    <tr>
      <td>What is your program of study in Canada?</td>
      <td>${canadaProgram}</td>
    </tr>
    <tr>
      <td>Which country are you applying from?</td>
      <td>${applyingCountry}</td>
    </tr>
    <tr>
      <td>What are your future goals?</td>
      <td>${futureGoals}</td>
    </tr>
    <tr>
      <td>English Scores - Listening</td>
      <td>${listeningScores}</td>
    </tr>
    <tr>
      <td>English Scores - Reading</td>
      <td>${readingScores}</td>
    </tr>
    <tr>
      <td>English Scores - Speaking</td>
      <td>${speakingScores}</td>
    </tr>
    <tr>
      <td>English Scores - Writing</td>
      <td>${writingScores}</td>
    </tr>
    <tr>
      <td>Did you pay your first year tuition?</td>
      <td>${paidTuitionFee}</td>
    </tr>
    <tr>
      <td>How much tuition fee did you pay?</td>
      <td>${tuitionFee}</td>
    </tr>
    <tr>
      <td>Did you do a GIC?</td>
      <td>${gic}</td>
    </tr>
    <tr>
      <td>How much did you pay towards GIC</td>
      <td>${payGIC}</td>
    </tr>
  </table>

  <p style="margin-top: 20px">After thoroughly analyzing your form data ${aiResponse.choices[0].text}</p>
  </div>
    `,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Email sent successfully' });
    console.log("success");

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Email sending failed' });
  }
})


export default router;