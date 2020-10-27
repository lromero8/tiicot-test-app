const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
var Student = require('./models/Student');


const app = express();

app.use(bodyParser.json());
app.use(cors())

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI || `mongodb://localhost:27017/test`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});


/* ------------------- POST STUDENT -------------------- */


app.post("/api/student", (req, res) => {

    var myData = new Student(req.body);
    myData.save()
        .then(item => {
            // res.send("Student saved to database");
            res.status(200).json({
                status: 200,
                msg: 'Student saved to database',
            });
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });

})

/* ------------------- GET STUDENT -------------------- */

app.get("/api/student", async (request, response) => {

    try {
        var result = await Student.find().exec();
        response.send(result);
        // response.status(200).json(result);
        // console.log(result)
        // response.send("It works");
    } catch (error) {
        response.status(500).send(error);
    }

});

/* ------------------- UPDATE STUDENT -------------------- */


app.put("/api/student/:id", async (req, res) => {

    // console.log(req)

    var result = await Student.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            console.log(error);
            return error;
        } else {
            res.json(data)
            // console.log('Data updated successfully')
        }
    });


})

/* ------------------- DELETE STUDENT -------------------- */

app.delete("/api/student/:id", async (request, response) => {
    try {
        var result = await Student.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});