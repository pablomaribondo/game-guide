const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.addAdminRole = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth.token.admin) {
      return {
        error: "Only admins can add other admins!"
      }
    }

    const { email } = data;
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });

    return {
      message: `Success! ${data.email} has been made an admin`,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
});
