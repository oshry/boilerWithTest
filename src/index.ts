import express from "express";
import { Validator } from "./lib/validator"
import { fetchPosts } from "./services/jsonPlaceholder";
import { LoggerConfiguration } from "./models/Configuration"
import { LoggerFactory } from "./factories/LoggerFactory"

const app = express();

const loggerConfig = {
    level: process.env.LOGGER_CONFIG_LEVEL || 'ERROR',  // default log level is ERROR if not configured, i.e. production
    pattern: process.env.LOGGER_CONFIG_PATTERN || '[%c] [%5.10p] [%x{requestid}] - %m'
} as LoggerConfiguration
//
// Logger Factory
const loggerFactory = new LoggerFactory(loggerConfig)
const rootLogger = loggerFactory.getNamedLogger('ROOT')
rootLogger.level = 'INFO'

// GET route
app.get('/validator', (_: any, res: express.Response) => {
    let output = false;
    console.log(typeof res);
    if (Validator.isNumValid(60)) {
        output = true;
    }
    res.send('Number is valid: ' + output);
});

// GET route
app.get('/json-placeholder', async (_, res) => {
    let posts = await fetchPosts();
    rootLogger.info('Using posts: ', posts)
    res.send(posts);
});


app.listen(5000, function() {
    console.log('Web app is listening on port 5000');
});
