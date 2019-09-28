const fetch = require("node-fetch");
const {getMetadata} = require('page-metadata-parser');
const domino = require('domino');

export default (req, res) => {
    fetch(req.query.url)
    .then(fetchres => {
        fetchres.text()
        .then(html => {
            let document = domino.createWindow(html).document;
            res.json({meta: getMetadata(document, req.query.url)})
        })
    })
}