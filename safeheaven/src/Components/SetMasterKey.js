import { useState, useEffect } from "react";
// import Alert from "./Alert";
import Buttons from "./Buttons"
import TextBox from "./TextBox"
import { setMasterKeyHandler } from "../utils/bridge";

const SetMasterKey = ({setmode}) => {

    const [masterkey, setmasterkey] = useState('');


    function textboxvalue(e) {
        var newvalue = e.target.value;
        setmasterkey(newvalue);
    }

    const submit = async () => {
        if (masterkey === "") {
            alert("Master Key cannot be an empty string..");
            return;
        }
        setMasterKeyHandler(masterkey);
        setmode('login');
    }

    return (
        <div className="full grid-center gradient-bg">
            <div className="grid-wgap">
                <TextBox placeholder="Enter Your New Master Key" changefunc={textboxvalue} value={masterkey}/>
                <Buttons innertext="Set" clickFunc={submit}/>
            </div>
        </div>
    )
}

export default SetMasterKey
