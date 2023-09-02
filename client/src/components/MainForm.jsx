import React, { useState } from "react";
import Success from "./Success";

const MainForm = () => {
  const [loading, setLoading]= useState(false);
  const [success, setSuccess] = useState(false);

  const [userRegistrationData, setUserRegistrationData] = useState({
    email: "",
    fullName: "",
    age:"",
    highestEdu: "",
    institute:"",
    study:"",
    workExp: "",
    canadaInstitute: "",
    canadaProgram: "",
    applyingCountry: "",
    futureGoals: "",
    listeningScores:"",
    readingScores: "",
    speakingScores:"",
    writingScores:"",
    paidTuitionFee:"",
    tuitionFee:"",
    gic: "",
    payGIC: "",
  })

  const handleInput = (e)=>{
    const name= e.target.name;
    const value = e.target.value;

    setUserRegistrationData({...userRegistrationData, [name]:value});
  }


  const handleSubmit = async(e)=>{
    e.preventDefault();

    console.log(userRegistrationData);

    if(userRegistrationData){
      setLoading(true);
      try{
        const response = await fetch("https://effizient-backend-f6zu.onrender.com/api/userData", {
          method: "POST",
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userRegistrationData)
        })
        await response.json();

        const response1 = await fetch("https://effizient-backend-f6zu.onrender.com/api/mailUser", {
          method: "POST",
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userRegistrationData)
        })
        await response1.json();

        setSuccess(true);
      } catch(err){
        alert(err)
      } finally{
        setLoading(false);
      }
    } else{
      alert('Please enter all data');
    }

  }

  const handleReset = () => {
    setUserRegistrationData({
      email: "",
      fullName: "",
      age:"",
      highestEdu: "",
      institute:"",
      study:"",
      workExp: "",
      canadaInstitute: "",
      canadaProgram: "",
      applyingCountry: "",
      futureGoals: "",
      listeningScores:"",
      readingScores: "",
      speakingScores:"",
      writingScores:"",
      paidTuitionFee:"",
      tuitionFee:"",
      gic: "",
      payGIC: "",
    })
  }

  
  return (
    <div className="bg-[#daf1fe]">
      {
        success ? <Success/> : (
          <div className="flex items-center flex-col">
        <div >
          <h1 className="text-8xl font-medium pt-4">Effizient Assessment</h1>
        </div>
        
        <div className="w-2/5 my-9">
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col bg-white p-9 rounded-2xl my-6">
              <label htmlFor="email" className="py-3 font-medium">Email</label>
              <input type="email" autoComplete="off" value={userRegistrationData.email} onChange={handleInput} name="email" id="email" className="p-2 border-2 border-b-indigo-500 focus:outline-none focus:ring focus:border-b-indigo-500 rounded-lg" required placeholder="Your email"/>
            </div>

            <div className="flex flex-col bg-white p-9 rounded-2xl my-6">
              <label htmlFor="fullName" className="py-3 font-medium">Full Name</label>
              <input type="text" autoComplete="off" value={userRegistrationData.fullName} onChange={handleInput} name="fullName" id="fullName" className="p-2 border-2 border-b-indigo-500 focus:outline-none focus:ring focus:border-b-indigo-500 rounded-lg" required placeholder="Your name"/>
            </div>

            <div className="flex flex-col bg-white p-9 rounded-2xl my-6">
              <label htmlFor="contact" className="py-3 font-medium">Age</label>
              <input type="number" autoComplete="off" value={userRegistrationData.age} onChange={handleInput} name="age" id="age" className="p-2 border-2 border-b-indigo-500 focus:outline-none focus:ring focus:border-b-indigo-500 rounded-lg" required placeholder="Your age"/>
            </div>
            <div className="flex flex-col bg-white p-9 rounded-2xl my-6">
              <label htmlFor="highestEdu" className="py-3 font-medium">Highest Level of Education</label>
              <select onChange={handleInput} value={userRegistrationData.highestEdu} name="highestEdu" id="highestEdu" className="p-2 border-2 border-b-indigo-500 focus:outline-none focus:ring focus:border-b-indigo-500 rounded-lg" required >
                <option value="" disabled selected>Choose</option>
                <option value="Grade 12">Grade 12</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelors Degree">Bachelors Degree</option>
                <option value="Masters Degree">Masters Degree</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div className="flex flex-col bg-white p-9 rounded-2xl my-6">
              <label htmlFor="institute" className="py-3 font-medium">Institute where you completed your highest level of education</label>
              <input type="text" autoComplete="off" value={userRegistrationData.institute} onChange={handleInput} name="institute" id="institute" className="p-2 border-2 border-b-indigo-500 focus:outline-none focus:ring focus:border-b-indigo-500 rounded-lg" required placeholder="Your answer" />
            </div>

            <div className="flex flex-col bg-white p-9 rounded-2xl my-6">
              <label htmlFor="study" className="py-3 font-medium">What did you study</label>
              <input type="text" autoComplete="off" value={userRegistrationData.study} onChange={handleInput} name="study" id="study" className="p-2 border-2 border-b-indigo-500 focus:outline-none focus:ring focus:border-b-indigo-500 rounded-lg" required placeholder="Your answer"/>
            </div>

            <div className="flex flex-col bg-white p-9 rounded-2xl my-6">
              <label htmlFor="workExp" className="py-3 font-medium">
                <p>
                  Do you have any relevant work experience? <br /> 
                  Write None if no work experience. Provide the following details if yes: 
                </p>
                <ol className="list-decimal ps-10">
                  <li>Job Title</li>
                  <li>Company Name</li>
                  <li>Job Duties</li>
                </ol>
                <p> Sample Answer: I worked as a Sales Manager at Effizient Immigration Inc from Jan 2022 till Feb 2023. In this role, I managed sales operations, reaching out to leads, lead the outreach program, ensured meeting monthly targets.</p>
              </label>
              <input type="text" autoComplete="off" value={userRegistrationData.workExp} onChange={handleInput} name="workExp" id="workExp" className="p-2 border-2 border-b-indigo-500 focus:outline-none focus:ring focus:border-b-indigo-500 rounded-lg" required placeholder="Your answer"/>
            </div>

            <div className="flex flex-col bg-white p-9 rounded-2xl my-6">
              <label htmlFor="canadaInstitute" className="py-3 font-medium">What institute did you get admitted to in Canada?</label>
              <input type="text" autoComplete="off" value={userRegistrationData.canadaInstitute} onChange={handleInput} name="canadaInstitute" id="canadaInstitute" className="p-2 border-2 border-b-indigo-500 focus:outline-none focus:ring focus:border-b-indigo-500 rounded-lg" required placeholder="Your answer"/>
            </div>

            <div className="flex flex-col bg-white p-9 rounded-2xl my-6">
              <label htmlFor="canadaProgram" className="py-3 font-medium">What is your program of study in Canada?</label>
              <input type="text" autoComplete="off" value={userRegistrationData.canadaProgram} onChange={handleInput} name="canadaProgram" id="canadaProgram" className="p-2 border-2 border-b-indigo-500 focus:outline-none focus:ring focus:border-b-indigo-500 rounded-lg" required placeholder="Your answer"/>
            </div>

            <div className="flex flex-col bg-white p-9 rounded-2xl my-6">
              <label htmlFor="applyingCountry" className="py-3 font-medium">Which country are you applying from?</label>
              <input type="text" autoComplete="off" value={userRegistrationData.applyingCountry} onChange={handleInput} name="applyingCountry" id="applyingCountry" className="p-2 border-2 border-b-indigo-500 focus:outline-none focus:ring focus:border-b-indigo-500 rounded-lg" required placeholder="Your answer"/>
            </div>

            <div className="flex flex-col bg-white p-9 rounded-2xl my-6">
              <label htmlFor="futureGoals" className="py-3 font-medium">What are your future goals?</label>
              <input type="text" autoComplete="off" value={userRegistrationData.futureGoals} onChange={handleInput} name="futureGoals" id="futureGoals" className="p-2 border-2 border-b-indigo-500 focus:outline-none focus:ring focus:border-b-indigo-500 rounded-lg" required placeholder="Your answer"/>
            </div>

            <div className="flex flex-col bg-white p-9 rounded-2xl my-6">
              <label htmlFor="listeningScores" className="py-3 font-medium">English Scores - Listening</label>
              <input type="text" autoComplete="off" value={userRegistrationData.listeningScores} onChange={handleInput} name="listeningScores" id="listeningScores" className="p-2 border-2 border-b-indigo-500 focus:outline-none focus:ring focus:border-b-indigo-500 rounded-lg" required placeholder="Your answer"/>
            </div>

            <div className="flex flex-col bg-white p-9 rounded-2xl my-6">
              <label htmlFor="readingScores" className="py-3 font-medium">English Scores - Reading</label>
              <input type="text" autoComplete="off" value={userRegistrationData.readingScores} onChange={handleInput} name="readingScores" id="readingScores" className="p-2 border-2 border-b-indigo-500 focus:outline-none focus:ring focus:border-b-indigo-500 rounded-lg" required placeholder="Your answer"/>
            </div>

            <div className="flex flex-col bg-white p-9 rounded-2xl my-6">
              <label htmlFor="speakingScores" className="py-3 font-medium">English Scores - Speaking</label>
              <input type="text" autoComplete="off" value={userRegistrationData.speakingScores} onChange={handleInput} name="speakingScores" id="speakingScores" className="p-2 border-2 border-b-indigo-500 focus:outline-none focus:ring focus:border-b-indigo-500 rounded-lg" required placeholder="Your answer"/>
            </div>

            <div className="flex flex-col bg-white p-9 rounded-2xl my-6">
              <label htmlFor="writingScores" className="py-3 font-medium">English Scores - Writing</label>
              <input type="text" autoComplete="off" value={userRegistrationData.writingScores} onChange={handleInput} name="writingScores" id="writingScores" className="p-2 border-2 border-b-indigo-500 focus:outline-none focus:ring focus:border-b-indigo-500 rounded-lg" required placeholder="Your answer"/>
            </div>

            <div className="flex flex-col bg-white p-9 rounded-2xl my-6">
              <label className="font-medium">Did you pay your first year tuition?</label>
              <label htmlFor="yes" className="py-3 font-medium flex items-center w-[9%] justify-between" value={userRegistrationData.paidTuitionFee} onChange={handleInput}>
                Yes
                <input type="radio" id="yes" name="paidTuitionFee" value="yes" required />
              </label>
              <label htmlFor="no" className="py-3 font-medium flex items-center w-[9%] justify-between" value={userRegistrationData.paidTuitionFee} onChange={handleInput}>
                No
                <input type="radio" id="no" name="paidTuitionFee" value="no" />
              </label>
            </div>

            <div className="flex flex-col bg-white p-9 rounded-2xl my-6">
              <label htmlFor="tuitionFee" className="py-3 font-medium">How much tuition fee did you pay?</label>
              <input type="text" autoComplete="off" value={userRegistrationData.tuitionFee} onChange={handleInput} name="tuitionFee" id="tuitionFee" className="p-2 border-2 border-b-indigo-500 focus:outline-none focus:ring focus:border-b-indigo-500 rounded-lg" required placeholder="Your answer"/>
            </div>

            <div className="flex flex-col bg-white p-9 rounded-2xl my-6">
              <label className="font-medium">Did you do a GIC?</label>
              <label htmlFor="yes" className="py-3 font-medium flex items-center w-[9%] justify-between" value={userRegistrationData.gic} onChange={handleInput}>
                Yes
                <input type="radio" id="yes" name="gic" value="yes" required/>
              </label>
              <label htmlFor="no" className="py-3 font-medium flex items-center w-[9%] justify-between" value={userRegistrationData.gic} onChange={handleInput}>
                No
                <input type="radio" id="no" name="gic" value="no" />
              </label>
            </div>

            <div className="flex flex-col bg-white p-9 rounded-2xl my-6">
              <label htmlFor="payGIC" className="py-3 font-medium">How much did you pay towards GIC</label>
              <input type="text" autoComplete="off" value={userRegistrationData.payGIC} onChange={handleInput} name="payGIC" id="payGIC" className="p-2 border-2 border-b-indigo-500 focus:outline-none focus:ring focus:border-b-indigo-500 rounded-lg" required placeholder="Your answer"/>
            </div>

            <div className="flex justify-between">
              <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300 text-white px-4 py-2 text-lg rounded-full">
                {
                  loading ? 'Submitting...': 'Submit' 
                }
              </button>
              <button type="reset" onClick={handleReset} className="text-indigo-500 hover:bg-indigo-50 text-lg px-4 py-2 rounded-full">Clear Form</button>
            </div>
          </form>
        </div>
      </div>
        )
      }
      
    </div>
  );
};

export default MainForm;
