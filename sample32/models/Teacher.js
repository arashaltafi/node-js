const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    family: {
        type: String
    },
    class: {
        type: String
    },
    courses: {
        type: [mongoose.Types.ObjectId],
        ref: "Teacher"
    },
})

const teacherModel = mongoose.models.Teacher1 || mongoose.model("Teacher1", teacherSchema);

module.exports = teacherModel;