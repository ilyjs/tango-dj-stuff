<template>
    <data-tables :data="data" :actions-def="actionsDef" :checkbox-filter-def="checkFilterDef"
                 :action-col-def="actionsDef">
        <el-table-column v-for="title in titles" :prop="title.prop" :key="title.label" :label="title.label"
                         sortable="custom">
        </el-table-column>
    </data-tables>
</template>

<script>
import queryString from 'query-string'
    const titles = [{
        prop: "name",
        label: "Name"
    }, {
        prop: "genre",
        label: "genre"
    }, {
        prop: "instrumentalist",
        label: "instrumentalist"
    }, {
        prop: "vocal",
        label: "vocal"
    }, {
        prop: "year",
        label: "year"
    },

    ];

    const logIn = ()=>{
      const parsedHash = queryString.parse(location.hash);
      if(parsedHash.access_token) return parsedHash.access_token
      return false
    }

    export default {
        name: 'Grid',
        props: ['songs'],
        data() {
            return {
                data: this.songs,
                titles,
                actionsDef: {
                    colProps: {
                        span: 5
                    },
                    def: [{
                        name: 'link to spotify',
                        handler: (row) => {
                            console.log(row.instrumentalist);
                            console.log(row.name);
                            console.log(row.vocal);

                          //window.location.replace('https://accounts.spotify.com/authorize?client_id=21c0c52d617f4cb09df75223b6d484a0&redirect_uri=http:%2F%2Flocalhost:8080/&response_type=token')

                          const FETCH_URL =  "https://api.spotify.com/v1/search?q=MILONGON+Francisco&type=track"
                          fetch(FETCH_URL, {
                            method: 'GET',
                            headers: {
                              'Authorization': "Bearer BQAyxYYQMmoCMcvHF_KYUO30XLJjQkdqKKrReLZAhJz4rvFGlLcbXoZ6Dlj8BositlQ9XaSf7C7wVlRX2Lm-cdxRTo-8hX7M2XqXhL9i8gwFa98z1qz1Aj9BL4XggpBou0evlp1uEDeq9DqUnfoO7iru8Sh6Re8"
                            }
                          }).then(response => response.json())
                            .then(json => console.log('json', json));

                          // TODO:
                            // 1. Query Spotify
                            // 2. Let the user pick ths song
                            // 3. Get the song ID and song BPM (from metadata)
                            // 4. Connect to google sheets and upload spotifyID and bpm data to appropriate location
                        },
                        buttonProps: {
                            type: 'text'
                        }
                    }]
                },
                checkFilterDef: {
                    props: 'year',
                    def: [{
                        'code': '1945',
                        'name': '1945'
                    }, {
                        'code': '1944',
                        'name': '1944'
                    }]
                },
                actionColDef: {
                    label: 'Actions',
                    def: [{
                        handler: row => {
                            console.log(row);
                        },
                        name: 'Link to spotify'
                    }]
                }
            }
        },
        methods: {
            getRowActionsDef() {
                let self = this;
                return [{
                    type: 'primary',
                    handler(row) {
                        self.$message('Edit clicked');
                        console.log('Edit in row clicked', row)
                    },
                    name: 'Edit'
                }]
            }
        }
    }
</script>