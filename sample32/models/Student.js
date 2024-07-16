const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    family: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: "Teacher1"
    },
})

const studentModel = mongoose.models.Student1 || mongoose.model("Student1", studentSchema);

module.exports = studentModel;