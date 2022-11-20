const express = require("express");
const axios = require('axios')
const router = express.Router();
const app = express();

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
    var rmsg = newurl.match(msg)[0].replace('"', '');
    console.log(rmsg + ',' + rname);
    SendDiscod(rname, rmsg);
}

function SendDiscod(msg,name) {
    console.log('SendDiscord');
    const url = "https://discord.com/api/webhooks/1043717017116610560/fvr6uQ26QR3RIOMwmQYpr4Hyd142Vdpi_ZQ8EF-McTP5T_QA2yWe9wCS0WtjM_x8FLrq";
    console.log(url);
    const HEADER = {
        headers: {
            'authorization': 'Authorization: Bot 966434794609209415',
            'content-type': 'application/json'
        }
    };
    const DATA = {
        content: name + ': ' + msg 
    }
    axios
        .post(url, DATA, HEADER)
        .then((response) => {
            if (response.status === 201) {
                console.log('Req body:', response.data)
                console.log('Req header :', response.headers)
            }
        })
    console.log('sentDiscord');
};
