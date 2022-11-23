
const loginStreamer = async(req, res) => {
    res.status(200).send("ici")
    // const email = req.body
    // console.log(email)
    // if(!email || !req.body.password){
    //     res.status(400).json({
    //         "Error": "These fields cant be empty"
    //     })
    // }

    // const streamer = await streamerModel.findOne({email})
    // if(!streamer){
    //     res.status(400).json({
    //         "Error": "Incorrect Streamer mail"
    //     })
    // }

    // if(streamer && (await bcrypt.compare(req.body.password, streamer.password))){
    //     // const token = jwt.sign(
    //     //     {_id: streamer._id},
    //     //     process.env.JWT_SECRET_KEY,
    //     //     {expireIn: '24h'}
    //     // )

    //     // streamer.token = token

    //     // res.cookie("access_token", token, {
    //     //     httpOnly: true,
    //     // })
    //     // .status(200)
    //     // .json(user)
    // } else{
    //     res.status(400).json({
    //         Message: "Invalid Credential"
    //     })
    // }

}