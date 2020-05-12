import React from "react";


export const Answer = React.memo(({author, date, likes, text}) =>  {
    return (
        <div className="answers__item" >
            <div className="answers__item-title">
                {author.email}<span> at {date}</span>
            </div>
            <p className="answers__item-text">{text}</p>
            <div className="answers__item-footer">
                <span>Likes: {likes}</span>
            </div>
        </div>
    )
})