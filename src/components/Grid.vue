<template>
    <div>
        <el-button type="text" @click="dialogTableVisible = true">open a Table nested Dialog</el-button>
    <data-tables :data="data" :actions-def="actionsDef" :checkbox-filter-def="checkFilterDef"
                 :action-col-def="actionsDef">
        <el-table-column v-for="title in titles" :prop="title.prop" :key="title.label" :label="title.label"
                         sortable="custom">
        </el-table-column>
    </data-tables>
    <el-button type="text" @click="dialogTableVisible = true">open a Table nested Dialog</el-button>
        <el-dialog center title="Select audio" :visible.sync="dialogTableVisible">
            <el-table ref="singleTable" :data="tableSelectData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
                <el-table-column type="index" >
                </el-table-column>
                <el-table-column style="width: 20%" property="name" label="Name" >
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </template>

                </el-table-column>
                <el-table-column style="width: 20%" property="preview_url" label="Preview">
                    <template  slot-scope="scope">
                        <aplayer v-if="scope.row.preview_url" mutex

                                 :music="{
                                    title: scope.row.name,
                                    author: ' ',
                                    url:  scope.row.preview_url ,
                                    pic: scope.row.img,
                                    lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
                                         }"
                        />
                        <p v-else> -</p>
                    </template>


                </el-table-column>
                <el-table-column style="width: 20%" property="spotify" label="Spotify">
                    <template slot-scope="scope">

                        <a target="_blank" v-bind:href=scope.row.spotify> Open on Spotify </a>
                    </template>
                </el-table-column>
                <el-table-column style="width: 20%"  label="Select track for save">
                    <template slot-scope="scope">
                        <el-button type="success" round @click="saveSheets(scope.row.id)">Save</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </el-dialog>
    </div>
</template>

<script>
import queryString from 'query-string'
import Aplayer from 'vue-aplayer'

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
      components: {
        Aplayer,
      },

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
                          const parsedHash = queryString.parse(location.hash);
                          let instrumentalist = row.instrumentalist.split(',')[0];
                          if(parsedHash.access_token) {
                           const {access_token} = parsedHash
                            const FETCH_URL =  `https://api.spotify.com/v1/search?q=${row.name} ${instrumentalist}&type=track`
                            fetch(FETCH_URL, {
                              method: 'GET',
                              headers: {
                                'Authorization': `Bearer ${access_token}`,
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              }
                            }).then(response =>{
                              console.log('response1',response)
                                return response.json()

                              })
                              .then(json => {
                                console.log('json', json)
                                if(json.error){
                                  if(json.error.status === 401) window.location.replace('https://accounts.spotify.com/authorize?client_id=21c0c52d617f4cb09df75223b6d484a0&redirect_uri=http:%2F%2Flocalhost:8080/&response_type=token')
                                }

                            this.tableSelectData = json.tracks.items.map(item =>{
                                 return {name:item.name, preview_url: item.preview_url, spotify: item.external_urls.spotify, img:item.album.images[2].url, id:item.id}
                                })


                              });

                          } else {
                            window.location.replace('https://accounts.spotify.com/authorize?client_id=21c0c52d617f4cb09df75223b6d484a0&redirect_uri=http:%2F%2Flocalhost:8080/&response_type=token')
                          }


                          //window.location.replace('https://accounts.spotify.com/authorize?client_id=21c0c52d617f4cb09df75223b6d484a0&redirect_uri=http:%2F%2Flocalhost:8080/&response_type=token')


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
                },

             tableSelectData: [],

              tableData: [{
                date: '2016-05-03',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
              }, {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
              }, {
                date: '2016-05-04',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
              }, {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
              }],
              currentRow: null,
              dialogTableVisible: false,
              dialogFormVisible: false,
              form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
              },
              formLabelWidth: '120px'

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
            },
          saveSheets(id){
              console.log('id', id)
          },
          setCurrent(row) {
            this.$refs.singleTable.setCurrentRow(row);
          },
          handleCurrentChange(val) {
            this.currentRow = val;
          }

        }
    }
</script>