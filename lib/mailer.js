var nodemailer = require('nodemailer');
var config = require('../config/secrets');

 
module.exports = function (opts, fn) {
 
  // nodemailer configuration
  var smtpTrans = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
      user: config.GmailAuth.email,
      pass: config.GmailAuth.password
    }
  });
 
  // mailing options
  var mailOpts = {
    from: opts.from,
    replyTo: opts.from,
    to: opts.to,
    subject: opts.subject,
    text: opts.body
  };

  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      fn(true, error);
    }
    else {
      fn(false, response.message);
    }
  });
};