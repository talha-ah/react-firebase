export const requestPermissions = async () => {
  return new Promise((resolve) =>
    Notification.requestPermission().then((permission) => {
      resolve(permission === "granted")
    })
  )
}
