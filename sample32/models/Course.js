const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
})

const courseModel = mongoose.models.Course1 || mongoose.model("Course1", courseSchema);

module.exports = courseModel;