const AWS = require("aws-sdk") // Or use `import` syntax for Typescript and newer ES versions
require('dotenv').config();

const docClient = new AWS.DynamoDB.DocumentClient({
    region: "ap-south-1", "endpoint": "https://dynamodb.ap-south-1.amazonaws.com/",
    "accessKeyId": "youraccessKeyId",
    "secretAccessKey": "yoursecretAccessKey"
});

async function getData(data, mode="") {
    docClient.get({
        TableName: "safeheavendb",
        Key: data,
    })
    .promise()
    .then((data) => {
        if (mode==="checkSetKey") {
            localStorage.setItem("isKeySet", data.Item!==undefined);
        }
        })
    .catch(console.error);
}

async function putdata(putdata) {
    console.log(putdata);
    docClient
        .put({
            Item: putdata,
            TableName: "safeheavendb",
        })
        .promise()
        .then((data) => {
            console.log(data);
            return data.Attributes})
        .catch((err)=>{
            console.error(err);
            return err;
        });
}

module.exports = {
    "putdata": putdata,
    "getdata": getData
}