import TextBox from "./TextBox"
import Buttons from "./Buttons";
import { FaArrowRight} from 'react-icons/fa'
import { useEffect, useState } from "react";


const TileForm = ({newEntry, initusername, initplatform, initpassword, id}) => {
    const [username, setusername] = useState(initusername);
    const [platform, setplatform] = useState(initplatform);
    const [password, setpassword] = useState(initpassword);

    function textboxusernamevalue(e) {
        var newvalue = e.target.value;
        setusername(newvalue);
    }    
    function textboxplatformvalue(e) {
        var newvalue = e.target.value;
        setplatform(newvalue);
    }    
    function textboxpasswordvalue(e) {
        var newvalue = e.target.value;
        setpassword(newvalue);
    }

    function formSubmit(e) {
        var data = {
            "id": id=== -1 ?Math.floor(Math.random()*10000000):id,
            "username": username,
            "passwd": password ,
            "platform": platform
        };
        newEntry(data);
        setusername('');
        setplatform('');
        setpassword('');
    }

    useEffect(() => {
        setusername(initusername);
        setplatform(initplatform);
        setpassword(initpassword);
    }, [initusername,initplatform,initpassword])

    return (
        <div className="form-wrapper">
            <TextBox id="username-form-textbox" placeholder="Enter Username" changefunc={textboxusernamevalue} value={username}/>
            <TextBox id="platform-form-textbox" placeholder="Enter Platform" changefunc={textboxplatformvalue} value={platform}/>
            <TextBox id="password-form-textbox" placeholder="Enter Password" changefunc={textboxpasswordvalue} value={password}/>
            <Buttons id="add-password-btn" innertext={<FaArrowRight/>} clickFunc={formSubmit}/>
        </div>
    )
}

TileForm.defaultProps = {
    initusername: "",
    initplatform: "",
    initpassword: ""
}

export default TileForm
