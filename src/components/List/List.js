import React from "react";
import ListItem from './ListItem';

const List = props => {
    if(props.restArr){
        return (
            <div className={'list-wrp'}>
                {props.restArr.map(el => {
                    return <ListItem
                        key={el["Name"]}
                        name={el["Name"]}
                        city={el["City"]}
                        cusineStyles={el["Cuisine Style"]}
                        rating={el["Rating"]}
                        numOfReviews={el["Number of Reviews"]}
                        ranking={el["Ranking"]}
                    />
                })}
            </div>
        );
    }

    return null;
}

export default List;