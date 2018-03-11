<template>
    <div>
        <Grid :songs="songs" v-if="songs.length"/>
        <div v-if="!songs.length">Loading lol</div>
    </div>

</template>

<script>
    import csvtojson from 'csvtojson';
    import Grid from './components/Grid.vue'

    export default {
        name: 'app',
        created() {
            const songs = [];
            let key = 0;
            fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSndXZzM-gWDDNpt8HqSTPcT32OgHLyJovPYYV98AA-tRO4zlrbk4sV1EqRBYmz0UgMWswtN7M2Bk-j/pub?output=csv').then(a => a.text()).then(a => {
                csvtojson({noheader: true})
                    .fromString(a)
                    .on('csv', ([name, genre, instrumentalist, vocal, year]) => {
                        key++;
                        songs.push({name, genre, instrumentalist, vocal, year, key});
                    })
                    .on('done', () => {
                        this.songs = songs;
                    });
            })


        },
        data() {
            return {songs: []}
        },
        components: {
            Grid
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
