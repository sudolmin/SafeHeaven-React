import { useState } from "react";
import { cryptmd5 } from "../utils/encrypt";
// import Alert from "./Alert";
import Buttons from "./Buttons"
import TextBox from "./TextBox"
import {docClient} from '../utils/secret';

const MasterKey = ({setmode}) => {

    const [masterkey, setmasterkey] = useState('');
    // const [alert, setalert] = useState(false);
    function textboxvalue(e) {
        var newvalue = e.target.value;
        setmasterkey(newvalue);
    }
    function submit(){
        if (masterkey === "") {
            alert("Master Key cannot be an empty string..");
            return;
        }
        docClient.get({
            TableName: "safeheavendb",
            Key: {
                id: "masterkey",
            },
        })
        .promise()
        .then((data) => {
            if(data.Item['key']===cryptmd5(masterkey)){
                setmode("passlist");
            };
            })
        .catch(console.error);
    }

    return (
        <div className="full grid-center gradient-bg">
            {/* <Alert message="Hello from the other side" classname="alert success"/> */}
            <div className="grid-wgap">
                <TextBox placeholder="Enter Your Master Key" changefunc={textboxvalue} value={masterkey}/>
                <Buttons innertext="Authenticate" clickFunc={submit}/>
            </div>
        </div>
    )
}

export default MasterKey
