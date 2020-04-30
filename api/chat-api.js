const express = require("express");
const router = express.Router();
const db = require('../db');
// Where we will keep available questions
let questions = db.getDbData("questions");

//Method to get all the questions
router.get('/', (req, res) => {
    console.log(`Get all questions`);
    if(questions === null && questions === '') {
      return res.status(404).json({
            status: "failure",
            message: "There is are no questions available"
          });
    } 
    console.log(questions);
     res.status(200).json({
            status: "success",
            data : questions,
            message: "All questions are fetched"
          });
});

// retrive a answer for the question
router.get('/:question', (req, res) => {
    // Reading answer for the question
    const question = req.params.question;
    console.log(`Get answer for the question: ${question}` );
    var answer = db.getDbData(question);
    console.log(answer);
    // Searching answer for the question
        if (answer != 'undefined' && answer != null && answer != '') {
          return  res.status(200).json({
                status: "success",
                data : answer,
                message: "All answers are fetched"
              });
        } else {
    // Sending 404 when the book is not found
    res.status(404).send('Question not found');
}
});

module.exports = router;