<template>
    <Grid :songs="songs"/>
</template>

<script>
    import csvtojson from 'csvtojson';
    import Grid from './components/Grid.vue'

    export default {
        name: 'app',

        created() {
            const songs = [];
            fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSndXZzM-gWDDNpt8HqSTPcT32OgHLyJovPYYV98AA-tRO4zlrbk4sV1EqRBYmz0UgMWswtN7M2Bk-j/pub?output=csv').then(a => a.text()).then(a => {
                csvtojson({noheader: true})
                    .fromString(a)
                    .on('json', (song) => {
                        songs.push(song);
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
