

var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp)
chai.should()
var server = require('../server')
/**
 * @description : Reading JSON
 */
var fs = require('fs')
function readFile() {
  console.log(__dirname)
  var obj = fs.readFileSync(`${__dirname}/dataForTest.json`)
  var data = JSON.parse(obj)
  return data
}
// function readFile() {
//   var obj = fs.readFileSync('../fundoo-backend/test/dataForTest.json')
//   var data = JSON.parse(obj)
//   return data
// }

describe('status and content', () => {
  var data = readFile()
  /**
  * @description : It will create for testing Registration Api.
  */
  it('Registration', (done) => {
    chai.request(server).post('/register').send(data.registration).end((err, res) => {
      if (err) {
        console.log('expect ==>', err)
        err.should.have.status(400)
      } else {
        console.log('expect Body ==>', res.body)
        res.should.have.status(200)
      }
      done()
    })
  })

  /**
       * @description : It will create for testing Login Api.
       */
  it('Login', (done) => {
    chai.request(server).post('/login').send(data.login).end((err, res) => {
      if (err) {
        console.log('expect Body ==>', err)
        err.should.have.status(400)
      } else {
        console.log('expect Body ==>', res.body)
        res.should.have.status(200)
      }
      done()
    })
  })



  /**
       * @description : It will create for testing create note Api.
       */
  it('Create Note', (done) => {
    chai.request(server).post('/createNote').send(data.createNote).end((err, res) => {
      if (err) {
        console.log('Expected Body ==> ', err)
        err.should.have.status(400)
      } else {
        console.log('Expected Body ==> ', res.body)
        res.should.have.status(200)
      }
      done()
    })
  })

  /**
       * @description : It will create for testing delete note Api.
       */
  it('Delete Note Of users', (done) => {
    chai.request(server).post('/deleteNote').send(data.deleteNote).end((err, res) => {
      if (err) {
        console.log('Expected Body ==> ', err)
        err.should.have.status(400)
      } else {
        console.log('Expected Body ==> ', res.body)
        res.should.have.status(200)
      }
      done()
    })
  })
  /**
       * @description : It will create for testing edit Title Api.
       */
  it('updateNote', (done) => {
    chai.request(server).post('/updateNote').send(data.updateNote).end((err, res) => {
      if (err) {
        console.log('Expected Body ==> ', err)
        err.should.have.status(400)
      } else {
        console.log('Expected Body ==> ', res.body)
        res.should.have.status(200)
      }
      done()
    })
  })

  /**
       * @description : It will create for testing archive Api.
       */
  it('archive', (done) => {
    chai.request(server).post('/archive').send(data.isArchive).end((err, res) => {
      if (err) {
        console.log('Expected Body ==> ', err)
        err.should.have.status(400)
      } else {
        console.log('Expected Body ==> ', res.body)
        res.should.have.status(200)
      }
      done()
    })
  })
  /**
       * @description : It will create for testing reminder Api.
       */
  it('createLabel', (done) => {
    chai.request(server).post('/createlabel').send(data.reminder).end((err, res) => {
      if (err) {
        console.log('Expected Body ==> ', err)
        err.should.have.status(400)
      } else {
        console.log('Expected Body ==> ', res.body)
        res.should.have.status(200)
      }
      done()
    })
  })
})
