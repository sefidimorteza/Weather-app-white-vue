<template>
    <div v-for="city in savedCities" :key="city.div">
        <CityCard :city="city" />
    </div>
    <p v-if="savedCities.length===0">
    No location added.
    </p>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import CityCard from './CityCard.vue';

const savedCities = ref([])
const getCities = async () => {
    if (localStorage.getItem("savedCities")) {
        savedCities.value = JSON.parse(
            localStorage.getItem("savedCities")
        )
        const requests = []
        savedCities.value.forEach((city) => {
            requests.push(
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`)
            )
        })
        const weatherData = await Promise.all(requests);
        await new Promise((res)=>setTimeout(res, 1000))
        weatherData.forEach((value, index) => {
            savedCities.value[index].weather = value.data
        })
    }
}
await getCities()

</script>
