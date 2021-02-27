const authUser = (req, res) => {

    if (!req.body.username || !req.body.password) {
        res.sendStatus(400);
    }

    const username = req.body.username;
    const password = req.body.password;

    // TODO: Check user in db
    
    res.send({"authentication": "true"});
}

const addUser = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.sendStatus(400);
    }

    const username = req.body.username;
    const password = req.body.password;

    // TODO: add user in db
    
    res.send({"success": "true"});
}

const addUserProfile = (req, res) => {

    const fullname = req.body.fullname;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;

    // TODO: add user profile in db
    
    res.send({"success": "true"});
}

module.exports = {authUser, addUser, addUserProfile};