import React, { useState } from 'react';
import { api } from '../App';

import { Container, Flex, FormStyled, HeaderStyled, InputStyled, LabelStyled } from '../styles/Global';

const Create = () => {

    const [data, setData] = useState({
        fname: '',
        lname: '',
        email: '',
        birthday: '',
        favMovie: '',
        favFood: '',
        favColor: '',
        favHobby: ''
    });

    const submitData = e => {
        e.preventDefault();

        const sendData = async () => {
            try {
                await api.post('/users/api', {...data});
                console.log('Data submmitted succesfully!');
            } catch (error) {
                console.log(error.message);
            }
        }
        sendData();
    }

    const handleChange = e => {
        const idVal = e.target.id;
        const name = e.target.name;

        if(!name) {
            return setData(oldData => ({
                ...oldData,
                [idVal]: e.target.value
            }));
        } else {
            return setData(oldData => ({
                ...oldData,
                [name]: e.target.value
            }))
        }
    }

    console.log(data.relationship);

    return (
        <Container>
            <HeaderStyled>
                <h1>CREATE PERSON</h1>
            </HeaderStyled>
            <Flex>
                <FormStyled onSubmit={submitData} autoComplete='off' autoSave='off' >
                    <LabelStyled htmlFor='fname' >FIRST NAME</LabelStyled>
                    <InputStyled
                        onChange={handleChange}
                        type='text'
                        id='fname'
                        required={true}
                        value={data.fname}
                    />
                    <LabelStyled htmlFor='lname' >LAST NAME</LabelStyled>
                    <InputStyled
                        onChange={handleChange}
                        type='text'
                        id='lname'
                        required={true}
                        value={data.lname}
                    />
                    <LabelStyled htmlFor='email' >EMAIL</LabelStyled>
                    <InputStyled
                        onChange={handleChange}
                        type='email'
                        id='email'
                        required={true}
                        value={data.email}
                    />
                    <LabelStyled htmlFor='birthday' >BIRTHDAY</LabelStyled>
                    <InputStyled
                        onChange={handleChange}
                        type='date'
                        id='birthday'
                        required={true}
                        value={data.birthday}
                    />
                    <LabelStyled htmlFor='favMovie' >FAVORITE MOVIE</LabelStyled>
                    <InputStyled
                        onChange={handleChange}
                        type='text'
                        id='favMovie'
                        required={true}
                        value={data.favMovie}
                    />
                    <LabelStyled htmlFor='favFood' >FAVORITE FOOD</LabelStyled>
                    <InputStyled
                        onChange={handleChange}
                        type='text'
                        id='favFood'
                        required={true}
                        value={data.favFood}
                    />
                    <LabelStyled htmlFor='favColor' >FAVORITE COLOR</LabelStyled>
                    <InputStyled
                        onChange={handleChange}
                        type='text'
                        id='favColor'
                        required={true}
                        value={data.favColor}
                    />
                    <LabelStyled htmlFor='favHobby' >FAVORITE HOBBY</LabelStyled>
                    <InputStyled
                        onChange={handleChange}
                        type='text'
                        id='favHobby'
                        required={true}
                        value={data.favHobby}
                    />
                    <LabelStyled htmlFor='friend' >
                        <InputStyled
                            onChange={handleChange}
                            type='radio'
                            id='friend'
                            name='relationship'
                            value='Friend'
                            checked={data.relationship === 'Friend'}
                            required={true}
                        />FRIEND
                    </LabelStyled>
                    <LabelStyled htmlFor='family' >
                        <InputStyled
                            onChange={handleChange}
                            type='radio'
                            id='family'
                            name='relationship'
                            value='Family'
                            checked={data.relationship === 'Family'}
                        />FAMILY
                    </LabelStyled>
                    <InputStyled type='submit' value='SUBMIT' />
                </FormStyled>
            </Flex>
        </Container>
    )
}

export default Create;