const noteServices = require('../service/noteServices')
const logger = require('../logger/logger')
const redis = require('../middleware/redisService')
/**
 * @description : creating a new note using this api.
 * @param {* requested from frontend } req
 * @param {* responce to backend} res
 */
exports.createNote = (req, res) => {
    try {
        var response = {}
        var errors = req.validationErrors()
        var noteData = {
            userId: req.decoded.payload._id,
            title: req.body.title,
            description: req.body.description,
            reminder: req.body.reminder,
            color: req.body.color,
            label: req.body.label,
            archive: req.body.archive
        }

        if (errors) {

            response.success = false;
            response.errors = errors
            return res.status(400).send(response)
        } else {
            noteServices.createNote(noteData, (err, result) => {
                if (err) {

                    response.success = false
                    //response.error = err
                    logger.logger.error("Error in createNote  api")
                    return res.status(400).send(response)

                } else {
                    response.success = true
                    response.result = result
                    return res.status(200).send(response)
                }
            })
        }
    } catch (error) {
        console.log("catching error in catch block of controller")
        res.status(400).send({
            success: false,
            message: "create note controller catch"
        })
    }
}

/**
 * @description : Deleting an existing note using this api.
 * @param {* requested from frontend } req
 * @param {* responce to backend} res
 */
exports.deleteNote = (req, res) => {
    try {
        req.checkBody('noteID', "note Id required").not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.success = false;
            response.errors = errors;
            return res.status(400).send(response);
        } else {
            var noteID = req.body.noteID
            console.log("print noteID", noteID);
            noteServices.deleteNote(noteID, (err, result) => {
                if (err || result === undefined) {
                    response.success = false;
                    //response.error = err;
                    logger.logger.error("Error in deleteNote  api")
                    return res.status(400).send(response);
                } else {
                    response.success = true;
                    response.result = result;
                    response.message = "Note has been trashed successfully"
                    return res.status(200).send(response);
                }
            })
        }
    } catch (error) {
        console.log("Delete note Controller Catch", error);
        res.status(400).send({
            success: false,
            message: "Delete note Controller catch"
        });
    }
}


/**
 * @description : Editing a title of the note using editTitle api
 * @param {* requested from frontend } req
 * @param {* responce to backend} res
 */
exports.updateNote = (req, res) => {
    try {
        req.checkBody('noteID', "note Id required").not().isEmpty();
        var response = {}
        var errors = req.validationErrors()
        var id = {
            noteID: req.body.noteID
        }

        noteServices.getNoteData(id, (err, result) => {
            if (err)
                return res.status(200).send(err)
            else {
                console.log("Printing single note content", result);
                // return res.status(200).send(result)
                var noteData = {
                    noteID: req.body.noteID,
                    color: req.body.color ? req.body.color : result.color,
                    title: req.body.title ? req.body.title : result.title,
                    description: req.body.description ? req.body.description : result.description,
                    reminder: req.body.reminder
                    //? req.body.reminder : result.reminder,
                }
                noteServices.updateNote(noteData, (err, result) => {
                    if (err) {

                        response.success = false
                        //response.error = err
                        logger.logger.error("Error in createNote api")
                        return res.status(400).send(response)


                    } else {
                        response.success = true
                        response.result = result
                        console.log("printing result in  edittitle", result);

                        return res.status(200).send(response)

                    }
                })
            }
        })
    } catch (error) {
        console.log("printing ERROR in catch block of edit title", error);

        console.log("edittitle controller catch")
        res.status(400).send({
            success: false,
            message: "edittitle controller catch "

        })

    }

}





exports.isArchived = (req, res) => {
    try {
        req.checkBody('noteID', "note Id required").not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.success = false;
            response.errors = errors;
            return res.status(400).send(response);
        } else {
            var noteID = req.body.noteID
            console.log("print noteID", noteID);
            noteServices.isArchived(noteID, (err, result) => {
                if (err || result === undefined) {
                    response.success = false;
                    //response.error = err;
                    logger.logger.error("Error in deleteNote  api")
                    return res.status(400).send(response);
                } else {
                    response.success = true;
                    response.result = result;
                    return res.status(200).send(response);
                }
            })
        }
    } catch (error) {
        console.log("Delete note Controller Catch", error);
        res.status(400).send({
            success: false,
            message: "Delete note Controller catch"
        });
    }
}



