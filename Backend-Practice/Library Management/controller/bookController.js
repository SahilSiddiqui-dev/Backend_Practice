const Books = require('../models/bookSchema');
const mongoose = require('mongoose');
const isValidString = require('../utils/isValidString');
const asyncHandler = require('../utils/asyncHandler');
const isValdidNumber = require('../utils/isValidNumber');
const isValidNumber = require('../utils/isValidNumber');

exports.addBook = asyncHandler(async(req, res) => {
    const {title, author, category} = req.body;

    if(!isValidString(title) || !isValidString(author) || !isValidString(category)){
        return res.status(400).json({
            message : 'Please provide valid details'
        })
    }

    const bookExists = await Books.findOne({title});

    if(bookExists) {
        return res.status(409).json({
            message : 'Book already exists'
        })
    }

    const book = await Books.create({
        title,
        author,
        category
    })

    res.status(201).json({
        message : 'New book is added',
        data : book
    })
})


exports.getAllBooks = asyncHandler(async(req, res) => {
    const {limit, page} = req.query;

    const pageNumber = page !== undefined?Number(page):1;
    let limitNumber = limit !== undefined?Number(limit):5;

    if(!isValidNumber(limitNumber) || !isValidNumber(pageNumber)){
        return res.status(400).json({
            message : 'Please provide valid details'
        })
    }

    const filter = {
        availabilityStatus : true
    }

    limitNumber  = limitNumber < 50? limitNumber: 50;

    const skip = (pageNumber - 1) * limitNumber;

    const allBooks = await Books.find(filter).skip(skip).sort({createdAt : -1}).limit(limitNumber);
    const totalBooks = await Books.countDocuments(filter);
    const totalPages = Math.ceil(totalBooks/limitNumber);

    res.status(200).json({
        message : "All books fetched successfully",
        data : allBooks,
        metadata : {
            totalBooks,
            totalPages,
            pageNumber,
            limitNumber
        }
    })
    
})

exports.changeStatus = asyncHandler(async(req, res) => {
    const {id} = req.params;

    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({
            message : 'provide valid id'
        })
    }

    const bookExists = await Books.findById(id, {availabilityStatus : false});

    if(!bookExists) {
        return res.status(401).json({
            message : "Book with this id is not found"
        })
    }
    
    res.status(200).json({
        data : bookExists,
        message : 'Book status is updated'
    })

})