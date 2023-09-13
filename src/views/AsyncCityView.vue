<template>
    <div class="flex flex-col flex-1 items-center">
        <!-- Banner -->
        <div v-if="route.query.preview" class="text-white p-4 bg-weather-secondary w-full text-center">
            <p>
                You Ae currently previwing this city, click the "+" icon to start tracking this chity.
            </p>
        </div>
        <!-- overvie -->
        <h1 class=" flex flex-col items-center text-4xl mb-2 text-white py-12 ">
            {{ route.params.state }}
            <p class="text-sm mb-12">
                {{
                    new Date(weatherDate.currentTime).toLocaleDateString("en-us", {
                        weekday: "short",
                        month: "long",
                        day: "2-digit",
                    })
                }}
                {{
                    new Date(weatherDate.currentTime).toLocaleDateString("en-us",
                        {
                            timestyle: "short"
                        })
                }}
            </p>
            <p class="text-8xl mb-8">
                {{ convertFahrenheitToCelsius(weatherDate.current.temp) }}&deg;
            </p>
            <p class="text-center">
                Feels Like
                {{ convertFahrenheitToCelsius(weatherDate.current.feels_like) }}&deg;
            </p>
            <p class="capitalize">
                {{ weatherDate.current.weather[0].description }}
            </p>
            <img class="2-[150px] h-auto"
                :src="`http://openweathermap.org/img/wn/${weatherDate.current.weather[0].icon}@2x.png`">
        </h1>

        <hr class="border-white border-opacity-30 border w-full" />
        <!-- hour weather -->
        <div class="max-w-screen-md w-full py-12">
            <div class="mx-8 text-white">
                <h2 class="mb-4">Hourly weather</h2>
                <div class="flex gap-10 overflow-x-scroll">
                    <div v-for="hourData in weatherDate.hourly" :key="hourData.dt" class="flex flex-col gap-4 items-center">
                        <p class="whitespace-nowrap text-md">
                            {{ new Date(hourData.currentTime).toLocaleTimeString("en-us", {
                                hour: "numeric"
                            }) }}
                        </p>
                        <img class="2-[150px] h-auto"
                            :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`">
                        <p class="text-xl">
                            {{ convertFahrenheitToCelsius(hourData.temp) }}&deg;
                        </p>
                    </div>
                </div>
            </div>

        </div>
        <hr class="border-white border-opacity-30 border w-full" />
        <!-- weekly weather -->
        <div class="max-w-screen-md w-full py-12">
            <div class="ms-8 text-white">
                <div class="mv-4">7 Day Forcast
                    <div v-for="day in weatherDate.daily" :key="day.dt" class=" flex items-center">
                        <p class="flex-1">
                            {{ new Date(day.dt * 1000).toLocaleDateString(
                                "en-us",
                                {
                                    weekday: "long"
                                }
                            ) }}
                        </p>
                        <img class="w-[50px] h-[50px] object-cover"
                            :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`">
                        <div class="flex gap-2 flex-1 justify-end">
                            <p>High: {{ convertFahrenheitToCelsius(day.temp.max) }}</p>
                            <p>Low: {{ convertFahrenheitToCelsius(day.temp.min) }}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="flex items-center gap-2 py-12 text-white duration-150 hover:text-red-600" v-if="!route.query.preview">
            <button @click="removecity"
                class="mt-6 w-full bg-red-400 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md cursor-pointer">
                <i v-if="!checkLoading" class="fa-solid fa-trash px-2">
                </i>
                <LOADER :laoding="true" v-if="checkLoading" />
                <span v-if="!checkLoading">Remove City</span>
            </button>

        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import LOADER from '../components/LOADER.vue';
import { ref } from 'vue';

const route = useRoute()
const checkLoading = ref(false);


const getWeatherData = async () => {
    try {
        const weatherData = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
        );

        // cal current date & time
        const localOffset = new Date().getTimezoneOffset() * 60000;
        const utc = weatherData.data.current.dt * 1000 + localOffset;
        weatherData.data.currentTime =
            utc + 1000 * weatherData.data.timezone_offset;

        // cal hourly weather offset
        weatherData.data.hourly.forEach((hour) => {
            const utc = hour.dt * 1000 + localOffset;
            hour.currentTime =
                utc + 1000 * weatherData.data.timezone_offset;
        });

        return weatherData.data;
    } catch (err) {
        console.log(err);
    }
}
function convertFahrenheitToCelsius(fahrenheit) {
    var celsius = (fahrenheit - 32) * 5 / 9;
    return Math.round(celsius)
}
const weatherDate = await getWeatherData()

const router = useRouter()

const removecity = () => {
    checkLoading.value = true;

    const cities = JSON.parse(localStorage.getItem("savedCities"))
    const updatecities = cities.filter((city) => city.id !== route.query.id)

    localStorage.setItem("savedCities", JSON.stringify(updatecities))
    setTimeout(() => {
        router.push({
            name: "home"
        })
    }, 1000);
}
</script>