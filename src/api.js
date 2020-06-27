import axios from 'axios';

export const getRestaurantsData = () => {
    return axios.get('https://raw.githubusercontent.com/MishaBatsiashvili/myJsonPlaceholder/master/db.json');
}