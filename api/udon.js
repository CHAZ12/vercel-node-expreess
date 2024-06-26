const express = require("express");
const router = express.Router();
const app = express();
const axios = require('axios')

router.get("/", async (req, res) => {
try {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl; //Get full Url request
    GetUrlData(fullUrl)
    res.json({
        status: 200,
        message: fullUrl
        
    });

} catch (error) {
    console.error(error)
    return res.status(500).send("Server error")
}

});
module.exports = router;

function GetUrlData(fullUrl) {
    // user who sent name and message
    const newurl = JSON.stringify(fullUrl);
    const name = '(?<=~)(.+)(?=%3A)';
    var rname = newurl.match(name)[0];
    const msg = "(?<=" + rname + "%3A)(?<=%3A).+";
    var rmsg = newurl.match(msg)[0].replace('"', '').replace('_','');
    console.log(rmsg + ',' + rname);
    SendDiscod(rname, rmsg);
}

async function SendDiscod(name,msg) {
    console.log('SendDiscord');
    const url = "https://discord.com/api/webhooks/...";
    const HEADER = {
        headers: {
            'authorization': 'Authorization: Bot 966434794609209415',
            'content-type': 'application/json'
        }
    };
    const DATA = {
        content: name + ': ' + msg 
    }
    console.log(DATA);
    axios
        .post(url, DATA, HEADER)
        .then((response) => {
            if (response.status === 201) {
                console.log('Req body:', response.data)
                console.log('Req header :', response.headers)
            }
        })
    console.log('SentDiscord');
};
