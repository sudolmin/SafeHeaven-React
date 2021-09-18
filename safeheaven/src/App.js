import { useEffect, useState } from "react";
import MasterKey from "./Components/MasterKey";
import PassList from "./Components/PassList";
import SetMasterKey from "./Components/SetMasterKey";
const AWS = require("aws-sdk");

function App() {

  const [mode, setmode] = useState("setkey");
  
  useEffect(() =>  {
    const docClient = new AWS.DynamoDB.DocumentClient({
      region: "ap-south-1", "endpoint": "https://dynamodb.ap-south-1.amazonaws.com/",
      "accessKeyId": "AKIAXJSGIHGDRIEFGJ6A",
      "secretAccessKey": "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"
  });
  
      docClient.get({
          TableName: "safeheavendb",
          Key: {
            id: "masterkey",
        },
      })
      .promise()
      .then((data) => {
          if (data.Item!==undefined) {
            setmode('login');
          }
          })
      .catch(console.error);
    }, [])

  return (
    <div className="App">
      {
        mode==="setkey"? <SetMasterKey setmode={setmode}/>: mode==="login"? <MasterKey setmode={setmode} />:<PassList/>
      }
    </div>
  );
}

export default App;
