const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    family: {
        type: String
    },
    age: {
        type: Number
    },
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: "Teacher"
    },
})

const studentModel = mongoose.models.Student || mongoose.model("Student", studentSchema);

module.exports = studentModel;