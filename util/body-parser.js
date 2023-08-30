module.exports = async(request) => {
    return  new Promise((resolve, reject) => {
        try {
            let body = "";
            request.on("data", (chunck) => {
                body += chunck;
            });
            request.on("end", () =>{
                resolve(JSON.parse(body));
            });
        } catch (err) {
            console.log(err);
            reject(err);
            
        }
}); 
}