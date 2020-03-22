<template>
    <div>
        <Menu mode="horizontal" :theme="theme1" active-name="1" @on-select="handleSelect">
            <MenuItem name="1">
                 <Button type="primary" @click="goHome()">
                    <Icon type="chevron-left"></Icon>
                    返回
                </Button>
            </MenuItem>
            <!--<MenuItem name="2">-->
                <!--<Icon type="ios-people" />-->
                <!--性能数据-->
            <!--</MenuItem>-->
            <!--<MenuItem name="3">-->
                <!--<Icon type="ios-people" />-->
                <!--应用安装-->
            <!--</MenuItem>-->
        </Menu>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'light'
            }
        },
        methods: {
            handleSelect() {
                console.log(name)
            },
            goHome(){
                this.$router.push('/');
            }

        }
    }
</script>
