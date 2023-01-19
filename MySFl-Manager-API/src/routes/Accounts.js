const express = require('express')
const router = express.Router()

const CreateService = require('../services/Create')
const RetriveService = require('../services/Retrive')
const UpdateService = require('../services/Update')
const deleteService = require('../services/Delete')

router.post('/create', async (req, res) => {
    const { username, password } = req.body

    const results = await CreateService(username, password)
    
    if (results){
        res
        .status(200)
        .send({
            status: results,
            message: "Successfully Created!",
            username: username
        })
        console.log(res.body)
    }else{
        res
        .status(500)
        .send({
            status: results,
            message: "Not Created!"
        })
    }
})

router.get('/retrive', async (req, res) => {
    const {username, password} = req.query

    const arrFields = []

    arrFields.push(username)
    arrFields.push(password)

    const results = await RetriveService(arrFields)
    if (results){
        res
        .status(200)
        .send(results)
    }else{
        res
        .status(500)
        .send({
            status: results,
            message: "Not Retrieved!"
        })
    }
})

router.post('/update', async (req, res) => {
    const {id, newUsername, newPassword} = req.body

    const results = await UpdateService(id, newUsername, newPassword)
    if (results){
        res
        .status(200)
        .send({
            status: results,
            message: "Successfully Updated!"
        })
    }else{
        res
        .status(500)
        .send({
            status: results,
            message: "Not Updated!"
        })
    }
})

router.get('/delete', async (req, res) => {
    const { id } = req.query

    const results = await deleteService(id)
    if (results){
        res
        .status(200)
        .send({
            status: results,
            message: "Successfully Deleted!"
        })
    }else{
        res
        .status(500)
        .send({
            status: results,
            message: "Not Deleted!"
        })
    }
})
module.exports = router