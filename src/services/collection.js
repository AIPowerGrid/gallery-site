import axios from 'axios'
import config from '@/config'
import sidHeader from '@/sid'
const { API_URL } = config

async function getCollection(collectionName) {
  let opts = {
    url: `${API_URL}/collection/${collectionName}`,
    headers: sidHeader(),
  }
  let res = await axios(opts)
  return res.data
  return [{
    "_id": "glglgl",
    "imageUrl": "http://localhost:6700/getimage/f3a633bc-84a7-420a-871d-28d5c7d5574d",
    seed: Date.now(),
    prompt: "Wolf eating ice creamggggggggggggggggggggggggggg glglgl wpwpwww fffffffffffffp fffffffffffff"
  },
  {
    "_id": "glglgl",
    "imageUrl": "https://httpbin.org/image",
    "prompt": "wolf",
    "seed": Date.now()

  },

  {
    "_id": "glglgl",
    "imageUrl": "https://httpbin.org/image",
    "prompt": "wolf",
    "seed": Date.now()

  },
  {
    "_id": "glglgl",
    "imageUrl": "https://httpbin.org/image",
    "prompt": "wolf",
    "seed": Date.now()

  },

  {
    "_id": "glglgl",
    "imageUrl": "https://httpbin.org/image",
    "prompt": "wolf",
    "seed": Date.now()

  }
  ]

  // let res = await axios(opts)
  // return res.data

}
async function removeItem(collectionName, id) {
  let opts = {
    url: `${API_URL}/collection/${collectionName}/${id}`,
    method: 'DELETE',
    headers: sidHeader()
  }
  let res = await axios(opts)
  return res.data

}
async function addToCollection(id, jobid) {
  let opts = {
    url: `${API_URL}/collection/${id}/add?id=${jobid}`,
    headers: sidHeader()
  }
  let res = await axios(opts)
  return res.data
}
async function deleteCollection(id) {
  let opts = {
    url: `${API_URL}/collection/${collectionName}/${id}`,
    method: 'DELETE',
    headers: sidHeader()
  }
  let res = await axios(opts)
  return res.data
}
export default {
  getCollection,
  removeItem,
  deleteCollection,
  // create,
  addToCollection
}