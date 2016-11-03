var mongoose = require('mongoose');

var QuestionsSchema = new mongoose.Schema({
  theme_id: {type: String},
  user_id: { type: String },
  created_at: { type: Date },
  questions: { type: Array },
});

module.exports = mongoose.model('questions', QuestionsSchema);