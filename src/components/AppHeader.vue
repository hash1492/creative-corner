<template>
    <div>
        <header class="app-header">
            <ul class="header-links navigation-links">
                <li class="header-link">
                    <a class="app-header-logo" href="/home">
                        <img src="./../assets/logo.png" alt="App Logo">
                    </a>
                </li>  
                <li class="header-link">
                    <a href="/home">Home</a>
                </li>
                <li class="header-link">
                    <a href="/contact-us">Contact</a>
                </li>
            </ul>
            <!-- <ul class="header-links navigation-links-end">
                <li class="header-link">
                    <input type="text" class="search-input" v-model="searchText" placeholder="Search...">
                </li>
            </ul> -->
        </header>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchText: ''
            }
        }
    }
</script>

<style scoped>
    .app-header {
        align-items: center;
        background-color: #ea0000;
        height: 60px;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        font-family: 'Merienda', cursive;
    }

    .navigation-links {
        display: flex;
        flex-direction: row;
        margin-bottom: 0;
    }

    .navigation-links-end {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 0;
    }

    .app-header-logo {
        justify-self: center;
    }
    
    .app-header-logo img {
        width: 30px;
        justify-self: center;
    }

    .header-links {
        display: flex;
        align-items: center;
    }

    .header-link {
        list-style-type: none;
        padding: 0 10px;
    }

    .header-link a {
        color: white;
        text-decoration: none;
        font-weight: 700;
    }

    .header-link a:hover {
        color: yellow;
    }

    .search-input {
        border-radius: 3px;
        border: 0;
        padding: 5px 10px;
        color: #6f7c8a;
    }
</style>