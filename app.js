const { render } = require('ejs');
const express = require('express')
const mongoose = require('mongoose')
const Contact = require('./models/contactsSchema')


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

app.get('/contacts', (req, res) => {
    //res.render('index')
    // display list
    Contact.find().sort({ createdAt: -1 }) 
    .then((result) => {
        res.render('index', { title: 'All List', listItems: result })
    })
    .catch((err) => { console.log(err) })

})

app.post('/contacts', (req, res) => { //--> save route
    // console.log(req.body) //for testing only
    // res.redirect('/contacts')

    //create a new instance of Contact and pass the req.body
    const contact = new Contact(req.body);

    contact.save()
        .then(() => {
            //redirect to app.get('/contacts) for rendering
            res.redirect('/contacts')
        })
        .catch((err) => { console.log(err) })

})

//ADD a contact to the list
app.get('/contacts/addList', (req, res) => {

    //(EJS)
    res.render('addFone', { title: 'Add List View'})

})

//extract the request parameter with (:)
app.get('/contacts/:id', (req, res) => {
    //extract the params
    const id = req.params.id;
    //console.log(id);

    Contact.findById(id)
    .then((result) => {
        res.render('contactDetails', { listItems: result, title: '' })
    })
    .catch((err) => { console.log(err) })
})

//pass to editFone.ejs for updating. Extract the request parameter with (:)
app.get('/contacts/update/:id', (req, res) => {
    //extract the params
    const id = req.params.id;
    //console.log(id);

    Contact.findById(id)
    .then((result) => {
        res.render('editFone', { listItems: result, title: '' })
    })
    .catch((err) => { console.log(err) })
})

//save the updates and redirect to index page
app.post('/contacts/update/:id', (req, res) => {
    //extract the params
    const id = req.params.id;
    
    Contact.findOneAndUpdate({ _id: id }, req.body, { new: true })
    .then(() => {
        //redirect to app.get('/contacts) for rendering
        res.redirect('/contacts')
    })
    .catch((err) => { console.log(err) })
})

//delete handler
app.delete('/contacts/:id', (req, res) => {
    
    const id = req.params.id;

Contact.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/contacts' })
    })
    .catch((err) => { console.log(err) })

})

// 404 page
app.use((req, res) => {
    //(EJS)
    res.status(404).render('404', { title: '404 View'})
})
