const reqBodyParser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file");
module.exports = async(req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    let id = req.url.split("/")[3];
    const regexV4 = new RegExp(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/);

    if(!regexV4.test(id)){
        res.writeHead(404, {"Content-Type": "application/json"});
       res.end(JSON.stringify({
        title: "Validation Failed",
        message: "UUID is not valid"})
       );
    }else if(baseUrl ==="/api/movies/" && regexV4.test(id)){
        try {
            let body = await requestBodyParser(req);
            const index = req.movies.findIndex(movies =>{
                return movies.id === id;
            });
            if (index == -1 || index === undefined){
                res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({title: "Not found",message: "Movie not found"}));
            res.end();
            }else{
                writeToFile[index] = {id, ...body};
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(req.movies[index]));
            }
        } catch (err) {
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