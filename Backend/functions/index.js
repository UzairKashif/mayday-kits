/* eslint-disable max-len */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
admin.initializeApp();
const db = admin.firestore();

console.log("Starting");

exports.fetchEarthquakeData = functions.pubsub.schedule("every 1 minutes").onRun(async (context) => {
  const url = "https://earthquake.usgs.gov/fdsnws/event/1/query";
  const params = {
    format: "geojson",
    starttime: "2024-01-01",
    endtime: "2024-02-02",
    minmagnitude: "3",
  };

  try {
    const response = await axios.get(url, {params});
    const features = response.data.features;
    features.forEach(async (feature) => {
      const {id} = feature;
      const doc = await db.collection("earthquakes").doc(id).get();
      console.log(`Attempting to add earthquake: ${id}`, feature);
      if (!doc.exists) {
        await db.collection("earthquakes").doc(id).set(feature);
        console.log(`Added earthquake: ${id}`);
      }
    });
  } catch (error) {
    console.error("Error fetching earthquake data:", error);
  }
});
