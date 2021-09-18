const AWS = require("aws-sdk") // Or use `import` syntax for Typescript and newer ES versions
require('dotenv').config();

// const dynamoDB = new AWS.DynamoDB({
//   region: "ap-south-1", "endpoint": "https://dynamodb.ap-south-1.amazonaws.com/",
//   "accessKeyId": process.env.AWS_ACCESSKEY,
//   "secretAccessKey": process.env.AWS_SECRETKEY
// })

const docClient = new AWS.DynamoDB.DocumentClient({
  region: "ap-south-1", "endpoint": "https://dynamodb.ap-south-1.amazonaws.com/",
  "accessKeyId": process.env.AWS_ACCESSKEY,
  "secretAccessKey": process.env.AWS_SECRETKEY
});

// let fetchOneKey = function (){
//     var params = {

//     }
// }
docClient
.get({
  TableName: "safeheavendb",
  Key: {
    id: "masterkey",
  },
})
.promise()
.then(data => console.log(data.Item))
.catch(console.error);