import config from '@/config'
import axios from 'axios'
const { API_URL } = config


async function generate(prompt, seed) {
  let sid = localStorage.getItem("sessionID")
  if (!sid) {
    return console.error(`no session id present..`)
  }
  let url = `${API_URL}/generate`
  let opts = {
    url,
    method: 'POST',
    data: {
      prompt,
      seed
    },
    headers: {
      sessionId: sid
    }
  }
  // console.log(`generating ${prompt} with seed ${seed}`)
  let res = await axios(opts)
  console.log(res.data)
  return res.data

}
function imageURL(id) {
  return `${API_URL}/getimage/${id}`
}
async function getImage(id) {
  let url = imageURL(id)
  // let url = `${API_URL}/getimage/${id}`
  let opts = {
    url
  }
  let res = await axios(opts)
  return res.data
}
function sleep(ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms))
}
async function waitImage(id) {
  let done = false
  let data = null
  while (!done) {
    console.log(`running loop`)
    let res = await getImage(id)
    // window.res = res
    if (res.success === false) {
      console.log(`not done..`)
    } else {
      data = res
      done = true
    }
    await sleep(600)
  }
  console.log(`loop exited..`)
  return data
}
export default {
  generate,
  waitImage,
  imageURL
}
