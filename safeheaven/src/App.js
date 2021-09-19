import { useEffect, useState } from "react";
import MasterKey from "./Components/authenticate/MasterKey";
import PassList from "./Components/dashboard/PassList";
import SetMasterKey from "./Components/setkey/SetMasterKey";
const AWS = require("aws-sdk");

function App() {

  const [mode, setmode] = useState("setkey");
  const [changekey, setchangekey] = useState(false);
  
  useEffect(() =>  {
    const docClient = new AWS.DynamoDB.DocumentClient({
      region: "ap-south-1", "endpoint": "endpoint",
      "accessKeyId": "youraccessKeyId",
      "secretAccessKey": "yoursecretAccessKey"
  });
  
      docClient.get({
          TableName: "keydb",
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

  function changeSetKeyMode() {
    setchangekey(true);
    setmode("setkey");
  }

  return (
    <div className="App">
      {
        mode==="setkey"? <SetMasterKey setmode={setmode} changekey={changekey}/>: mode==="login"? <MasterKey setmode={setmode} />:<PassList setmode={setmode} changeSetKeyMode={changeSetKeyMode}/>
      }
    </div>
  );
}

export default App;
