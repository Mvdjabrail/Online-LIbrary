const Book = require("../modules/Book.modul")

module.exports.bookController = {
    postBook: (req, res) => {
        Book.create({
            name: req.body.name,
            genre: req.body.genre,
        }).then((data) => {
            res.json(data)
        })
            .catch(() => {
                res.json('Ошибка при создании книги')
            })
    },
    getBook: (req, res) => {
        Book.find(req.params.id)
            .then((data) => {
                res.json(data)
            })
            .catch(() => {
                res.json('Ошибка при выводе книг')
            })
    },
    deleteBook: (req, res) => {
        Book.findByIdAndRemove(req.params.id)
            .then(() => {
                res.json('Книга удалена')
            })
            .catch(() => {
                res.json("Ошибка при удалении книни")
            })
    },
    getBookId: (req, res) => {
        Book.findById(req.params.id)
            .then((data) => {
                res.json(data)
            })
            .catch(() => {
                res.json('Ошибка при выводе книги')
            })
    },
    updateBook: (req, res) => {
        Book.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            genre: req.body.genre,
            client: req.body.client,
            isRented: req.body.isRented,
        })
            .then((data) => {
                res.json(data)
            })
            .catch(() => {
                res.json("Ошибка при изменении книги")
            })
    }
}