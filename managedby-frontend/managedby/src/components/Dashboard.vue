<template>
    <div class="container-fluid">
        <div >
            <b-card class="container">
            <b-card-body>
            <Slide width="200" noOverlay>
            <router-link to="/dashboard">
                <span>Dashboard</span>
            </router-link>

            <a @click="logout"><span>Logout</span></a>
            </Slide> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              
                 {{company_name}} is ManagedBy <b>{{firstname}}</b>
               
            </b-card-body>
        </b-card>
        </div>



    </div>
</template>
<script>
import { Slide } from 'vue-burger-menu'
export default {
    name: 'dashboard',
    components: {
        Slide
    },
    data(){
        return {
            firstname: sessionStorage.getItem('firstname'),
            company_name: sessionStorage.getItem('company_name')
        }
    },
    methods: {
        logout () {
            sessionStorage.clear();
            this.$router.push('/')
        }
    }
}
</script>
<style>
    
</style>