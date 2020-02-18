<template>
    <div class="container-fluid">
        <div v-show="role == 'Admin'">
            <b-card>
            <b-card-body>
            <Slide width="200" noOverlay>
            <router-link to="/dashboard">
                <span>Dashboard</span>
            </router-link>
       
            <router-link to="/users" v-show="role == 'Admin'">
                <span>Colleagues</span>
            </router-link>
            <router-link to="/todo" v-show="role == 'Admin'">
                <span>Todo</span>
            </router-link>
            <a @click="logout"><span>Logout</span></a>

            </Slide> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              
                 {{company_name}} is ManagedBy <b>{{firstname}}  | View Colleagues</b>
               
            </b-card-body>
        </b-card>
        </div>
<br>
    </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'
export default {
    name: 'todo',
    components: {
        Slide
    },
    data(){
        return {
            role: sessionStorage.getItem('role'),
            company_name: sessionStorage.getItem('company_name'),
            firstname: sessionStorage.getItem('firstname')
        }
    },
    methods: {
        logout() {
            sessionStorage.clear()
            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>