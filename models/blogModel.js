const mongoose = require('mongoose')
const blogpostSchema = new mongoose.Schema({
    title: String,
    categories: String,
    content: String
})
const Blog = mongoose.model('Blog', blogpostSchema)

module.exports = Blog