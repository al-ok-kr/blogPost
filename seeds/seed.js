const mongoose = require('mongoose')
const blogpostSchema = require('../models/blogModel')
mongoose.connect('mongodb://localhost:27017/blogpost', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const arr = [
    { title: 'This is First Blog', categories: 'Blog', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
    { title: 'This is Second Blog', categories: 'Blog', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
    { title: 'This is third Blog', categories: 'Blog', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
    { title: 'This is fourth Blog', categories: 'Blog', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' }
]

const seedDB = async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(arr)
}
seedDB().then(() => {
    mongoose.connection.close();
})


