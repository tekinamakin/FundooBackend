var model=require("../model/labelModel")
var noteModel=require("../model/noteModel")
exports.addLabelServices=(labelContent,callback)=>{
   
     console.log("-=-=-=-=-=-=>",labelContent);
     
  model.addLabelModel(labelContent,(err,result)=>{
            if (err) {
            callback(err)
        }
        else {
            callback(null, result)
        }
    })
}





exports.deleteLabel = (labelId, callback) => {
    try {
     
      model.deleteLabel(labelId, (err, result) => {
        if (err || result === undefined) {
          console.log('Error in deleting Label')
          return callback(err)
        } else {
          console.log('Delete Label Successfully', result)
          return callback(null, result)
        }
      })
    } catch (err) {
      return callback.status(400).send({
        success: false,
        message: 'catch in delete label services'
      })
    }
  }


  exports.updateLabel = (labelContent, callback) => {
    try {
        var labelID=labelContent.labelID
        var updateLabel={
            $set: {
              label: labelContent.label
            }
          }
        model.updateLabel(labelID,updateLabel, (err, result) => {
        if (err || result === undefined) {
          console.log('Error in updating Label')
          return callback(err)
        } else {
            
          console.log('label successfully updated', result)
          return callback(null, result)
        }
      })
    } catch (err) {
      return callback.status(400).send({
        success: false,
        message: 'catch in upadate label services'
      })
    }
  }

  exports.saveLabelToNote=(noteID,labelledNote,callback)=>{
   var updateItem= {
        $push: {
          label: labelledNote
        }
      }
      console.log("=======services==========>",noteID,updateItem);
      
      noteModel.updateItem(noteID,updateItem,(err,result)=>{
        if(err || result === undefined){
            console.log("error in saving note to label");
            callback(err)
        }
        else{
            console.log("label successfully saved to the note");
            callback(null,result)
        }
      })
}

//---------------------------------------------------------------------------------------------------------------------------
/**
 * @description : service for getting all labels from database
 */
exports.getLabel=(req, callback)=>
{
    let field = {}
    model.getLabel(req, field, (err, data) =>
    {
        try
        {
            if(err)
                throw err;
            else
            {
                return callback(null, data);
            }
        }
        catch(err)
        {
            return callback(err);
        }
    })
}

/**
 * @description : service for getting a single label from database
 */
exports.getLabelById=(req, callback)=>
{
    let field = {_id : req._id}
    model.getLabel(req, field, (err, data) =>
    {
        try
        {
            if(err)
                throw err
            else
            {
                return callback(null, data);
            }
        }
        catch(err)
        {
            return callback(err);
        }
    })
}

/**
 * @description : service for updating a label
 */
exports.updateLabel=(req, callback)=>
{
    let field = {label : req.label}
    model.updateLabel(req, field, (err, data) =>
    {
        try
        {
            if(err)
                throw err;
            else
            {
                return callback(null, data);
            }
        }
        catch(err)
        {
            return callback(err);
        }
    })
}