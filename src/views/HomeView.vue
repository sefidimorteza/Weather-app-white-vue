
<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input type="text" placeholder="Search for a ciy state" @input="getSearchResoult" v-model="searchQuery"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px-1px-0-0-$004E71]">

      <ul class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="mapboxSearchResults">
        <p v-if="searchError">
          somthing wrong...
        </p>
        <p v-if="!searchError && mapboxSearchResults.length === 0">
          no resoult try again...
        </p>
        <template v-else>
          <li class="py-2 cursor-pointer" v-for="searchResoult in  mapboxSearchResults" :key="searchResoult.id"
            @click="previewCity(searchResoult)">
            {{ searchResoult.place_name }}
          </li>
        </template>
      </ul>
    </div>

    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <LOADER :laoding="true"/>
        </template>
      </Suspense>
    </div>
  </main>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import CityList from '../components/CityList.vue'
import LOADER from '../components/LOADER.vue';
const searchQuery = ref("")
const queryTimeout = ref(null)
const mapboxSearchResults = ref(null)
const mapboxAPIKey = "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q"
const searchError = ref(null)
const getSearchResoult = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );
        mapboxSearchResults.value = result.data.features;
      } catch {
        searchError.value = true
      }
      return
    }
    mapboxSearchResults.value = null
  }, 300)
}
const router = useRouter()
const previewCity = (searchResoult) => {
  const [city, state] = searchResoult.place_name.split(",")
  router.push({
    name: "cityViews",
    params: {
      state: state.replaceAll(" ", ""), city: city
    },
    query: {
      lat: searchResoult.geometry.coordinates[1],
      lng: searchResoult.geometry.coordinates[0],
      preview: true
    },
  })

}


</script>

