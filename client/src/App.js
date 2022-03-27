import React, { useState, useEffect, createContext } from 'react';
import axios from "axios";

import { ThemeProvider } from 'styled-components';
import { Container, Flex, theme } from './styles/Global';

import Header from './components/Header.js';
import DataTable from './routes/DataTable.js';


export const api = axios.create({
    baseURL: 'http://localhost:5000'
});

export const DataContext = createContext();

const App = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const request = await api.get('/users/api');
                setData(request.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        getData();
    }, []);

    return (
        <DataContext.Provider value={data}>
            <ThemeProvider theme={ theme } >
                <Container>
                    <Header />
                    <Flex>
                        <DataTable />
                    </Flex>
                </Container>
            </ThemeProvider>
        </DataContext.Provider>
    );
}

export default App;