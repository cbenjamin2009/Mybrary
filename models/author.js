const mongoose = require('mongoose')
const Book = require('./book')
//create schema for database
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

//add method before delete to check for books attached to author
authorSchema.pre('remove', function(next){
    Book.find({author: this.id}, (err, books) => {
        if (err){
            next(err)
        } else if (books.length > 0) {
            next(new Error('This author has books still in the database'))
            //to delete all books withh author do the following 2 lines
            // books.forEach(book => book.remove())
            //next()
        } else{
            next()
        }
    })
})

module.exports = mongoose.model('Author', authorSchema)