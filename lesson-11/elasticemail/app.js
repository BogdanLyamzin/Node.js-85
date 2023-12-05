import ElasticEmail from '@elasticemail/elasticemail-client';
import "dotenv/config";

const {ELASTICEMAIL_API_KEY, ELASTICEMAIL_EMAIL_FROM} = process.env;
 
const defaultClient = ElasticEmail.ApiClient.instance;
 
const {apikey} = defaultClient.authentications;
apikey.apiKey = ELASTICEMAIL_API_KEY;
 
const api = new ElasticEmail.EmailsApi();

const email = ElasticEmail.EmailMessageData.constructFromObject({
  Recipients: [
    new ElasticEmail.EmailRecipient("jevaday315@mcenb.com")
  ],
  Content: {
    Body: [
      ElasticEmail.BodyPart.constructFromObject({
        ContentType: "HTML",
        Content: "<strong>Test email</strong>"
      })
    ],
    Subject: "Test email",
    From: ELASTICEMAIL_EMAIL_FROM,
  }
});
 
const callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};

api.emailsPost(email, callback);
