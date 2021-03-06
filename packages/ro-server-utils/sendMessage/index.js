const twilio = require('twilio');
const fs = require('fs');

const twilioInfo = {
  accountSid: fs.readFileSync(process.env.TWILIO_SID, 'utf8'),
  authToken: fs.readFileSync(process.env.TWILIO_AUTH_TOKEN, 'utf8'),
  sourcePhoneNum: fs.readFileSync(process.env.TWILIO_PHONE_NUM, 'utf8'),
}
const { accountSid, authToken } = twilioInfo;

const client = new twilio(accountSid, authToken);

const sendText = async (opts) => {
  try{
    const message = await client.messages.create({
        body: opts.message,
        to: `+1${opts.recipient}`,  // Text this number
        from: twilioInfo.sourcePhoneNum // From a valid Twilio number
    })
    return message; 
  }catch(e){
    console.error(e);
    throw e;
  }
}

const validStrategies = {
  'text': sendText
}
const sendMessage = (strategy, opts, storeVar='results') => {
  return async (req, res, next) => {
    try {
      const result = await validStrategies[strategy](opts);
      res.locals[storeVar] = result;
      next();
    }catch(e){
      next(e);
    }
  }
}

module.exports = sendMessage;