import { FaPencilAlt, FaRegTrashAlt} from 'react-icons/fa'
import { decryptpwd } from '../utils/encrypt';

const ListTile = ({id, username, platform, password, editTile, deleteTile, newEle}) => {

    function removeEntry(){
        deleteTile(id);
    }
    function editEntry(){
        const data = {
            "id": id,
            "username": username,
            "passwd": newEle?password: decryptpwd("mas",password),
            "platform": platform
        };
        editTile(data);
    }

    function showPwd() {
        if (newEle) {
            console.log("New :: ", password);
        } else {
            console.log("Old :: ", decryptpwd("mas",password));
        }
    }

    if (newEle) {
        var tileClass = "listTile new-entry-tile";
    } else{
        tileClass = "listTile";
    }

    return (
        <div className={tileClass}>
            <div className="left" onClick={showPwd}>
                <div className="username">{username}</div>
                <div className="platform">{platform}</div>
            </div>
            <div className="right">
                <div className="delete" onClick={removeEntry}><FaRegTrashAlt color="#ff3333"/></div>
                <div className="edit" onClick={editEntry}><FaPencilAlt color="#0180A7"/></div>
            </div>
        </div>
    )
}

export default ListTile
