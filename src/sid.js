function headers() {
  let sid = localStorage.getItem("sessionID")
  return { sessionId: sid }
}
export default headers