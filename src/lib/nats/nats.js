import { connect, StringCodec } from "nats.ws";
import config from '@/config'
import sleep from '@/lib/sleep'
import random from '../random'

const { NATS_URL } = config

let isConnecting = false
let instance
const sc = StringCodec()

async function getInstance() {
    if (isConnecting) {
        await waitConnected()
        return instance
    }
    return await connectNats()
}
async function waitConnected() {
    let done = false
    while (!done) {
        if (instance) {
            break
        } else {
            await sleep(50)
        }
    }
}

async function connectNats() {
    isConnecting = true
    let start = Date.now()
    let nc = await connect({ servers: [NATS_URL] })
    let end = Date.now()
    let elap = end - start
    console.log(`connected to ${nc.getServer()} in ${elap}ms`)
    instance = nc
    return nc
}

let subs = {}

function removeSubscription(id) {
    console.log(`removing subscription for ${id}`)
    if (!id) {
        return console.log(`warning no subscription name passed..`)
    }
    let sub = subs[id].sub
    sub.drain()
        .then(r => console.log(`removed sub`, id))
        .catch(err => console.log(`error draining sub`, err))
    delete subs[id]

}
async function addSubscription(chan, callback) {
    let nc = await getInstance()
    let id = random(8)
    let sub = nc.subscribe(chan)
    subs[id] = { sub, callback }
    handleSub(id)
    return id

}
async function handleSub(id) {
    let sub = subs[id].sub
    try {
        for await (const m of sub) {
            if (!subs[id]) {
                console.log(`removing subscription..`)
                sub.drain()
                break
            }
            let s = sc.decode(m.data)
            subs[id].callback(s)
        }
        console.log(`sub drained.. outside loop`)
    } catch (e) {
        console.error(e)
    }
}

function encode(s) {
    return sc.encode(s)
}
function decode(s) {
    return sc.decode(s)
}
async function requestData(subj, data) {
    let nc = await getInstance()
    console.log(`sending nats request to ${subj}`)
    let v
    if (data) {
        let rs = JSON.stringify(data)
        v = await nc.request(subj, encode(rs))
    } else {
        v = await nc.request(subj)

    }
    return v
}

function isConnected() {
    if (instance) {
        return true
    } else {
        return false
    }
}

export default {
    connectNats,
    getInstance,
    addSubscription,
    removeSubscription,
    encode,
    decode,
    requestData,
    isConnected
}