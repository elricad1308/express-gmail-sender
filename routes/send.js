var express = require('express');
var router = express.Router();

const app = express();
const bodyParser = require('body-parser');          // To extract POST data
const EmailSender = require('../lib/EmailSender');  // nodemailer class wrapper

// Create the body parser
app.use(bodyParser.urlencoded({ extended: true }));

/** A call to route's root send an email .*/
router.post('/', (req, res, next) => {
    // Retrieve email's data
    let data = req.body;

    // Create the email sender
    let emailSender = new EmailSender();

    // TO-DO: dummy auth conf, replace before releasing!
    emailSender.auth('user@mail.com', '123abc');

    let p = new Promise((resolve, reject) => {
            resolve(emailSender.send(data));
        })
        .then(info => {
            // info.response is the last SMTP sent by the server, if
            // it starts with a 2XX code then everything went OK.
            let success = info.response.startsWith('2');

            // response.accepted contains the list of addresses to
            // which the mail was sent
            let sent = info.accepted.length;

            // response.rejected contains the list of addresses to 
            // which the mail was NOT sent (either by an error, or 
            // because they don't exist)
            let not_sent = info.rejected.length;

            // Message ID is the mail's ID (not sure if useful, but it
            // doesn't hurt to include it)
            let message_id = info.messageId;

            // Finally, if an error ocurred, we include it as well
            // let error = err ? err : '';

            let result = {
                "success": success,
                "sent": sent,
                "notSent": not_sent,
                "message_id": message_id//,
                // "error": error
            };

            res.send(result)
        })
        .catch(err => {
            let errArgs = {
              message: 'Mail couldn\'t be sent',
              error: {
                status: 500,
                stack: err
              }
            };

            res.render('error', errArgs)
        });
});

/** GET requests are not allowed */
router.get('/', (req, res, next) => {
    let errorArgs = {
        message: "GET requests are not allowed",
        error: {
            status: 400,
            stack: ""
        }
    };

    res.render('error', errorArgs);
});

module.exports = router;
