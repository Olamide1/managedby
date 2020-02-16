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
    name: 'users',
    components: {
        Slide
    },
    data (){
        return{
            firstname: sessionStorage.getItem('firstname'),
            company_name: sessionStorage.getItem('company_name'),
            role: sessionStorage.getItem('role')
        }
    },
    methods: {
        logout () {
            sessionStorage.clear();
            this.$router.push('/')
        },
    }
}
</script>