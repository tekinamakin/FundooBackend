const noteModel = require('../model/noteModel')
const noteModelClassObj = require('../model/noteModel')
const collabModelClassObj = require('../model/collabModel')

/**
 * @description :create a new note --services
 * @param {* requested from frontend } noteContent
 * @param {* response to backend} callback
 */
exports.createNote = (noteContent, callback) => {
    try {
        noteModelClassObj.saveItem(noteContent, (err, result) => {
            if (err) {
                callback(err)
                console.log("error in noteServices", err)
            }
            else {
                callback(null, result)
                console.log("printing result", result)
            }
        })
    }
    catch (err) {
        return res.status(400).send({
            success: false,
            message: "catch in noteServices"
        })
    }
}

/**
 * @description :delete a note --services
 * @param {* requested from frontend } noteID
 * @param {* response to backend} callback
 */
exports.deleteNote = (noteID, callback) => {
    try {
        var trashParam = {
            'trash': true
        }
        noteModelClassObj.updateItem(noteID,trashParam, (err, result) => {
            if (err) {
                console.log("Error in delete Note Services")
                callback(err)
            }
            else {
                console.log("Delete Note services");
                callback(null, result)
            }
        })
    }
    catch (err) {
        return res.status(400).send({
            success: false,
            message: "catch in delete notes services"
        })
    }
}




/**
 * @description :delete a note --services
 * @param {* requested from frontend } noteID
 * @param {* response to backend} callback
 */
exports.editTitle = (noteData, callback) => {
    try {
        console.log("trying to print data in attemptOne", noteData)
        var noteID = noteData.noteID
        var titleParam = {
            'title': noteData.title,
            "description":noteData.description,
            "reminder": noteData.reminder,
            "color":noteData.color


        }
        console.log("printing data in services edit title", noteID, titleParam);

        noteModelClassObj.updateItem(noteID, titleParam, (err, result) => {
            if (err) {
                console.log("error editing the title")
                callback(err)
            }
            else {

                callback(null, result)
            }
        })
    }
    catch (error) {
        return callback({
            success: false,
            message: "catch in edit title service"
        })
    }
}


/**
 * @description :Trash a note --services
 * @param {* requested from frontend } paramId
 * @param {* response to backend} callback
 */
exports.isTrashed = (paramId, callback) => {
    console.log("printing noteID", paramId)
    noteModelClassObj.findItem({ "_id": paramId }, (err, status) => {
        if (err) {
            callback(err)
        }
        else {
            console.log("printing whole status", status[0].trash);
            if (status[0].trash == false) {
                let statusData = {
                    $set: {
                        trash: true
                    }
                }
                noteModelClassObj.updateItem(paramId, statusData, (err, result) => {
                    if (err) {
                        callback(err)
                    }
                    else {
                        callback(null, result)
                    }
                })
            }
            else if (status.trash == true) {
                let statusData = {
                    $set: {
                        trash: false
                    }
                }
                noteModel.updateItem(paramId, statusData, (err, result) => {
                    if (err) {
                        callback(err)
                    }
                    else {
                        callback(null, result)
                    }
                })
            }
        }
    })
}



//--------------------------------------Archive------------------------------------------------------->
// exports.isArchived = (paramId, callback) => {
//     console.log("printing noteID", paramId)
//     if (status = false) {
//         let data = {

//             status: req.body.status

//         }
//         noteModel.isArchived(noteId, data, (err, result) => {

//             if (err) {

//                 callback(err)

//             }
//             else {

//                 callback(null, result)
//             }
//         })
//     }
//     else if (status = true) {

//         let data = {

//             status: false
//         }
//         noteModel.isArchived(noteId, data, (err, result) => {

//             if (err) {

//                 callback(err)

//             }
//             else {

//                 callback(null, result)
//             }
//         })
//     }
// }



exports.pagination = (queryData, callback) => {

    try {
        // console.log("<-------in service pagination :userId and pageNo,perPage--------->", userId, ddata)
        response = {}
        noteModelClassObj.findItem(queryData, (err, result) => {
            if (err) {
                callback({
                    success: false,
                    message: "error in passing query data from noteService to noteModel "
                })
            }
            else {
                callback(null, result)
            }
        })
    }
    catch (error) {
        console.log("printing error in catch block of pagination", error);

        return callback.status(400).send({
            success: false,
            message: "catch block in service pagination"
        })
    }
}

