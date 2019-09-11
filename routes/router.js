const express=require('express')
const router= express.Router()
const regCtrl=require('../controller/userController')//imported regiserController
const usrCtrl=require('../controller/userController')
const noteCtrl=require('../controller/noteController')
const middle= require('../middleware/tokenAccess')
const labelCtrl=require('../controller/labelController')
// var middle     = require('../middleware/allAboutToken')

//calling registration method in controller
router.post('/register',regCtrl.registration)

//calling login method in controller
router.post('/login',usrCtrl.login)

let upload = require('../middleware/multer.config');


router.post('/forgetPassword',usrCtrl.forgetPassword)

router.post('/reset',usrCtrl.reset)

router.post('/upload', upload.single("file"), usrCtrl.doUpload);

router.post('/createnote',middle.auth,noteCtrl.createNote)

router.post('/editTitle',middle.auth,noteCtrl.editTitle)

router.post('/deletenote',middle.auth,noteCtrl.deleteNote)

router.post('/pagination',middle.auth,noteCtrl.pagination)

router.post('/trash',middle.auth,noteCtrl.isTrashed)

//router.post('/archive',middle.auth,noteCtrl.isArchived)

router.post('/search',middle.auth,noteCtrl.searchNotes)

router.post('/createlabel',middle.auth,labelCtrl.createLabel)

router.post('/deletelabel',middle.auth,labelCtrl.deleteLabel)

router.post('/updatelabel',middle.auth,labelCtrl.updateLabel)

router.get('/getAllNotes',middle.auth,noteCtrl.getAllNotes)

router.get('/getAllTrashed',middle.auth,noteCtrl.getAllTrashed)

router.post('/savelabeltonote',middle.auth,labelCtrl.saveLabelToNote)

router.post('/pushnotification', middle.auth, noteCtrl.pushNotification);

router.post('/saveCollab',middle.auth,noteCtrl.saveCollaborator)

router.post('/getCollabNotes',middle.auth,noteCtrl.getCollabNotes)
module.exports=router;