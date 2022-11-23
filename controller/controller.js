const streamerModel = require('../model/model')
const bcrypt = require('bcrypt')
const { exists } = require('../model/model')
const jwt = require('jsonwebtoken')

const createStreamer = async(req, res) => {
    const {email, pseudo, isAdmin} = req.body
    
    if(!email || !pseudo || !isAdmin || !req.body.password){
        res.status(400).json({
            "Error": "These fields cant be empty"
        })
    }

    const streamerExist = await streamerModel.findOne({email, pseudo})
    if(streamerExist){
        res.status(400).json({
            "Error": "Streamer already exist"
        })
        
    }

    const saltRounds = 10
    const password = await bcrypt.hash(req.body.password, saltRounds)

    const streamer = await streamerModel.create({
        email,
        pseudo,
        password,
        isAdmin
    })

    if(streamer){
        res.status(201).json({
            "Message": "Streamer Created Succesfully"
        })
    } else {
        res.status(400).json({
            "Error": "Error while creating new Streamer"
        })
    }
}

const listStreamer =  async(_, res) => {
    const streamer = await streamerModel.find()
    if(streamer.length === 0){
        res.status(203).json({"Error": "Streamer not recorded!"})
    } else {
        const streamerList = []
        streamer.map((streamer) => {
            const {password, ...others} = streamer._doc
            streamerList.push(others)
        })
        res.status(200).json(streamerList)
    }
}

const updateStreamer = async(req, res) => {
    const streamer = await streamerModel.findById(req.params.id)

    if(streamer){
        const streamerUpdate = await streamerModel.findByIdAndUpdate(streamer.id, req.body, {
            new: true,
        })

        if(streamerUpdate){
            res.status(200).json({
                streamerUpdate
            })
        } else {
           res.status(400).json({
               "Error": "Error while updating Streamer"
           })
       }
    } else {
        res.status(400).json({
            "Error": "Incorrect Streamer ID"
        })
    }
}

const deleteStreamer = async(req, res) => {
    const streamer = await streamerModel.findById(req.params.id)

    if(!streamer){
        res.status(400).json({
            "Error": "Incorrect Streamer ID"
        })
    } else {
        await streamerModel.findByIdAndRemove(streamer.id)
        res.status(200).json({
            message: `Streamer Deleted Succesfully ${req.params.id}`
        })
    }

}

const loginStreamer = async (req, res) => {
    const {email, password} = req.body
    
    if(!email || !password){
        res.status(400).send({
            "Error": "These field cant be empty"
        })
    }

    const streamer = await streamerModel.findOne({email})

    if(streamer && (bcrypt.compare(password, streamer.password))){
        const token = await jwt.sign(
            {_id: streamer._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn: '24h'}
        )

        streamer.token = token
        
        res.cookie("access_token", token, {
            httpOnly: true
        })
        .status(200)
        .json({
            streamer
        })
    }
    else{
        res.status(400).send({
            "Error": "No Streamer founded with this email"
        })
    }
    
}

const logoutStreamer = async (req, res) => {
    res.clearCookie("access_token");
    res.status(200).send("logout")
}

module.exports = {
    createStreamer,
    listStreamer, 
    updateStreamer,
    deleteStreamer,
    loginStreamer,
    logoutStreamer
}