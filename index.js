const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
app.use(require('./routers/book.route'))
app.use(require('./routers/client.route'))
app.use(require('./routers/genre.route'))
app.use(require('./routers/review.route'))


mongoose.connect('mongodb+srv://mvdjabrail:1221@cluster0.5s8s8.mongodb.net/Online-Library', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Успешно соединились с сервером MongoDB'))
    .catch(() => console.log('Ошибка при соединении с сервером MongoDB'))

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${3000}`)
})