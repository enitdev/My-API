const request = require('express/lib/request');
const createError = require('http-errors');

let bookList = [];
let id = 0;

exports.index = function (request, respond) {
    // respond.send(bookList);
    respond.send(bookList)
}

exports.show = function (request, respond, next) {
    const bookItem = bookList.find( (book) => book.id == request.params.id)
    if(!bookItem) {
        return(next (createError(404, "No book with that ID") ) );
    }
    respond.send(bookItem);
}

exports.create = function(request, respond, next) {
    if ( (!request.body.title) || (!request.body.author) || (!request.body.url) ){

        return (next (createError(400, "Please complete all fields: Title, Author, read status, URL") ) )
    }

    bookList.push(
        {
            id: id,
            title: request.body.title,
            author: request.body.author,
            status: request.body.status || false,
            url: request.body.url
        }
    );
    id++;
    respond.send({result: true});
}

exports.delete = function(request, respond, next) {
    const bookItem = bookList.find( (book) => book.id == request.params.id)
    if(!bookItem) {
        return(next (createError(404, "No book with that ID") ) );
    } 
    bookList = bookList.filter( (book) => book.id != request.params.id)
    respond.send( {result: true} )
}

exports.update = function(request, respond, next) {
    const bookItem = bookList.find( (book) => book.id == request.params.id)
    if(!bookItem) {
        return(next (createError(404, "No book with that ID") ) );
    } 
    if(!request.body.title) {
        return (next (createError(400, "Book title is required") ) )
    }

    bookList = bookList.map( (book) => {
        if(book.id ==request.params.id) {
            book.title = request.body.title,
            book.author = request.body.author,
            book.status = request.body.status || false,
            book.url = request.body.url
        }
        return book;
    })
    respond.send( {result: true} )

}