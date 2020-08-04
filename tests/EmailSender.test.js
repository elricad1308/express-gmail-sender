const EmailSender = require('../lib/EmailSender');
const emailSender = new EmailSender();
const nullEmailSender = new EmailSender();
const realEmailSender = new EmailSender();

// Set EmailSender's transporter to an empty provider, just for testing
emailSender.transporter = {};

// TO-DO: Replace with valid keys before testing!
realEmailSender.auth('user@mail.com', '123abc');


describe("Email address validation", () => {
    test("A single, well-formed email address is valid", () => {
        const singleEmail = 'foo@example.com';

        const validation = emailSender.validateDest(singleEmail);

        expect(validation).toMatch(singleEmail);
    });

    test("Multiple, well-formed email addresses are valid", () => {
        const multipleEmails = ['foo@example.com', 'bar@example.com', 'spam@example.com'];
        const multipleEmailsJoined = multipleEmails.join(', ');

        const validation = emailSender.validateDest(multipleEmails);

        expect(validation).toMatch(multipleEmailsJoined);
    });

    test("A single not-email value is invalid", () => {
        const malformedEmail = 'foo@bar';

        const validation = emailSender.validateDest(malformedEmail);

        expect(validation).toBeFalsy();
    });

    test("A single malformed address is sufficient for an array to be mal-formed", () => {
        const malformedEmails = ['foo@example.com', 'bar@example.com', 'spam@eggs'];

        const validation = emailSender.validateDest(malformedEmails);

        expect(validation).toBeFalsy();
    });

    test("Non-string values are invalid (for example, numbers)", () => {
        const nonStringEmail = 1.2;

        const validation = emailSender.validateDest(nonStringEmail);

        expect(validation).toBeFalsy();
    });
});


describe("Email sending errors", () => {
    test("EmailSender must be configured before sending mails", () => {
        expect(() => {
            nullEmailSender.send({});
        }).toThrow(/(700)/)
    });

    test("EmailSender needs a valid destination to send mails", () => {
        expect(() => {
            emailSender.send({ to: 'foo@bar' });
        }).toThrow(/(701)/);
    });

    test("EmailSender needs an email body to send mails", () => {
        expect(() => {
            emailSender.send({ to: 'foo@example.com' });
        }).toThrow(/(702)/)
    });

    test("If cc addresses are present, they need to be well-formed", () => {
        expect(() => {
            emailSender.send({ 
                to: 'foo@example.com', 
                body: 'Hello!', 
                cc: 'spam@egss'
            });
        }).toThrow(/(703)/)
    });
});


describe("Email sending", () => {
    const realEmailData = {
        body: 'This is just a test email',
        to: ['jcaguilar@onlab.mx', 'shiningdragon_1308@hotmail.com'],
        cc: ['jc.aguilar1308@live.com.mx'],
        from: 'JEST test-email@jest.com',
        subject: "Automatized email test"
    };

    test('send a mail to two addresses and one cc', async () => {
        expect.assertions(4);

        const info = await realEmailSender.send(realEmailData);

        expect(info.response.startsWith('2')).toBeTruthy();
        expect(info.accepted.length).toBe(3);
        expect(info.rejected.length).toBe(0);
        expect(info.messageId).toBeDefined();
    });

});