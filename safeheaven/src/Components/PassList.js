import { useEffect, useState } from "react";
import ListTile from "./ListTile"
import TileForm from "./TileForm";
import {createNewEntry} from "../utils/bridge"

const PassList = () => {

    const [passInfoList, setpassInfoList] = useState([]);
    const [initusername, setinitusername] = useState('');
    const [initplatform, setinitplatform] = useState('');
    const [initpassword, setinitpassword] = useState('');
    const [formid, setformid] = useState(-1);
    
    function addTile(data) {
        var newList = [data, ...passInfoList];
        createNewEntry(data);
        setpassInfoList(newList);
        setformid(-1);
        setinitusername('');
        setinitplatform('');
        setinitpassword('');
    }

    function editTile(data) {
        console.log(data);
        setformid(data['id']);
        setinitusername(data['username']);
        setinitplatform(data['platform']);
        setinitpassword(data['passwd']);
        deleteTile(data['id'])
    }
    function deleteTile(id) {
        const newList = [...passInfoList].filter(entry => entry.id !== id);
        setpassInfoList(newList);
    }

    useEffect(() => {
        setpassInfoList([]);
    }, [])

    return (
        <div className="full grid-center gradient-bg">
            <div className="listcontainer">
                <TileForm newEntry={addTile} editEntry={editTile} initusername={initusername} initplatform={initplatform} id={formid} initpassword={initpassword}/>
                {
                    passInfoList.map((ele)=>{

                        return <ListTile key={ele['id']} id={ele['id']} username={ele['username']} platform={ele['platform']} password={ele['passwd']} deleteTile={deleteTile} editTile={editTile}/>
                    })
                }
            </div>
        </div>
    )
}

export default PassList
