import { useEffect, useState } from "react";
import ListTile from "./ListTile"
import TileForm from "./TileForm";
import {createNewEntry} from "../utils/bridge"
import { docClient } from "../utils/secret";

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
        docClient.delete({
            TableName: "safeheavendb",
            Key: {
              id: id, // id is the Partition Key, '123' is the value of it
            },
        })
        .promise()
        .then(data => console.log(data.Attributes))
        .catch(console.error)
    }

    useEffect(() => {

        docClient.scan({
            TableName: "safeheavendb"
        })
        .promise()
        .then(data => setpassInfoList(data.Items))
        .catch(console.error)
    }, [])

    return (
        <div className="full grid-center gradient-bg passlist-wrap">
            <div className="brand">
                    <div className="">
                        Safe Heaven
                    </div>
                    <div id="logo"></div>
                </div>
            <div className="listcontainer">
                
                <TileForm newEntry={addTile} editEntry={editTile} initusername={initusername} initplatform={initplatform} id={formid} initpassword={initpassword}/>
                {
                    passInfoList.map((ele)=>{
                            var newEle = false;
                        if (ele.date===undefined) {
                            newEle = true;
                        }

                        return <ListTile key={ele['id']} id={ele['id']} username={ele['username']} platform={ele['platform']} password={ele['passwd']} deleteTile={deleteTile} editTile={editTile} newEle={newEle}/>
                    })
                }
            </div>
        </div>
    )
}

export default PassList
