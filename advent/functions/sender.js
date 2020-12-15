
'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const ses = new AWS.SESV2({apiVersion: '2019-09-27'});
const moment = require('moment');
const fs = require("fs");
const path = require("path");

const songlist = fs.readFileSync(__dirname + '/christmas_songs.txt', 'utf8').split('\n');

const randomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const idFromToday = () => {
    return moment().format("YYYY-MM-DD");
}

const daysLeft = () => {
  return 25 - new Date().getUTCDate();
}

const getSubject = () => {
  let song = songlist[randomInt(songlist.length)];
  const pattern = new RegExp('christmas', 'gi');
  return song.replace(pattern, 'Serverless');
}

module.exports.handler = async (event, context, callback) => {
  const id = idFromToday();

  const queryParams = {
    TableName: process.env.MESSAGE_TABLE,
    Key: {
      id: id
    },
  };

  const result = await dynamoDb.get(queryParams).promise();
  
  const message = result.Item.message;

  const email = `
  <!DOCTYPE html>
  <html><body>
  <h1>${daysLeft()} days to go!</h1>
  <p>${result.Item.message}</p>
  <hr />
  <small>merry christmas and happy new year</small>
  </body></html>
  `
  
  const mailParams = {
    Destination: {
      ToAddresses: ["pete@petecliff.net"]
    },
    Content: {
        Simple: {
        Body: {
            Html: {
            Charset: "UTF-8", 
            Data: email
            }, 
        }, 
        Subject: {
            Charset: "UTF-8", 
            Data: getSubject()
        }
        }
    },
    FromEmailAddress: "xmas@iotshed.co.uk"
  }

  const mailout = await ses.sendEmail(mailParams).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify({"msg":"OK"}),
  };

  callback(null, response);
}