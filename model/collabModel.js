const mongoose = require('mongoose')
const Schema = mongoose.Schema


var collabSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'userSchema'
    },
    noteId: {
        type: Schema.Types.ObjectId,
        ref: 'noteSchema'
    },
    collabId: {
        type: Schema.Types.ObjectId,
        ref: 'userSchema'
    }
}, {
        timestamps: true
    })

var collab = mongoose.model('Collab', collabSchema)



class CollabModel {
    constructor() { }
    saveItems(newItem, callback) {
        var saveObj = new collab(newItem)
        saveObj.save((err, result) => {
            if (err) {
                callback(err)
            }
            else {
                callback(null, result)
            }
        })
    }

    /**
       * find items using this find function
       * @param {*} searchUsing 
       * @param {*} callback 
       */
    findItem(searchWith, callback) {
        console.log("checking searchusing id", searchWith);

        collab.find(searchWith, (err, result) => {

            if (err) {
                callback(err)
            }
            else {
                callback(null, result)

            }
        })
    }
}

module.exports = new CollabModel()