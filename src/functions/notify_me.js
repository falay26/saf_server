const admin = require("firebase-admin");
const serviceAccount = require("../firebase/kismet-carki-firebase-adminsdk-u3huw-ff1d877789.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const NM = (message) => {
  var notif_message = {
    token:
      "evOegZ4sz07tmq1Fph6XaR:APA91bHEK4tpEa_sH1NNxjv15eWt2qX90ASUOPG6SHEpv1-BNrQWO-5RYWnxerzz4-xms7cWtGBTzyvr8lbgzJgPt4UDTV0eZW9LF0vT4L5r5Qpt0fkDPrLU6fXZpReSVPL7DkK5pPDE",
    notification: {
      title: "SBF",
      body: message,
    },
  };

  admin.messaging().send(notif_message);
};

module.exports = NM;
