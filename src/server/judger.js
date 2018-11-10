"use strict";

const
  path = require("path"),
  fs = require("fs"),
  mysql = require("mysql"),
  _ = require("lodash");

const
  archivePath = path.resolve("problems");

function tableToString(fieldPackets, rowDataPackets) {
  let ans = "";
  for (let i = 0; i < rowDataPackets.length; i++) {
    let row = [];
    for (let j = 0; j < fieldPackets.length; j++) {
      row.push(rowDataPackets[i][fieldPackets[j].name]);
    }
    ans += row.join(' ') + '\n';
  }
  return ans;
}

function judge(submitID, problemID, code) {
  let pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: process.env.npm_package_config_mysql_username,
    password: process.env.npm_package_config_mysql_password,
    multipleStatements: true,
  });
  let databaseName = "judge_" + submitID;
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
        return;
      }
      connection.query("drop database " + databaseName + ";");
      connection.query("create database " + databaseName + ";");
      connection.query("use " + databaseName + ";");
      let problemSQL = fs.readFileSync(path.join(archivePath, problemID, "problem.sql")).toString();
      connection.query(problemSQL);
      connection.query(code, (error, results, fields) => {
        if (error) {
          resolve({
            status: false,
            reason: error.sqlMessage
          });
        } else {
          let codeLineTotal = code.split(';').length - 1;
          let submittedAnswer = "";
          if (codeLineTotal == 1) {
            if (fields) {
              submittedAnswer = tableToString(fields, results);
            }
          } else {
            submittedAnswer = _.map(_.filter(_.zip(fields, results), (zippedItem) => {
              return !(zippedItem[0] === null || zippedItem[0] === undefined);
            }), (zippedItem) => {
              return tableToString(zippedItem[0], zippedItem[1]);
            }).join('');
          }
          let answer = fs.readFileSync(path.join(archivePath, problemID, "answer.txt")).toString();
          answer = answer.split("\r").join("");
          let status = answer == submittedAnswer;
          resolve({
            status: status,
            reason: status ? "" : "Wrong Answer"
          })
        }
      });
    });
  });
}

module.exports.judge = judge;