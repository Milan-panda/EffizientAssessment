import mongoose from 'mongoose';

const Data = new mongoose.Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  age:{ type: Number, required: true },
  highestEdu: { type: String, required: true },
  institute:{ type: String, required: true },
  study:{ type: String, required: true },
  workExp: { type: String, required: true },
  canadaInstitute: { type: String, required: true },
  canadaProgram: { type: String, required: true },
  applyingCountry: { type: String, required: true },
  futureGoals: { type: String, required: true },
  listeningScores:{ type: String, required: true },
  readingScores: { type: String, required: true },
  speakingScores:{ type: String, required: true },
  writingScores:{ type: String, required: true },
  paidTuitionFee:{ type: String, required: true },
  tuitionFee:{ type: String, required: true },
  gic: { type: String, required: true },
  payGIC: { type: String, required: true },
});

const DataSchema = mongoose.model('Data', Data);

export default DataSchema;
