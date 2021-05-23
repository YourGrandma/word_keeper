<template>

    <div id="app">

        <div id="nav">

            <router-link :to="{name: 'Home'}">Word Keeper</router-link>
            <router-link :to="{name: 'Favorites'}">Starred words</router-link>

        </div>

        <router-view/>

    </div>

</template>

<style>

    body {

        background-color: #efefef;
        margin:0;
        height:100%
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        padding:12px;
        margin: 0;
        height:100%;
    }

    #nav {
        display: flex;
        flex-shrink: 1;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 16px 32px;
        background-color: #6ec0fa;
        border-radius:3px;
        margin-bottom:30px;
    }

    #nav a {

        font-weight: bold;
        color: white;
    }

    #nav a.router-link-exact-active {
        color: white;
    }

</style>
