const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
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
    class: {
        type: String,
        require: true
    },
    courses: {
        type: [mongoose.Types.ObjectId],
        ref: "Course1"
    },
})

const teacherModel = mongoose.models.Teacher1 || mongoose.model("Teacher1", teacherSchema);

module.exports = teacherModel;