<template>

    <div class="home">

        <Sidebar />
        <Results />

    </div>

</template>

<script>

import Sidebar from '@/components/Sidebar.vue'
import Results from '@/components/Results.vue'

export default {

    name: 'Home',

    components: {

        Sidebar,
        Results,

    }

}
</script>

<style scoped>

    .home {

        display:flex;
        flex-direction: row;
        align-items: flex-start;

    }


</style>
