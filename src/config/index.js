// let { NODE_ENV } = process.env

let devUrl = "http://localhost:6701"
// let prodUrl = "https://gallery.redapt.io"

var productionNats = ""
var devNats = "ws://127.0.0.1:8081"
var NATS_URL = devNats

export default {
  API_URL: devUrl,
  NATS_URL,
  // API_URL: NODE_ENV == 'production' ? prodUrl : devUrl

}
