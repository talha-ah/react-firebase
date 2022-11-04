// Imports
import { initializeApp } from "firebase/app"
import { getMessaging, getToken, onMessage } from "firebase/messaging"

// Web app's Firebase configuration
import FirebaseConfig from "../firebase.json"
import { requestPermissions } from "../utils/permissions"

const { firebaseConfig } = FirebaseConfig

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey: FirebaseConfig.messagingToken,
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken)
        setTokenFound(true)
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        )
        requestPermissions().then((permissions) => {
          if (permissions) {
            setTokenFound(true)
          }
        })
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err)
      // catch error while creating client token
    })
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload)
    })
  })
