var services = require("../service/labelServices")

/**
 * creating a label using this method
 */

exports.createLabel = (req, res) => {
    try {
        req.checkBody('label', 'label required').not().isEmpty()
        var errors = req.validationErrors()
        var response = {}
        if (errors) {
            response.success = false,
                response.errors = errors,
                res.status(400).send(response)

        } else {
            var labelContent = {
                userId: req.decoded.payload._id,
                label: req.body.label

            }
            console.log("print the label content here", labelContent);

            services.addLabelServices(labelContent, (err, result) => {
                if (err) {
                    response.success = false,
                        response.message = "There is an error while creating-->inside labelController",
                        res.status(400).send(response)
                } else {
                    response.success = true,
                        response.result = result,
                        res.status(200).send(response)
                }
            })
        }
    } catch (error) {
        console.log("printing error from catch block of labelController", error);

        res.status(400).send({
            success: false,
            message: "catch block in createlabel controller "

        })
    }
}


exports.deleteLabel = (req, res) => {
    try {
        console.log('label id is', req.body.labelId)

        req.checkBody('labelId', 'label id required').not().isEmpty()
        var errors = req.validationErrors()
        var response = {}
        if (errors) {
            response.success = false
            response.errors = errors
            return res.status(400).send(response)
        } else {
            var labelId = req.body.labelId
            services.deleteLabel(labelId, (err, result) => {
                if (err || result === undefined) {
                    response.success = false
                    response.error = err
                    return res.status(400).send(response)
                } else {
                    response.success = true
                    response.result = result
                    return res.status(200).send(response)
                }
            })
        }
    } catch (error) {
        console.log('delete label Controller Catch ', error)
        res.status(400).send({
            success: false,
            message: 'delete label Controller catch'
        })
    }
}


exports.updateLabel = (req, res) => {
    try {
        req.checkBody('label', 'label required').not().isEmpty()
        var errors = req.validationErrors()
        var response = {}
        if (errors) {
            response.success = false
            response.errors = errors
            return res.status(400).send(response)
        } else {
            labelData = {
                labelID: req.body.labelID,
                label: req.body.label
            }
            services.updateLabel(labelData, (err, result) => {
                if (err || result === undefined) {
                    response.success = false
                    response.error = err
                    return res.status(400).send(response)
                } else {
                    response.success = true
                    response.result = result
                    return res.status(200).send(response)
                }
            })
        }
    } catch (error) {
        console.log('Catch in update label Controller  ', error)
        res.status(400).send({
            success: false,
            message: 'update label Controller catch'
        })
    }
}

//save label to the note
exports.saveLabelToNote = (req, res) => {
    try {
        req.checkBody('label', 'label required').not().isEmpty()

        var errors = req.validationErrors()
        var response = {}
        if (errors) {
            response.success = false,
                response.errors = errors,
                res.status(400).send(response)
        } else {

            var noteID = req.body.noteID
            var label = req.body.label

            console.log("------------->", noteID, label);

            services.saveLabelToNote(noteID, label, (err, result) => {
                if (err) {
                    //change these callbacks of errors with logger
                    response.success = false
                    response.err = err
                    res.status(400).send(response)

                } else {
                    response.success = true
                    response.result = result
                    res.status(200).send(response)
                }
            })
        }
    } catch (error) {
        console.log("inside the catch block of save label to note CTRL");
        res.status(400).send({
            success: false,
            message: "catch block in save to labelNote"

        })
    }
}





//----------------------------------------------------------------------------------------------------------------------------------
exports.getLabel = (req, res) => {
    var obj = {
        "userId": req.decoded.payload.user_id
    }
    services.getLabel(obj, (err, result) => {
        try {
            let response = {
                success: false,
                message: "Error while displaying the labels",
                data: {}
            }
            if (err) {
                response.message = err;
                return res.status(400).send(response);
            } else {
                response.success = true;
                response.message = "Labels are displayed..";
                response.result = result;
                return res.status(200).send(response);
            }
        } catch (err) {
            return err;
        }
    })
}

/**
 * @description : controller for displaying a single label
 */
exports.getLabelById = (req, res) => {
    var obj = {
        "userId": req.decoded.payload.user_id,
        "_id": req.body._id
    }
    services.getLabelById(obj, (err, result) => {
        try {
            let response = {
                success: false,
                message: "Error while displaying a label..",
                data: {}
            }
            if (err) {
                response.message = err
                return res.status(400).send(response);
            } else {
                response.success = true;
                response.message = "Specified label is displayed.."
                response.result = result;
                return res.status(200).send(response);
            }
        } catch (err) {
            return err;
        }
    })
}

/**
 * @description : controller for updating a label
 */
exports.updateLabel = (req, res) => {
    var obj = {
        "userId": req.decoded.payload.user_id,
        "_id": req.body._id,
        "label": req.body.label
    }
    services.updateLabel(obj, (err, result) => {
        try {
            let response = {
                success: false,
                message: "Error while updating a label...",
                data: {}
            }
            if (err) {
                response.message = err;
                return res.status(400).send(response);
            } else {
                response.success = true;
                response.message = "Note Updated successfully..";
                response.result = result;
                return res.status(200).send(response);
            }
        } catch (err) {
            return err;
        }
    })
}