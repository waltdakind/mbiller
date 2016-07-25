/**
 * Created by barrett on 8/28/14.
 */
/* jshint multistr: true */
var mysql = require('mysql');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);

//connection.query('CREATE DATABASE ' + dbconfig.database);

connection.query('\
CREATE TABLE IF NOT EXISTS `workers` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `name` VARCHAR(20) NOT NULL, \
    `password` VARCHAR(60) NOT NULL, \
    `city` VARCHAR(20) NOT NULL, \
    `state` VARCHAR(20) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    `consumer`\
)');

console.log('Success: Table Created!');

connection.end();


