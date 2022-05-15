'use strict';
module.exports = {
    serverTimeZone: 'Europe/Dublin',
    mysql: {
        host: 'localhost',
        user: 'root',
        password: 'root@123',
        database: 'drone_delivery',
        logging: false,
    },
    encryption : {
        saltRounds : 10 ,
        encryptionFlag : {
            encrypt : 'encrypt',
            decrypt : 'decrypt'
        }
    },
    log : {
        destination: 'logs/',
        level: ['debug', 'info', 'warn', 'verbose', 'error', 'silly', 'crit'], // 'debug', 'info', 'warn', 'verbose', 'error', 'silly', 'crit'
        timeStampFormat: 'YYYY-MM-DD hh:mm:ss', // logs time stamp
        dateFormat: 'YYYY-MM-DD' // log file date format
    },
    session: {
        maxAge: 1200000,
        expiredAt: 1800, // in secods (1 day = 86400) //86400 * 7 days = 604800 seconds // 1800 => 30 mins
        secretKey : 'suppersecret',
    },





}