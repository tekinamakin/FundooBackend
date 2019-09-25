const express = require('express')
const router = express.Router()
const usrCtrl = require('../controller/userController')
const noteCtrl = require('../controller/noteController')
const middle = require('../middleware/tokenAccess')
const labelCtrl = require('../controller/labelController')

router.post('/register', usrCtrl.register)

router.post('/login', usrCtrl.login)

let upload = require('../middleware/multer.config');

router.post('/forgetPassword', usrCtrl.forgetPassword)

router.post('/reset', usrCtrl.reset)

router.post('/upload', upload.single("file"), usrCtrl.doUpload);

router.post('/createnote', middle.auth, noteCtrl.createNote)

router.post('/updateNote', middle.auth, noteCtrl.updateNote)

router.post('/deletenote', middle.auth, noteCtrl.deleteNote)

router.post('/pagination', middle.auth, noteCtrl.pagination)

//router.post('/trash',middle.auth,noteCtrl.isTrashed)

router.post('/archive', middle.auth, noteCtrl.isArchived)

router.post('/search', middle.auth, noteCtrl.searchNotes)

router.post('/createlabel', middle.auth, labelCtrl.createLabel)

router.post('/deletelabel', middle.auth, labelCtrl.deleteLabel)

router.post('/updatelabel', middle.auth, labelCtrl.updateLabel)

router.get('/getAllNotes', middle.auth, noteCtrl.getAllNotes)

router.get('/getAllTrashed', middle.auth, noteCtrl.getAllTrashed)

router.get('/getArchivedNotes', middle.auth, noteCtrl.getArchivedNotes)

router.post('/savelabeltonote', middle.auth, labelCtrl.saveLabelToNote)

router.post('/pushnotification', middle.auth, noteCtrl.pushNotification);

router.post('/saveCollab', middle.auth, noteCtrl.saveCollaborator)

router.post('/getCollabNotes', middle.auth, noteCtrl.getCollabNotes)

router.get('/getAllReminder', middle.auth, noteCtrl.getAllReminder)

router.get('/getLabel', middle.auth, labelCtrl.getLabel)

router.post('/addRatings', middle.auth, noteCtrl.addRatings)


module.exports = router;