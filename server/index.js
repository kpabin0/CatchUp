const app = require('./config/express.config')

const PORT_NUMBER = 8080

app.listen(PORT_NUMBER, () => {
    console.log("Server is listening at " + PORT_NUMBER)
})