redis = require('redis');
require('dotenv').config()
client = redis.createClient({});
client.on('connect', () => {
    console.log("Connection Establish With Redis")
})
client.on('error', (err) => {
    console.log("Error in redis connection", err)
})


/**
 * @desc setRedis takes details and stores in redis cache
 * @param details contails data about labels or user
 * @param callback returns err or data to called function
 * @return   promise data resolve or reject
 */
exports.setRedis = (details, callback) => {
    try {
        console.log("in redis", details.id)
        /**hmset takes key as string , field and value */
        client.hmset(process.env.REDISKEY, details.id, JSON.stringify(details.value), (err, store) => {
            err ? callback(err) : callback(null, store)
        })
    } catch (e) {
        console.log(e)
    }
}

/**
 * @desc setRedis takes details and stores in redis cache
 * @param details contails data about labels or user
 * @param callback returns err or data to called function
 * @return   promise data resolve or reject
 */
exports.getRedis = (details, callback) => {
    try {

        /**hmset takes key as string , field and value */
        client.hmget(process.env.REDISKEY, details.id, (err, get) => {
            (err || !get[0]) ? callback(`cache error ${err}`) : (console.log("token set from cache"), callback(null, get))
        })
    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc delRedis search for the given details in cache, if found delete from cache in redis cache
 * @param details contails data about labels or user
 * @param callback returns err or data to called function
 * @return   promise data resolve or reject
 */
exports.delRedis = (details, callback) => {
    try {
        console.log(details)
        /**hmset takes key as string , field and value */
        client.hdel(process.env.REDISKEY, details.id, (err, del) => {
            err ? callback(err) : callback(null, del);
        })
    } catch (e) {
        console.log(e)
    }
}


