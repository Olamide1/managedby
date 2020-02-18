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

<table class="table" align="center">
        <p align="center" v-if="persons.length == 0">No colleagues added</p>
        <div>
            <thead>
                <tr>
                 <th scope="col">Name</th>
                 <th scope="col">Email</th>
                 <th scope="col">Role</th>
                </tr>
            </thead>
            <tr v-for="(person, index) in persons" :key="index">
                <td>{{person.firstname}}</td>
                <td>{{person.company_email}}</td>
                <td>{{person.role}}</td>
            </tr>
         </div>
    </table>
    </div>
</template>
<script>
import axios from 'axios'
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
            role: sessionStorage.getItem('role'),
            creator: sessionStorage.getItem('company_email'),
            persons: []
        }
    },
    methods: {
        logout () {
            sessionStorage.clear();
            this.$router.push('/')
        },
        getCreatedBy () {
            console.log(this.creator)
            axios.post('http://localhost:3000/api/coll', {
                creator: this.creator
            }).then( res => {
                console.log(res.data)
                this.persons = res.data
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mounted(){
        this.getCreatedBy()
    }
}
</script>