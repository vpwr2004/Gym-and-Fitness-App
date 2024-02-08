import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import '../App.css';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';
const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {

    const [search, setSearch] = useState('');
    const [bodyParts, setBodyParts] = useState([]);
    useEffect(() => {
        const fetchExercisesData = async () => {
            const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
            // console.log('bodyPartsDAta', bodyPartsData);
            setBodyParts(['all', ...bodyPartsData]);
        }
        fetchExercisesData();
    }, []);
    const HandleSearch = async () => {
        if (search) {
            const exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
            console.log('ex data', exerciseData);
            const searchedExercises = exerciseData.filter((exercise) =>
                exercise.name.toLowerCase().includes(search)
                || exercise.target.toLowerCase().includes(search)
                || exercise.equipment.toLowerCase().includes(search)
                || exercise.bodyPart.toLowerCase().includes(search));
            setSearch('');
            setExercises(searchedExercises);
        }
    }
    return (
        <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
            <Typography fontWeight={700} sx={{
                fontsize: { lg: '44px', xs: '30px' }
            }}
                mb="30px" textAlign="center">
                Awesome Exercise You <br /> Should Know
            </Typography>
            <Box position='relative' mb="72px">
                <TextField
                    sx={{
                        input: {
                            fontWeight: '700',
                            border: 'none',
                            borderRadius: '4px'
                        },
                        width: { lg: '800px', xs: '350px' },
                        backgroundColor: '#fff',
                        borderRadius: '40px'
                    }}
                    height="76px"
                    value={search}
                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    placeholder="Search Exercises"
                    type="text"
                />
                <Button className='search-btn'
                    sx={{
                        bgcolor: '#FF2625',
                        color: '#fff',
                        textTransform: 'none',
                        width: { lg: '175px', xs: '80px' },
                        fontSize: { lg: '2px', xs: '14px' },
                        height: '56px',
                        position: 'absolute',
                        right: '0px'
                    }}
                    onClick={HandleSearch}
                >Search</Button>
            </Box>
            <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
                <HorizontalScrollbar
                    data={bodyParts}
                    bodyPart={bodyPart}
                    setBodyPart={setBodyPart}
                    isBodyParts
                />
            </Box>
        </Stack>
    )
}

export default SearchExercises