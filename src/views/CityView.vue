<template>
    <div>
        <Suspense>
            <AsyncCityView />
            <template #fallback>
                <LOADER :laoding="true"/>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import AsyncCityView from './AsyncCityView.vue';
import LOADER from '../components/LOADER.vue';

</script>