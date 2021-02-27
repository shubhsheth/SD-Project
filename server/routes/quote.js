const getQuote = (req, res) => {
    const currentPrice = 1.5;
    const profitFactor = 0.1;
    
    if (!req.body.userid || !req.body.location || !req.body.gallons) {
        res.sendStatus(400);
    }

    const userid = req.body.userid;
    const location = req.body.location;
    const gallons = req.body.gallons;

    let locationFactor = 0.04;
    if (location == "Texas") {
        locationFactor = 0.02;
    }

    let rateHistoryFactor = 0;
    if (hasHistory(userid)) {
        rateHistoryFactor = 0.01;
    }

    let gallonRequestedFactor = 0.03;
    if (gallons > 1000) {
        gallonRequestedFactor = 0.02;
    }

    const margin = currentPrice * (locationFactor - rateHistoryFactor + gallonRequestedFactor + profitFactor);
    const quote = currentPrice + margin;
    const total = gallons * quote;

    res.send({ margin, quote, total });
}

const hasHistory = (userid) => {
    // TODO:
    return true;
}

const getHistory = (req, res) => {
    res.send("Received");
}

module.exports = { getQuote, getHistory };