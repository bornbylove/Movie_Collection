
const crypto = require("crypto");
const reqBodyParser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file");

module.exports = async(req, res) => {
    console.log("The request body:", req.body);
if(req.url === "/api/movies"){
    try {
        let body = await reqBodyParser(req);
        body.id = crypto.randomUUID();
        req.movies.push(body);
        writeToFile(req.movies);
        res.writeHead(201, {"Content-Type": "application/json"});
        res.end;
    }catch(err){
        console.log(err);
        res.writeHead(400, {"Content-Type": "application/json"});
    
        res.end(
            JSON.stringify({
         title: "Validation Failed",
         message: "Request body is not valid"})
        );
    }

}else{
    res.writeHead(404, {"Content-Type": "application/json"});
       res.end(JSON.stringify({title: "Not found",message: "Route not found"})
       );
}
};