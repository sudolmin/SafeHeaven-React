import { FaPencilAlt, FaRegTrashAlt} from 'react-icons/fa'

const ListTile = ({id, username, platform, password, editTile, deleteTile}) => {

    function removeEntry(){
        deleteTile(id);
    }
    function editEntry(){
        const data = {
            "id": id,
            "username": username,
            "passwd": password,
            "platform": platform
        };
        editTile(data);
    }

    return (
        <div className="listTile">
            <div className="left">
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
