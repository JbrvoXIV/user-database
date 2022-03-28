import React, { useContext, useState, useEffect } from 'react';
import { api, DataContext } from '../App.js';

import UserData from './UserData.js';
import FilterOptions from './FilterOptions.js';

import { DataStyled, AddUserRow } from '../styles/Data.styled.js';

const DataTable = () => {

    const data = useContext(DataContext);

    const [userFriends, setUserFriends] = useState([]);
    const [userFamily, setUserFamily] = useState([]);

    useEffect(() => { // set initial state of all users in order of creation
        setUserFriends(
            data.filter(user => {
                return user.relationship === 'Friend'
            }).map(user => { return( <UserData key={user._id} {...user} /> ) })
        );
        setUserFamily(
            data.filter(user => {
                return user.relationship === 'Family'
            }).map(user => { return ( <UserData key={user._id} {...user} /> ) })
        );
    }, [data]);

    const handleFilter = (e, id) => {
        const sendFilter = async () => {
            try {
                const request = await api.get(`/users/api/filtered?filter=${e.target.value}`);
                const response = await request.data;
                if(id === 'Friends') {
                    return setUserFriends(response.filter(user => {
                            return user.relationship === 'Friend'
                        })
                        .map(user => { return( <UserData key={user._id} {...user} /> ) })
                    );
                } else {
                    return setUserFamily(response.filter(user => {
                            return user.relationship === 'Family'
                        })
                        .map(user => { return( <UserData key={user._id} {...user} /> ) })
                    );
                }     
            } catch (error) {
                console.log(error.message);
            }
        }
        sendFilter();
    }
    
    return (
        <DataStyled>
            <table>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>BIRTHDAY</th>
                        <th>FAVORITE MOVIE</th>
                        <th>FAVORITE FOOD</th>
                        <th>FAVORITE COLOR</th>
                        <th>FAVORITE HOBBY</th>
                        <th>RELATIONSHIP</th>
                        <FilterOptions handleFilter={handleFilter} id='Friends' />
                    </tr>
                </thead>
                <tbody>
                    {userFriends}
                    <AddUserRow>
                        <td colSpan={8}>
                            <button>ADD FRIEND</button>
                        </td>
                    </AddUserRow>
                </tbody>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>BIRTHDAY</th>
                        <th>FAVORITE MOVIE</th>
                        <th>FAVORITE FOOD</th>
                        <th>FAVORITE COLOR</th>
                        <th>FAVORITE HOBBY</th>
                        <th>RELATIONSHIP</th>
                        <FilterOptions handleFilter={handleFilter} id='Family' />
                    </tr>
                </thead>
                <tbody>
                    {userFamily}
                    <AddUserRow>
                        <td colSpan={8}>
                            <button>ADD FAMILY MEMBER</button>
                        </td>
                    </AddUserRow>
                </tbody>
            </table>
        </DataStyled>
    );
}

export default DataTable;