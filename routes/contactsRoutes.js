const express = require('express')
const Contact = require('../models/contactsSchema')

const router = express.Router()


router.get('/', (req, res) => {
    //res.render('index')
    // display list
    Contact.find().sort({ createdAt: -1 }) 
    .then((result) => {
        res.render('index', { title: 'All List', listItems: result })
    })
    .catch((err) => { console.log(err) })

})

router.post('/', (req, res) => { //--> save route
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
router.get('/addList', (req, res) => {

    //(EJS)
    res.render('addFone', { title: 'Add List View'})

})

//extract the request parameter with (:)
router.get('/:id', (req, res) => {
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
router.get('/update/:id', (req, res) => {
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
router.post('/update/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    
    const id = req.params.id;

Contact.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/contacts' })
    })
    .catch((err) => { console.log(err) })

})


module.exports = router;