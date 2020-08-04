const nodemailer = require('nodemailer');
const { resolveContent } = require('nodemailer/lib/shared');

// Gmail Provider Configuration
const GmailConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: '',
        pass: ''
    }
};

// Regular expression to test email addresses.
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Class to send emails via nodemailer.
 * 
 * @version 1.0
 * 
 * @author José Aguilar <jc.aguilar1308@gmail.com>
 */
class EmailSender {

    /**
     * Create a new object to send emails.
     */
    constructor() {
        this.transporter = null;
    }

    /**
     * Set the authtentication options of the Gmail configuration.
     * 
     * After setting the user and password, the class transporter
     * is created with the Gmail configuration. Both the user and
     * pass should be given as plain-text.
     * 
     * @param {string} user the account to use to send the mails.
     * 
     * @param {string} pass the password for the given account.
     */
    auth(user, pass) {
        GmailConfig.auth.user = user;
        GmailConfig.auth.pass = pass;

        // Create the transporter
        this.config(GmailConfig);
    }

    /** Configure the email transporter.
     * 
     * This method creates the transporter, which is the entity 
     * responsible of communicate with the email provider server 
     * (including authentication). 
     * 
     * @param {object} conf a provider configuration object.
     */
    config(conf) {
        this.transporter = nodemailer.createTransport(conf);
    }

    /**
     * Send an email.
     * 
     * The email's data is provided as an object, which MUST contain at
     * least the following attributes:
     * 
     * - body {string}: the email's content, either as plain text, or 
     *     it can include HTML tags. If no body is provided, an Error
     *     will be thrown.
     * 
     * - to {string|array}: the email's addressee. It can be either a 
     *     single string OR an array of strings, each one being a 
     *     different addressee. Either way, strings provided via this 
     *     attribute must be well-formed email addresses, otherwise an
     *     Error will be thrown.
     * 
     * Additionaly, the data can contain additional information, like:
     * 
     * - from {string}: the name of the sender. This value appears on
     *     the 'from' field of the email, and as such it needs not to
     *     be a well-formed email address.
     * 
     * - subject {string}: the subject of the email.
     * 
     * - cc {string|array}: addressees to send carbon-copies of the 
     *     email, either as a single string or an array of them. Like
     *     the 'dest' attribute, they must be well-formed email 
     *     addresses or an Error will be thrown.
     * 
     * @param {object} data the email's data.
     * 
     * @returns {object} an object containing the result of the operation.
     */
    send(data) {
        // If the transporter is not set, mail cannot be sent!
        if(!this.transporter)
            throw new Error(`(700): Transporter hasn\'t been created! 
              Call EmailSender.auth with a valid user account and password if
              Gmail is desired as the provider, or call EmailSender.config 
              providing a configuration object for a different provider.`);

        // Validate the destination
        let dest = this.validateDest(data.to);

        // If destination is invalid, throw an exception
        if(!dest) throw new Error(`(701): Invalid destination: ${data.to}`);

        // If body is empty, it makes no sense to send it.
        if(!('body' in data)) throw new Error('(702): Mail needs a body!');

        // Extract email's attributes from data
        let from = 'from' in data ? data.from : 'John Doe';
        let subject = 'subject' in data ? data.subject : 'Sample mail';

        // Create mail structure
        let mail = {
            from: from,
            to: dest,
            subject: subject,
            html: data.body
        };

        // If carbon-copy addressees are given, validate them as well
        if('cc' in data) {
            let cc_dest = this.validateDest(data.cc);

            if(cc_dest) 
                mail.cc = cc_dest;
            // If false, then cc contains an invalid address
            else 
                throw new Error(`(703): Invalid cc destination: ${data.cc}`)
        }

        return this.transporter.sendMail(mail);
    }

    /**
     * Verify the destination addressee's of the email.
     * 
     * The method first check if the addressee is a single string or an
     * array of them, to then proceed to check if they're well-formed
     * email addresses.
     * 
     * If both tests are passed, then the method returns a single string
     * with the format required by nodemailer. If any string given isn't
     * a well-formed email, of if an unexpected argument is passed (for
     * example, an object or number), then the method returns false.
     * 
     * @param {string|array} to the addressee(s) of the mail.
     * 
     * @returns {string|boolean} if the addressee is valid, a string
     *   with the format required by nodemailer to specify the 
     *   destination; false otherwise.
     */
    validateDest(to){
        let return_value = false;

        // Check a single-string addressee
        if(typeof to === 'string') {
            return_value = EMAIL_REGEX.test(to) ? to : false;
        // Check an array of addressees
        } else if(to instanceof Array){
            let valid = true;

            // Validate each string is well-formed
            to.forEach(el => valid = valid && EMAIL_REGEX.test(el));

            // Join strings if they're valid
            return_value = valid ? to.join(', ') : false;
        }

        // Any other value should be considered as invalid
        return return_value;
    }
    
}

module.exports = EmailSender;