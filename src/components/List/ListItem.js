import React from "react";

const ListItem = ({name, city, cusineStyles, rating, numOfReviews, ranking}) => {
    return (
        <div className={'list-item-wrp'}>
            <div className={'list-item'}>
                <small>{city}</small>
                <h3 style={{margin: '5px 0 0'}}>{name}</h3>
                <ul>
                    {cusineStyles.map(el => <li key={el}>{el}</li>)}
                </ul>
                <div className={'rating-wrp'}>
                    <div>Rating: <b>{rating}</b></div>
                    <div>Number of Reviews: <b>{numOfReviews}</b></div>
                </div>
            </div>
        </div>
    );
}

export default ListItem;