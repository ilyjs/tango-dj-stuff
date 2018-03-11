<template>
    <data-tables :data="data" :actions-def="actionsDef" :checkbox-filter-def="checkFilterDef"
                 :action-col-def="actionsDef">
        <el-table-column v-for="title in titles" :prop="title.prop" :key="title.label" :label="title.label"
                         sortable="custom">
        </el-table-column>
    </data-tables>
</template>

<script>

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
    }
    ];


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

                            // TODO:
                            // 1. Query Spotify
                            // 2. Let the user pick ths song
                            // 3. Get the song ID and song BPM (from metadata)
                            // 4. Connect to google sheets and upload spotifyID and bpm data to appropriate location
                            debugger;
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