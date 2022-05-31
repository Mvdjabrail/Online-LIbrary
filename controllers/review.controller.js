const Review = require("../modules/Review.modul")

module.exports.reviewController = {
    postReview: (req, res) => {
        Review.create({
            text: req.body.text,
            name: req.body.name,
            book: req.body.body,
        })
            .then((data) => {
                res.json(data)
            })
            .catch(() => {
                res.json("Ошибка при добавлении комментарии")
            })
    },
    deleteReview: (req, res) => {
        Review.findByIdAndRemove(req.params.id)
            .then(() => {
                res.json("Комментарий удален")
            })
            .catch(() => {
                res.json('Ошибка при удалении комментария')
            })
    }
}