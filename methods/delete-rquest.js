const writeToFile = require("../util/write-to-file");
module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    let id = req.url.split("/")[3];
    const regexV4 = new RegExp(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/);

    if(!regexV4.test(id)){
        res.writeHead(404, {"Content-Type": "application/json"});
       res.end(JSON.stringify({
        title: "Validation Failed",
        message: "UUID is not valid"})
       );
    } else if (baseUrl ==="/api/movies/" && regexV4.test(id)){
        const index = req.movies.findIndex(movies =>{
            return movies.id === id;
        });
        if (index == -1 || index === undefined){
            res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify({title: "Not found",message: "Movie not found"}));
        res.end();
        }else{
            req.movies.splice(index, 1);
            writeToFile(req.movies);
            res.writeHead(204, {"Content-Type": "application/json"});
            res.end(JSON.stringify(req.movies));
        }
    }
};