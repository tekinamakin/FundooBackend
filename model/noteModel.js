const mongoose = require('mongoose')
const Schema = mongoose.Schema

var noteSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: ['true', 'User Id Required'],
        ref: 'userSchema'
    },
    title: {
        type: String,
        required: ['true', 'title required']
    },
    description: {
        type: String,
        //required: ['true', 'description required']
    },
    reminder: {
        type: Date
    },
    color: {
        type: String
    },
    archive: {
        type: Boolean,
        default: 'false'
    },
    trash: {
        type: Boolean,
        default: 'false'
    },

    label: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Label'
        }
    ]
},
    {

        timestamps: true
    });

var note = mongoose.model('Note', noteSchema)


class NoteModel {

    constructor() { }
    /**
     * This can be used for creating new items
     * @param {Description:save any new item coming from services} newItem 
     * @param {callback} callback 
     */
    saveItem(newItem, callback) {
        var saveObj = new note(newItem)
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
        
        note.find(searchWith)
                     .populate('Label')
                     .exec(function(err, result) {
                if (err) {
                    callback(err)
                }
                else {
                    callback(null, result)

                }
            })
    }

    findCard(searchWith, callback) {
        console.log("checking searchusing id", searchWith);
        
        note.findOne({_id:searchWith.noteID},(err,data)=>{
            if (err) {
                callback(err)
            }
            else {
                callback(null, data)

            }
        })
                   
    }

    /**
     * This can be used for updating existing items
     * @param {*} itemId 
     * @param {*} updateField 
     * @param {*} callback 
     */
    updateItem(itemId, updateField, callback) {
       // console.log("printttt", itemId, updateField);

        note.findByIdAndUpdate({ '_id': itemId }, updateField, (err, result) => {
            if (err) {
                callback(err)
            }
            else {
                console.log("-----result-->", result);
                callback(null, result)
            }
        })
    }

    /**
     * This can be used for deleting any item
     */
    deleteItem(itemId, callback) {
        console.log("delete some items", itemId);
        note.findOneAndDelete({ '_id': itemId }, (err, result) => {
            if (err) {

                callback(err)
            }
            else {

                callback(null, result)
            }
        })
    }
}

module.exports = new NoteModel()



// function noteModel() { }

// //================================================================================================>
// noteModel.prototype.createNote = (data, callback) => {
//     try {

//         var newNote = new note({
//             userId: data.userId,
//             title: data.title,
//             description: data.description,
//             reminder: data.reminder,
//             color: data.color,
//             label: data.label,
//             archive: data.archive
//         })

//         newNote
//             .save((err, result) => {

//                 if (err) {

//                     callbaStringck(err)
//                 }
//                 else {

//                     callback(null, result)
//                 }
//             })
//     }
//     catch (error) {

//         callback.status(400).send({

//             success: false,
//             message: "catch the create note in model"
//         })
//     }

// }


// noteModel.prototype.deleteNote = (noteId, callback) => {
//     //console.log("id is",id);
//     try {
//         console.log("id is", noteId);


//         note.deleteOne({
//             _id: noteId
//         }, (err, result) => {
//             if (err) {
//                 console.log("Error in model for deleting Notes", err)
//                 callback("Error in model for deleting Notes")
//             }
//             else {
//                 console.log("Delete Note", result)
//                 // client.set(result.id + data, result);
//                 callback(null, result)
//             }
//         })
//     }
//     catch (error) {
//         console.log(" Catch the delete note Model Block");
//         callback.status(400).send({
//             success: false,
//             message: "Catch the delete note Model Block"
//         });
//     }
// }

// noteModel.prototype.editTitle = (noteId, titleParam, callback) => {
//     try {
//         note.findOneAndUpdate({
//             _id: noteId
//         }, {
//                 $set: {

//                     title: titleParam
//                 }
//             })
//     }
//     catch (error) {
//         callback.status(400).send({
//             success: false,
//             message: "catching error in the edit title"
//         })
//     }
// }



// noteModel.prototype.isTrashed = (noteId, trashNote, callback) => {
//     note.findOneAndUpdate({
//       _id: noteId
//     }, {
//       $set: {
//         trash: trashNote.status,
//         archive: null
//       }
//     },
//     (err, res) => {
//       if (err) {
//         console.log('Error in trashed')
//         callback(err)
//       } else {
//         console.log('trash ', res)
//         callback(null, res)
//       }
//     })
//   }




//     // noteModel.prototype.isArchived=(noteId,archiveNote,callback)=>{

//     //     note.findOneAndUpdate({_id:noteId},
//     //         {
//     //     $set:{
//     //         default:Note.status
//     //     }

//     //     },(err,result)=>{
//     //     if(err){

//     //         callback(err)
//     //     }
//     //     else{

//     //         callback(null,result)

//     //     }
//     //     })
//     //     }


    // noteModel.prototype.pagination = (userId, ddata, callback) => {
    //     try {
    //         console.log("printing query---------------->", ddata, userId);
    //         var perpage = ddata.size
    //         console.log("perpage", perpage)
    //         var pageNo = ddata.pageNo
    //         console.log("page number", pageNo)
    //         note.find({ "userId": userId })
    //             .skip((perpage * pageNo) - perpage)
    //             .limit(perpage)
    //             .then((paginationData) => {
    //                 console.log("query data is -->", paginationData, paginationData.length);
    //                 // var totalPage =  Math.ceil()  
    //                 callback(null, paginationData)
    //             })
    //             .catch((err) =>
    //                 callback(err))


    //     }
    //     catch (errors) {
    //         return callback.status(400).send({
    //             success: false,
    //             message: "Error catching in catch block of model-pagination "

    //         })


    //     }

    // }


//     noteModel.prototype.searchNotes = (searchUsing, callback) => {
//         note.find({
//             "$or": [{
//                 "noteID": searchUsing.noteID

//             }, {
//                 "title": searchUsing.title
//             }, {
//                 "description": searchUsing.description
//             }
//             ]
//         }, (err, result) => {
//             if (err) {

//                 callback(err)
//             }
//             else {

//                 callback(null, result)
//             }
//         });

//         /*
//         title:  
//         description:
//         reminder:
//         */

//     }

//     let model = new noteModel()
//     module.exports = model

//============================================================================================================>

// var collabSchema = mongoose.Schema({
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: 'userSchema'
//     },
//     noteId: {
//       type: Schema.Types.ObjectId,
//       ref: 'noteSchema'
//     },
//     collabId: {
//       type: Schema.Types.ObjectId,
//       ref: 'userSchema'
//     }
//   }, {
//     timestamps: true
//   })

//   var collab = mongoose.model('Collab', collabSchema)



//   class CollabModel {
//     constructor() { }
//   saveItems(newItem, callback) {
//     var saveObj = new collab(newItem)
//     saveObj.save((err, result) => {
//         if (err) {
//             callback(err)
//         }
//         else {
//             callback(null, result)
//         }
//     })
// }


//   }

//   module.exports = new CollabModel()