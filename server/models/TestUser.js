const mongoose = require('mongoose');

const testUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const TestUser = mongoose.model('TestUser', testUserSchema);

module.exports = TestUser;
