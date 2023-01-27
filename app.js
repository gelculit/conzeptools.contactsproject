const { render } = require('ejs');
const express = require('express')
const mongoose = require('mongoose')

//declare the router
const contactsRoutes = require('./routes/contactsRoutes')



//express app
const app = express()


// database 01/05/2023 - connect to mongo db
const dbURI = 'mongodb+srv://conzeptUser:SrrjMSe4XbqeFNQE@conzeptools.1mgom8z.mongodb.net/conzeptContacts?retryWrites=true&w=majority';
mongoose.set('strictQuery', true); //, { useNewUrlParser: true, useUnifiedTopology: true } 2nd parameter to suppress deprecation warning
mongoose.connect(dbURI) // -> returns a promise
    .then((result) => {
        console.log('Connected to DB')
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err)
    })


// register view engine (EJS)
app.set('view engine', 'ejs') //-> if using a different folder, add: app.set('views', 'myViewsFolder')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.redirect('/contacts')
})

app.get('/about', (req, res) => {

    
    //(EJS)
    res.render('about')

})


///*** contactRoutes */
app.use('/contacts', contactsRoutes)


// 404 page
app.use((req, res) => {
    //(EJS)
    res.status(404).render('404', { title: '404 View'})
})
