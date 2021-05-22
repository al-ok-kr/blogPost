//Express Part
const express = require('express')
const app = express()
const favicon = require('serve-favicon')


//Mongoose Part
const mongoose = require('mongoose')
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

//ejs Part
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//ejs-mate Part
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate)

//to parse Form Data through req.body
app.use(express.urlencoded({ extended: true }));

//Blog-Model required in order to Access blog database
const blogs = require('./models/blogModel')

const methodOverride = require('method-override')
app.use(methodOverride('_method'));

//app.use(favicon(path.join(__dirname, 'favicon.ico')))

//Route Logic
app.get('/', async (req, res) => {
    const blogposts = await blogs.find({})
    res.render('home', { blogposts })
})
app.post('/', async (req, res) => {
    const newBlog = new blogs(req.body);
    await newBlog.save()
    res.redirect('/')
})
app.get('/new', (req, res) => {
    res.render('Blog/new')
})
app.get('/:id/edit', async (req, res,) => {
    const blog = await blogs.findById(req.params.id)
    res.render('Blog/edit', { blog });
})
app.get('/:id', async (req, res,) => {
    const blog = await blogs.findById(req.params.id)
    res.render('Blog/show', { blog });
})

app.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedBlog = await blogs.findByIdAndUpdate(id, req.body);
    res.redirect(`/${updatedBlog._id}`)
})
app.delete('/:id/delete', async (req, res) => {
    const { id } = req.params
    await blogs.findByIdAndDelete(id)
    res.redirect('/')
})

app.listen(3000, () => {
    console.log("Listening in port 3000")
})