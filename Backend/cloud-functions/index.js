/* eslint-disable max-len */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();
const db = admin.firestore();

console.log("Starting");

exports.fetchWeatherAlerts = functions.pubsub.schedule("every 1 minutes").onRun(async (context) => {
  const apiUrl = "https://api.weather.gov/alerts/active";

  try {
    const response = await axios.get(apiUrl);
    const alerts = response.data.features;

    alerts.forEach(async (alert) => {
      const {id} = alert.properties; // Access the properties object to get the ID
      const docRef = db.collection("weatherAlerts").doc(id); // Use the ID as the document reference

      try {
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
          await docRef.set(alert); // Set the alert as the document data
          console.log(`Added weather alert: ${id}`);
        } else {
          console.log(`Weather alert already exists: ${id}`);
        }
      } catch (error) {
        console.error("Error checking Firestore document:", error);
      }
    });
  } catch (error) {
    console.error("Error fetching weather alerts:", error);
  }
});