exports.pagination = (req, res) => {
    try {

        var pageNo = parseInt(req.query.pageNo)

        var size = parseInt(req.query.size)
        console.log("PAge nNo, Size -->", pageNo, size);
        var userId = req.decoded.payload._id
        //var paginationInfo = { pageNo, size }
        var query = {}
        var response = {}

        //var errors = req.validationErrors()
        query.userId = userId
        query.skip = size * (pageNo - 1)
        query.limit = size

        if (pageNo < 0 || pageNo === 0) {
            response = {
                "error": true,
                "message": "invalid page number, should start with 1"
            };
            return res.json(response)
        }
        // if (errors) {
        //     response.success = false
        //     response.errors = errors
        //     return res.status(400).send(response)
        // }
        // else {
        //console.log('query is -->',query);
        console.log("check1")
        noteServices.pagination(query, (err, result) => {
            console.log("check2");

            if (err) {

                response.success = false
                response.err = err
                return res.status(400).send(response)

            } else {

                response.success = true
                response.result = result
                return res.status(200).send(response)

            }
        })
    }
    //}
    catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "catch block in pagination"
        })
    }
}


exports.searchNotes = (req, res) => {

    try {
        //req.checkBody('noteID', 'noteID required').not().isEmpty();
        response = {}
        // errors = req.validationErrors()
        //var userId= req.decoded.payload._id
        var searchUsing = {
            key: req.body.key,
            //_id:req.body._id

        }
        console.log("==============================>", searchUsing);

        // if (errors) {
        //     response.success = false
        //     response.errors = errors
        //     res.status(400).send(response)

        // }
        // else {
        noteServices.searchNotes(searchUsing, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            } else {
                console.log(result)
                res.status(200).send(result)
            }
        })
    }
    // }
    catch (error) {
        console.log(error);

        res.status(400).send({
            success: false,
            message: "catch block in noteSearch controller"
        })
    }
}


exports.pushNotification = (req, res) => {
    try {

        req.checkBody("pushToken", "pushToken required")
            .not()
            .isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var userId = req.body.userId
            var updateItem = {
                $set: {
                    pushToken: req.body.pushToken
                }
            }
            var responseResult = {};
            noteServices.pushNotification(userId, updateItem, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            });
        }
    } catch (error) {
        res.send(error);
    }
};

exports.getAllNotes = (req, res) => {
    try {
        var details = {}
        var response = {}
        redis.getRedis(details, (error, data) => {
            if (error) {

                var userId = {
                    'userId': req.decoded.payload._id
                }
                var setValue = {
                    "trash": false,
                    "archive": false
                }
                console.log("printing userId over here =====>", userId);

                noteServices.getAllNotes(userId, setValue, (err, result) => {
                    if (err) {
                        response.status = false;
                        response.error = err;
                        res.status(500).send(response);
                    } else {
                        redis.setRedis(result)
                        response.status = true;
                        response.result = result;
                        res.status(200).send(result)
                    }
                })
            }

            else {
                console.log("printing user id", req.decoded.payload._id);

                response.id = req.decoded.payload._id
                // response.data = result
                response.status = true
                response.result = data
                res.status(200).send(response)
            }
        })
    }



    catch (error) {
        console.log("----------catch in getAllNotes", error);

        res.status(400).send({
            success: false,
            message: "catch block in getAllNotes"
        })
    }
}




exports.getAllTrashed = (req, res) => {

    try {

        // var errors = req.validationErrors()
        var response = {}
        //     if (errors) {
        //         response.success = false
        //         response.errors = errors
        //         res.status(400).send(response)
        //     }
        //     else {
        var userId = {
            'userId': req.decoded.payload._id
        }
        var setValue = {
            "trash": true,
            "archive": false
        }
        noteServices.getAllTrashed(userId, setValue, (err, result) => {
            if (err) {
                response.status = false;
                response.error = err;
                res.status(500).send(response);
            } else {
                response.status = true;
                response.result = result;
                res.status(200).send(result)
            }
        })
    }
    //}
    catch (error) {
        console.log("----------catch in getAllNotes", error);

        res.status(400).send({
            success: false,
            message: "catch block in getAllNotes"
        })
    }
}



