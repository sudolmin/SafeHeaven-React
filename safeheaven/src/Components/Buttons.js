const Buttons = ({ innertext, className, clickFunc, id }) => {
    return (
        <div className="btn-wrapper" id={id}>
            <button onClick={clickFunc} className={className}>
                {innertext}
            </button>
        </div>
    )
}

Buttons.defaultProps = {
    className: "btn",
    innertext: "Click Me !",
}

export default Buttons
