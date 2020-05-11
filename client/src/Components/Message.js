import React from "react";

const Message = ({message, error}) => {
    const classNames = ["message"]
    if (error) {
        classNames.push('error')
    }

    return (
        <div className={classNames.join(' ')} >
            <h4>{message}</h4>
        </div>
    )
}

export default Message