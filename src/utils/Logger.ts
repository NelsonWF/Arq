import * as fs from 'fs';
import * as path from 'path';
import * as winston from 'winston';

let folderLogs = path.join(__dirname, '..', 'logs');
let fileDebug = path.join(folderLogs, 'debug.log');
let fileError = path.join(folderLogs, 'error.log');
let fileInfo = path.join(folderLogs, 'info.log');

if (!(fs.existsSync(folderLogs))) {
    fs.mkdirSync(folderLogs);
}

try {
    fs.unlinkSync(fileInfo);
    fs.unlinkSync(fileDebug);
    fs.unlinkSync(fileError);
} catch (error) { }
export let log = new (winston.Logger)({
    transports: [
        new(winston.transports.File)({
          level: 'info',
            name: 'info-file',
            filename: fileInfo,
            handleExceptions: true,
            maxsize: 5242880, // 5 MB
            maxFiles: 5,
            colorize: false  
        }),
        new(winston.transports.File)({
            level: 'error',
            name: 'error-file',
            filename: fileError,
            handleExceptions: true,
            maxsize: 5242880, // 5 MB
            maxFiles: 5,
            colorize: false
        }),
        new(winston.transports.File)({
            level: 'debug',
            name: 'debug-file',
            filename: fileDebug,
            handleExceptions: true,
            maxsize: 5242880, // 5 MB
            maxFiles: 5,
            colorize: false
        }),
        new(winston.transports.Console)({
            level: 'info',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});