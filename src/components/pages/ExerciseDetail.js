import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
// import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';
import Detail from '../Detail';
import ExerciseVideos from '../ExerciseVideos';
import SimilarExercises from '../SimilarExercises';
import { exerciseOptions, fetchData, youtubeOptions } from '../../utils/fetchData';

const ExerciseDetail = () => {

    const [exerciseDetail, setExerciseDetail] = useState({});
    const { id } = useParams();
    const [exerciseVideos, setExerciseVideos] = useState([]);
    const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
    const [equipmentExercises, setEquipmentExercies] = useState([]);

    useEffect(() => {
        const fetchExercisesData = async () => {
            const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
            const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';
            const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
            setExerciseDetail(exerciseDetailData);

            const ExerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions);
            setExerciseVideos(ExerciseVideosData.contents);

            const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
            setTargetMuscleExercises(targetMuscleExercisesData);

            const equipmentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
            setEquipmentExercies(equipmentExercisesData);
            // console.log('ex de', exerciseDetail);
            // console.log('ex vid', exerciseVideos);
            // console.log('ex t', targetMuscleExercises);
            // console.log('ex eq', equipmentExercises);
        }
        fetchExercisesData();
    }, [id]);
    // console.log('1ex de', exerciseDetail);
    // console.log('1e1x vid', exerciseVideos);
    // console.log('1ex t', targetMuscleExercises);
    // console.log('1ex eq', equipmentExercises);
    return (
        <Box>
            <Detail exerciseDetail={exerciseDetail} />
            <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
            <SimilarExercises targetMuscleExercises={targetMuscleExercises}
                equipmentExercises={equipmentExercises} />
        </Box>
    )
}

export default ExerciseDetail;