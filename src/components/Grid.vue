<template>
    <data-tables :data="data" :actions-def="actionsDef" :checkbox-filter-def="checkFilterDef"
                 :action-col-def="actionsDef.actionColDef">
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
                        name: 'new',
                        handler: () => {
                            this.data.push({
                                'content': 'hello world',
                                'flow_no': 'FW201601010004',
                                'flow_type': 'Help',
                                'flow_type_code': 'help',
                            })
                        },
                        buttonProps: {
                            type: 'text'
                        }
                    }, {
                        name: 'import',
                        handler: () => {
                            this.$message('import clicked')
                        },
                        icon: 'upload'
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
                            this.$message('Edit clicked');
                            row.flow_no = "hello word"
                        },
                        name: 'Edit'
                    }, {
                        icon: 'message',
                        type: 'text',
                        handler: row => {
                            this.$message('RUA in row clicked');
                            console.log('RUA in row clicked', row)
                        },
                        name: 'RUA'
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