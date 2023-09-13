<template>
        <div class="flex py-1 px-3  bg-weather-secondary reounded-md shadow-md">
            <div class="flex flex-col px-2 flex-1">
                <h1 class="text-3xl"><span class="text-black">City:</span> {{ city.city }}</h1>
                <h2 class="text-3xl"><span class="text-black">State:</span> {{ city.state }}</h2>
                <h3 class="text-3xl"><span class="text-black">Country:</span> {{ city.weather.sys.country }}</h3>
                <button class="mt-6 w-20   bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                    @click="goToCityView(city)"><span>details</span></button>
            </div>

            <div class="flex flex-col gap-2">
                <div class="flex justify-end" :id=city.id @click="removecity">
                    <span class="cursor-pointer">&times;</span>

                </div>
                <p class="text-3xl self-end "> {{ convertFahrenheitToCelsius(city.weather.main.temp) }}&deg; </p>
                <div class="flex gap-2">
                    <span class="text-xs text-rose-500">
                        High: {{ convertFahrenheitToCelsius(city.weather.main.temp_max) }}&deg;
                    </span>
                </div>
                <div class="flex gap-2">
                    <span class="text-xs text-sky-300">
                        low: {{ convertFahrenheitToCelsius(city.weather.main.temp_min) }}&deg;
                    </span>
                </div>
            </div>

        </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
defineProps({
    city: {
        id: String,
        type: Object,
        default: () => { }
    }
})
function convertFahrenheitToCelsius(fahrenheit) {
    var celsius = (fahrenheit - 32) * 5 / 9;
    return Math.round(celsius)
}
const router = useRouter()
const goToCityView = (city) => {
    router.push({
        name: "cityViews",
        params: {
            state: city.state,
            city: city.city
        },
        query: {
            id: city.id,
            lat: city.coords.lat,
            lng: city.coords.lng,
        }
    })
}
const removecity = (e) => {
    const cities = JSON.parse(localStorage.getItem("savedCities"))
    const updatecities = cities.filter((city) => city.id !== e.currentTarget.id)
    localStorage.setItem("savedCities", JSON.stringify(updatecities))
    location.reload();

}
</script>