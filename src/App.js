import { useState, useEffect } from "react"

import { fetchToken, onMessageListener } from "./config/firebase"

function App() {
  const [token, setToken] = useState(false)

  useEffect(() => {
    fetchToken(setToken)
  }, [])

  onMessageListener()
    .then((payload) => {
      console.log({
        title: payload.notification.title,
        body: payload.notification.body,
      })
      console.log(payload)
    })
    .catch((err) => console.log("failed: ", err))

  return (
    <div>
      <h1>React Firebase Messaging</h1>
    </div>
  )
}

export default App
