const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')
const Blog = require('../models/Blog');
const paginatedResults = require('../middleware/paginatedResults');


//Route#1: geting blog of current user
router.get("/fetch-user-blog", fetchuser, async (req, res) => {
    try {
        const blogs = await Blog.find({ user: req.user.id });
        res.json(blogs);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

});

//Route#1.1: geting blog all users
router.get("/fetch-blogs", async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

});

//Route#2: Creating new Blog
router.post('/create-blog', fetchuser, [
    body('title', 'Minimum 3 and Max 10 character of title').isLength({ min: 3, max: 10 }),
    body('description', 'minimum 10 characters').isLength({ min: 10 }),
], async (req, res) => {

    let success = false;

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {
        //creating new blog
        const newBlog = await new Blog({
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            user: req.user.id
        })

        const saveBlog = await newBlog.save();
        success = true;
        res.json({success,saveBlog});
    } catch (error) {
        console.error(error);
        res.status(500).send("internal server error");
    }
});

router.get('/single-blog/:id', async (req,res)=>{
    try {
        const blog = await Blog.findOne({_id: req.params.id})
        res.json(blog);
    } catch (e) {
        res.status(400).send(e.message)
    }
})

//Route#3: Updating the blog
router.put('/update-blog/:id', fetchuser, async (req, res) => {

    try {
        const updateBlog = {};
        // if title updated
        if (req.body.title) {
            updateBlog.title = req.body.title;
        }
        // if description updated
        if (req.body.description) {
            updateBlog.description = req.body.description;
        }
        // if tag updated
        if (req.body.tag) {
            updateBlog.tag = req.body.tag;
        }

        let blog = await Blog.findById(req.params.id);
        if (!blog) {
            res.status(404).send("Not Found");
        }
        if (blog.user.toString() !== req.user.id) {
            res.status(401).send("Not Allowed to update other blogs");
        }

        //finding blog by id and updating it
        blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $set: updateBlog },
            { new: true })

        res.json(blog);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }

});
//Route#3: Deleting the blog
router.delete('/delete-blog/:id',fetchuser,async(req,res)=>{
    try {

        let deleteBlog = await Blog.findById(req.params.id);

        //if Blog is not available 
        if(!deleteBlog){
            res.status(404).send("Not Found");
        }
        //if Blog id of user is not equals to current user id
        if(deleteBlog.user.toString() !== req.user.id){
            res.status(401).send("Not Allowed to deleted others Blogs")
        }
        
        //deleting the note by id
        deleteBlog = await Blog.findByIdAndDelete(req.params.id);

        res.json(deleteBlog);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

//paginated blogs
router.get('/blogs',paginatedResults(Blog) , (req,res)=>{
    res.json(res.paginatedResults)
})



module.exports = router;
