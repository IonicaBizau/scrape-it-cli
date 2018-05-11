#!/usr/bin/env node
"use strict";

const Tilda = require("tilda")
    , scrapeIt = require("scrape-it")
    , path = require("path")
    ;

new Tilda(`${__dirname}/../package.json`, {
    options: [
        {
            name: "config"
          , opts: ["c", "config"]
          , desc: "The config path. It should be a js/json file containing the scrape-it schema."
          , required: true
          , type: String
        },
        {
            name: "url"
          , opts: ["u", "url"]
          , desc: "The url to scrape."
          , required: true
        }
    ],
    examples: [
        "scrape-it -c config.json -u https://ionicabizau.net"
    ]
}).main(action => {
    let config = {}
    try {
        config = require(path.resolve(process.cwd(), action.options.config.value))
    } catch (e) {
        action.exit(e)
    }

    scrapeIt(action.options.url.value, config).then(({ data }) => {
        console.log(JSON.stringify(data))
    }).catch(err => {
        action.exit(err)
    })
});
