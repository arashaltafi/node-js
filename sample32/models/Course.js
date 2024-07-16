const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    price: {
        type: Number
    }
})

const courseModel = mongoose.models.Course1 || mongoose.model("Course1", courseSchema);

module.exports = courseModel;