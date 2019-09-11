const mongoose = require('mongoose')
const Schema = mongoose.Schema

var labelSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: ['true', 'User Id Required'],
        ref: 'userSchema'
    },
    label: {
        type: String,
        required: ['true', 'label required']
    }
},
    {

        timestamps: true
    });

var label = mongoose.model('Label', labelSchema)
//for saving data in the model

class LabelModel {

    constructor() { }

    addLabelModel(saveItem, callback) {
        var saveObj = new label(saveItem)
        saveObj.save( (err, result) => {
            if(err){
                callback(err)
            }
            else{
                callback(null,result)
            }
        })
    }



// deleteLabel(deleteItem,callback) {

// label.findOneAndDelete({"labelID":deleteItem},(err,result)=>{

// if(err){
//     callback(err)
// }
// else{

// callback(null,result)

// }
// })
// }
// }

deleteLabel(labelID, callback){
    try {
      label.deleteOne({
        _id: labelID
      }, (err, result) => {
        if (err) {
          console.log('Error in label Model')
          callback(err)
        } else {
          console.log('Label deleted succesfully')
          callback(null, result)
        }
      })
    } catch (error) {
      console.log(' Catch the delete label Model Block')
      callback.status(400).send({
        success: false,
        message: 'Catch the delete label Model Block'
      })
    }
  }



//   updateLabel  (labelParam, callback) {
//     try {
//     //   var editLabel = null
//     //   var labelID = null
//     //   if (labelParam != null) {
//     //     editLabel = labelParam.label
//     //     labelID = labelParam.labelID
//     //   } else {
//     //     callback('Please write something on label')
//     //   }
//       label.findByIdAndUpdate({
//         _id: labelParam.labelID
//       }, {
//         $set: {
//           label: labelParam.label
//         }
//       }, (err, result) => {
//         if (err) {
//           console.log('Error in update label model')
//           callback(err)
//         } else {
//           console.log('Successfully updated label', result)
//           callback(null, result)
//         }
//       })
//     } catch (error) {
//       console.log(' Catch the update label Model Block')
//       callback.status(400).send({
//         success: false,
//         message: 'Catch the update label Model Block'
//       })
//     }
//   }
  
  updateLabel  (itemId,updateItem, callback) {
    try {
    //   var editLabel = null
    //   var labelID = null
    //   if (labelParam != null) {
    //     editLabel = labelParam.label
    //     labelID = labelParam.labelID
    //   } else {
    //     callback('Please write something on label')
    //   }
    console.log("printing something over here",itemId,updateItem);
    
      label.findByIdAndUpdate
      ({
        '_id': itemId
      },updateItem , (err, result) => {
        if (err) {
          console.log('Error in update label model')
          callback(err)
        } else {
          console.log('Successfully updated label', result)
          callback(null, result)
        }
      })
    } catch (error) {
      console.log(' Catch the update label Model Block')
      callback.status(400).send({
        success: false,
        message: 'Catch the update label Model Block'
      })
    }
  }
  

}
module.exports = new LabelModel()