const userDb = require('./db/user.json');

const appHandlr = app => {

    app.get('/', (req, res) => {
        res.status(403).send("GET on \'\/\' is not allowed.\nAccess Denied!!!");
    });

    app.post('/', (req, res) => {
        res.status(403).send("POST on \'\/\' is not allowed.\nAccess Denied!!!");
    });

    app.all('/getUserDetails', (req, res) => {
        var userId = '';
        var resp = '';
        const bPath = './db/';
        const reqMethod = req.method;

        console.log('req method : '+reqMethod);

        if(reqMethod === "GET"){
            userId = req.query['userId'];
        }else if(reqMethod === "POST"){
            userId = req.body.userId;
        }else{
            return res.status(403).send('Access Denied!!!');
        }

        var user = userDb.filter((item)=>{
            return item.userId == userId;
        });

        console.log(`user size: ${user.length}`)

        if(user.length === 1){
            resp = user[0];
            delete resp.userId;
            userData = require(bPath+userId+'-'+reqMethod+'.json')
            Object.assign(resp, userData); 
        }else{
            resp = require(bPath+'noUser-'+reqMethod+'.json');
        }

        return res.status(200).send(resp);
    });

};

module.exports = appHandlr;