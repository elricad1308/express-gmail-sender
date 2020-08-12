var express = require('express');
var router = express.Router();

const app = express();
//const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

// Create the body parser and multer (to extract POST data)
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.single('file'));

/** A call to route's root shows the form */
router.get('/', (req, res, next) => {
    res.render('distance', { title: 'Cálculo de distancias'})
});

/** A call to 'calc' computes distance */
router.post('/calc', (req, res, next) => {
    let data = req.body;
    console.log(req.file);

    res.send(data);
});

module.exports = router;