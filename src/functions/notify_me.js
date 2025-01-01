const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.JSON_1,
    project_id: process.env.JSON_2,
    private_key_id: process.env.JSON_3,
    private_key:
      "-----BEGIN PRIVATE KEY-----\n" +
      process.env.JSON_4.replace(/\\n/g, "\n") +
      "\n-----END PRIVATE KEY-----\n",
    client_email: process.env.JSON_5,
    client_id: process.env.JSON_6,
    auth_uri: process.env.JSON_7,
    token_uri: process.env.JSON_8,
    auth_provider_x509_cert_url: process.env.JSON_9,
    client_x509_cert_url: process.env.JSON_10,
    universe_domain: process.env.JSON_11,
  }),
});

const NM = (message) => {
  try {
    var notif_message = {
      token:
        "evOegZ4sz07tmq1Fph6XaR:APA91bHEK4tpEa_sH1NNxjv15eWt2qX90ASUOPG6SHEpv1-BNrQWO-5RYWnxerzz4-xms7cWtGBTzyvr8lbgzJgPt4UDTV0eZW9LF0vT4L5r5Qpt0fkDPrLU6fXZpReSVPL7DkK5pPDE",
      notification: {
        title: "SBF",
        body: message,
      },
    };

    admin.messaging().send(notif_message);
  } catch (e) {
    console.log(e);
  }
};

module.exports = NM;
