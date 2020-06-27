import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

import {getRestaurantsData} from './api';
import List from "./components/List/List";

function App() {
    //all resturants arr
    const [restaurantsArr, setRestaurantsArr] = useState(null);
    //all cusine types
    const [allCusineTypes, setAllCusineTypes] = useState([]);
    //cusine to sort by
    const [cusineType, setCusineType] = useState(0); // 0 - is not selected
    //rank to sort by
    const [rankingType, setRankingType] = useState(0); //0 - not selected;  1 - high to low; 2- low to high;


    useEffect(() => {
        getRestaurantsData()
            .then (res => {
                let restaurantsArr = turnRestaurantCusinesStrToArr(res.data);
                //set restuarans arr
                setRestaurantsArr(filterRestaurants(restaurantsArr));
                //set cusine types arr
                setAllCusineTypes(getAllCusineTypes(restaurantsArr));
            });
    }, [cusineType, rankingType]);


    const filterRestaurants = (restaurantsArr) => {
        let newRestaurantsArr = restaurantsArr;
        if(typeof cusineType === 'string' && cusineType !== '0'){
            newRestaurantsArr = [];
            restaurantsArr.forEach((el) => {
                if(el["Cuisine Style"].includes(cusineType)){
                    newRestaurantsArr.push(el);
                }
            });
        }


        if(rankingType >= 1 && rankingType <= 2){
            let rankVal;
            if(rankingType === 1) rankVal = -1; // high to low
            if(rankingType === 2) rankVal = 1; // low to high;

            newRestaurantsArr.sort((a, b) => {
                if (a.Ranking < b.Ranking) {
                    return rankVal;
                }
                if (a.Ranking > b.Ranking) {
                    return -rankVal;
                }
                return 0;
            })
        }


        return newRestaurantsArr;

    }

    const cleanCusinesStringToArr = (str) => {
        str = str.replace(/[['\] ]/g, '');
        return str.split(',');
    }

    const turnRestaurantCusinesStrToArr = (restaurantsArr) => {
        restaurantsArr.forEach(restaurantObj => {
            restaurantObj["Cuisine Style"] = cleanCusinesStringToArr(restaurantObj["Cuisine Style"]);
        });
        return restaurantsArr;
    }

    const getAllCusineTypes = (restaurantsArr) => {
        const arr = [];
        restaurantsArr.forEach(restaurantObj => {
            restaurantObj["Cuisine Style"].forEach(el => {
                // debugger;
                if(!arr.includes(el)){
                    arr.push(el);
                }
            });
        });
        return arr;
    }

    const onCusineChangeHandler = (e) => {
        let val = e.target.value;
        val = val === '0' ? 0 : val;
        setCusineType(val);
    }

    const onRankingChangeHandler = (e) => {
        setRankingType(parseInt(e.target.value));
    }




    return (
    <div className="App">
        <div>
            <select value={cusineType} onChange={onCusineChangeHandler}>
                <option value="0">Choose Cusine</option>
                {allCusineTypes.map(el => <option key={el} value={el}>{el}</option>)}
            </select>

            <select value={rankingType} onChange={onRankingChangeHandler}>
                <option value="0">Ranking</option>
                <option value="2">Rating: Low to High</option>
                <option value="1">Rating: High to Low</option>
            </select>
        </div>
        
        <List restArr={restaurantsArr} />
    </div>
    );
}

export default App;