/**
 * 
 */
exports.searchNotes = (searchUsing, callback) => {
    console.log("just checking", searchUsing);

    var search = {
        $or: [//{
            //  "noteId":searchUsing._id
            //  },
            {
                "title": { $regex: searchUsing.key, $options: 'i' }
            }, {
                "description": { $regex: searchUsing.key, $options: 'i' }
            }
        ]
    }
    noteModelClassObj.findItem(search, (err, data) => {
        if (err) {

            callback(err)
        }
        else {

            callback(null, data)
        }

    })
}




exports.pushNotification = (userId, updateItem, callback) => {
    noteModelClassObj.updateItem(userId, updateItem, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result);
        }
    });
};

exports.getAllNotes = (userData,Data, callback) => {
    // var something={'userId':noteRelatedInfo.decoded.payload.userId}
    // console.log('............>',something);
    var searchUsing= {
        $and: [//{
            //  "noteId":searchUsing._id
            //  },
            {   "userId": userData.userId , 
                "trash":Data.trash,
                "archive":Data.archive
            }
        ]
    }

    noteModelClassObj.findItem(searchUsing, (err, result) => {
        if (err) {
            console.log('error in note services');
            callback(err)
        }
        else {
            callback(null, result)
        }

    })
}

exports.getNoteData=(noteData,callback)=>{
var searchUsing={
    noteID:noteData.noteID
}
noteModelClassObj.findCard(searchUsing,(err,result)=>{
if(err){
    callback(err)
}
else{
    callback(null,result)
}
})

}



exports.getAllTrashed=(userData,Data,callback)=>{


var searchUsing= {
    $and: [//{
        //  "noteId":searchUsing._id
        //  },
        {   "userId": userData.userId , 
            "trash":Data.trash,
            "archive":Data.archive
        }
    ]
}
noteModelClassObj.findItem(searchUsing,(err,result)=>{
if(err){
    console.log("printing error in getAllTrashService",err);
    callback(err)
}
else{

    callback(null,result)
}
})
}

exports.saveCollaborator = (collabData, callback) => {
    collabModelClassObj.saveItems(collabData, (err, result) => {
        if (err) {
            callback(err)
        } else {
            callback(null, result)
        }
    })
}




// /**
//  * @description : get collab notes
//  * @param {* requested from frontend } data
//  * @param {* response to backend } callback
//  */

// exports.getCollabNotes = (userId, callback) => {
//     try {
//         var finalResult = []
//         userData={
//             userId: userId
//           }
//         noteModel.findItem(userData, (err, result) => {
//             if (err) {
//                 callback(err)
//             } else {userInfo={ _id: userId }
//                 userModel.(userInfo, (errorUser, resultUser) => {
//                     if (errorUser) {
//                         callback(errorUser)
//                     } else {
//                         const noteOwner = {
//                             firstName: resultUser[0].firstName,
//                             lastName: resultUser[0].lastName,
//                             _id: resultUser[0]._id
//                         }
//                         // console.log("final Result 244 " ,noteOwner);
//                         for (var i = 0; i < result.length; i++) { //notes
//                             var userNote = {
//                                 note: result[i],
//                                 owner: noteOwner,
//                                 collab: []
//                             }
//                             finalResult.push(userNote)
//                             // console.log("final Result  "+ i ,userNote);
//                         } 
//                         noteModel.getCollabOwnerUserId(userData, (errorCollab, resultOwnerCollab) => {
//                             if (errorCollab) {
//                                 callback(errorCollab)
//                             } else {
//                                 console.log('resultcollabowner  ', resultOwnerCollab)
//                                 for (var i = 0; i < finalResult.length; i++) {
//                                     for (var j = 0; j < resultOwnerCollab.length; j++) {
//                                         if (finalResult[i].note._id.equals(resultOwnerCollab[j].noteId)) {
//                                             finalResult[i].collab.push(resultOwnerCollab[j].collabId)
//                                         }
//                                     }
//                                 }
//                                 callback(null, finalResult)
//                             }
//                         })
//                     }
//                 })
//             }
//         })
//     } catch (err) {
//         callback.status(400).send('Catch get notes with collab')
//     }
// }








