const Client = require("../modules/Client.modul")
const Book = require("../modules/Book.modul")
module.exports.clientController = {
    postClient: (req, res) => {
        Client.create({
            name: req.body.name,
        })
            .then((data) => {
                res.json(data)
            })
            .catch(() => {
                res.json('Ошибка при создании клиента')
            })
    },
    deleteClient: (req, res) => {
        Client.findByIdAndRemove(req.params.id)
            .then(() => {
                res.json('Клиент удален')
            })
            .catch(() => {
                res.json('Ошибка при удалении клиента')
            })
    },
    getClient: (req, res) => {
        Client.find()
            .then((data) => {
                res.json(data)
            })
            .catch(() => {
                res.json('Ошибка при выводе клиентов')
            })
    },
    getClientById: async (req, res) => {
        try {
            const data = await Client.findById(req.params.id)
            res.json(data)
        } catch (e) {
            res.json('Ошибка при выводе клиента')
        }
    },
    patchClient: (req, res) => {
        Client.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            bookIsRented: req.body.bookIsRented,
            isBlocked: req.body.isBlocked,
        })
            .then((data) => {
                res.json(data)
            })
            .catch(() => {
                res.json('Ошибка при измении клиента')
            })
    },

    bookRend: async (req, res) => {
        try {
            const client = await Client.findById(req.params.id);
            const book = await Book.findById(req.body.bookId)

            if (client.isBlocked === false) {
                if (client.bookIsRented.length < 3) {
                    if (book.client == null) {

                        await Client.findByIdAndUpdate(req.params.id, {
                            $push: { bookIsRented: req.body.bookId }
                        })
                        await Book.findByIdAndUpdate(req.body.bookId, {
                            client: req.params.id
                        })

                        res.json('книга успешно арендована')

                    } else {
                        res.json("эта книга уже арендована другим пользователем")
                    }
                } else {
                    res.json('нельзя арендовать больше 3-х книг одновременно')
                }
            } else {
                res.json('Пользователь заблокирован')
            }

        } catch (error) {
            res.json(error)
        }
    },
    returnBook: async (req, res) => {
        try {
            await Client.findByIdAndUpdate(req.params.id, {
                $pull: { bookIsRented: req.params.id }
            });

            await Book.findByIdAndUpdate(req.params.id, {
                client: 0,
                bookIsRented: false,
            });
            res.json('Книга возвращена')
        } catch (error) {
            res.json(err)
        }
    },
    bookBlock: async (req, res) => {
        try {
            await Client.findByIdAndUpdate(req.params.id, {
                bookIsRented: [],
                isBlocked: true
            });
            await Book.findByIdAndUpdate(req.body.bookIsRented, {
                client: null
            })
            res.json('Пользователь заблокирован')
        } catch (error) {
            res.json(error)
        }
    }

}