var express = require("express");
const { VMScript } = require("vm2");
var router = express.Router();
var Model = require("../connectors/mongo");
const vmScriptMap = require("./vmScriptMaps");
const axios = require('axios').default;

Model.find({}).forEach((obj) => {
  let script = new VMScript(obj.script);
  script.compile();
  vmScriptMap.set(obj.fsp_id, { script: script, dest_url: obj.dest_url });
});

router.post("/:id", function (req, res) {
  let id = req.params.id;
  let target = vmScriptMap.get(id);
  let request = { headers: req.headers, body: req.body };
  // run script
  const vm = new VM({sandbox:{request}});
  const exports = vm.run(target.script);
  
  axios.request({
    method: exports.method,
    headers: exports.headers,
    data: exports.body,
    url: target.dest_url
  }).then((response)=>{
    res.statusCode(200).send();
  });

});

module.exports = router;
