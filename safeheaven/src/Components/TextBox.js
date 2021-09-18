const TextBox = ({type, placeholder, changefunc, className, id, value}) => {
    return (
        <div id={id}>
            <input type={type} className={className}  placeholder={placeholder} onChange={changefunc} value={value}/>
        </div>
    )
}

TextBox.defaultProps = {
    type: "text",
    placeholder: "",
    value: "",
    className: "textInput",
    changefunc: ()=>{
        console.log("changed");
    }
}

export default TextBox
