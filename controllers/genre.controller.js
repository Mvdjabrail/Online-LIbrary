const Genre = require("../modules/Genre.modul")

module.exports.genreController = {
    postGenre: (req, res) => {
        Genre.create({
            name: req.body.name,
            discription: req.body.discription
        })
            .then((data) => {
                res.json(data)
            })
            .catch(() => {
                res.json('Ошибка при создании жанра')
            })
    },
    getGenre: (req, res) => {
        Genre.findById(req.params.id)
            .then((data) => {
                res.json(data)
            })
            .catch(() => {
                res.json('Ошибка при выводе жанра')
            })
    },
    deleteGenre: (req, res) => {
        Genre.findByIdAndRemove(req.params.id)
            .then(() => {
                res.json('Жанр удален')
                    .catch(() => {
                        res.json('Ошибка при удалении жанра')
                    })
            })
    },
    updateGenre: (req, res) => {
        Genre.findByIdAndUpdate(req.params.id, {
            name: req.body.discription,
            discription: req.body.discription
        })
            .then((data) => {
                res.json(data)
            })
            .catch(() => {
                res.json('Ошибка при изменении жанра')
            })
    }
}