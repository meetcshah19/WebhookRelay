var express = require("express");
var router = express.Router();
var Model = require("../connectors/mongo");
const { v4: uuidv4 } = require('uuid');
const vmScriptMap = require("./vmScriptMaps")

router.post("/new_route/", function (req, res) {
    const URL = require("url").URL;

    const stringIsAValidUrl = (s) => {
        try {
        new URL(s);
        return true;
        } catch (err) {
        return false;
        }
    };

    if(!stringIsAValidUrl(req.body.dest_url)){
        res.statusCode(400).send("Invalid Destination Url");
    }

    const id = uuidv4();
    
    req.body.script = ```
    transform(){
        let method = "POST";
        +${req.body.script}+
        return { method: method, headers: request.headers, body: request.body };
    }
    module.exports = transform();
    ```;

    var save_data = new Model({
        fsp_id: id,
        script: req.body.script,
        dest_url: req.body.dest_url,
      }).save(function (err, result) {
        if (err) throw err;
        console.log(result + err);
        if (result) {
            let script = new VMScript(obj.script);
            script.compile();
            vmScriptMap.set(id,{script: script, dest_url:req.body.dest_url});
            res.send(`https://localhost:4000/in/"${id}`);
        }
      });
});

module.exports = router;