exports.getArchivedNotes = (req, res) => {

    try {

        // var errors = req.validationErrors()
        var response = {}
        //     if (errors) {
        //         response.success = false
        //         response.errors = errors
        //         res.status(400).send(response)
        //     }
        //     else {
        var userId = {
            'userId': req.decoded.payload._id
        }
        var setValue = {
            "trash": false,
            "archive": true
        }
        noteServices.getArchivedNotes(userId, setValue, (err, result) => {
            if (err) {
                response.status = false;
                response.error = err;
                res.status(500).send(response);
            } else {
                response.status = true;
                response.result = result;
                res.status(200).send(result)
            }
        })
    }
    //}
    catch (error) {
        console.log("----------catch in getAllNotes", error);

        res.status(400).send({
            success: false,
            message: "catch block in getAllNotes"
        })
    }
}

/**
 * @description :saving collaborator details
 * @param {* requested from frontend } req
 * @param {* responce to backend} res
 */
exports.saveCollaborator = (req, res) => {
    // try {
    //   req.checkBody('id', 'user id required').not().isEmpty()
    //   req.checkBody('noteId', 'Note id required').not().isEmpty()
    //   req.checkBody('collabId', 'collabortor id required').not().isEmpty()
    //   var errors = req.validationErrors()
    var response = {}
    //   if (errors) {
    //     response.success = false
    //     response.errors = errors
    //     res.status(400).send(response)
    //   } else {
    const collabData = {
        userId: req.decoded.payload._id,
        noteId: req.body.noteId,
        collabId: req.body.collabId
    }
    console.log("printing collab data in save collab", collabData)
    noteServices.saveCollaborator(collabData, (err, result) => {
        if (err) {
            response.success = false
            response.error = err
            logger.logger.error("Error in saveCollaborator api")
            res.status(400).send(response)
        } else {
            response.success = true
            response.data = result
            res.status(200).send(response)
        }
    })
}
//     } catch (err) {
//         console.log("==========================>>>>",err);

//       res.status(400).send('catch save collaborator')
//     }
//   }



//===========================================================================================================,l
exports.getCollabNotes = (req, res) => {
    try {
        var response = {}
        var id = req.body.id
        noteServices.getCollabNotes(id, (err, result) => {
            if (err) {
                response.success = false
                response.error = err
                res.status(400).send(response)
            } else {
                response.success = true
                response.error = result
                res.status(200).send(response)
            }
        })

    } catch (err) {
        res.status(400).send('catch save collaborator')
    }
}


exports.getAllReminder = (req, res) => {
    // console.log("getAllReminder", req);

    var response = {}
    var obj = {
        "userId": req.decoded.payload._id,
        "reminder": { $ne: null }
    }
    console.log("Printing userId", obj);

    noteServices.getAllReminder(obj, (err, result) => {
        try {

            if (err) {
                response.success = false;
                response.message = "Error while getting notes with reminder"
                response.error = err
                return res.status(400).send(response)
            } else {
                response.success = true;
                response.message = "All reminder notes are displayed"
                response.result = result;
                return res.status(200).send(response);
            }
        } catch (err) {
            return err;
        }
    })
}

/**
 * Adding ratings on the note
 */
exports.addRatings = (req, res) => {
    try {
        req.checkBody('ratings')
            .isInt({
                min: 1
            })
            .withMessage('min 1 rating is required')
            .isInt({
                max: 5
            })
            .withMessage("max 5 ratings is allowed")

        var response = {
            success: false,
            message: "Error while displaying all notes..",
            data: {}
        }
        var errors = req.validationErrors()
        if (errors) {
            response.success = false;
            response.errors = errors;
            res.status(400).send(response)
        }
        else {
            var obj = {
                noteID: req.body.noteID,
                ratings: req.body.ratings
            }
            noteServices.addRatings(obj, (err, result) => {
                if (err) {
                    response.success = false;
                    response.message = "error while adding ratings on the note";
                    console.log("Error in controller of addRatings", err);
                    res.status(422).send(response)
                } else {
                    response.success = true;
                    response.message = "Ratings successfully added on the note";
                    response.data = result
                    res.status(200).send(response)
                }
            })
        }
    }

    catch (error) {

        console.log("Error in catch controller in of addRatings");
    }
}