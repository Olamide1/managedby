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

<center>
    <center>
        <p v-if="persons.length == 0">No colleagues added</p>
        <div v-else>
         <table class="table scroll">
        
            <thead>
                <tr>
                 <th scope="col">Name</th>
                 <th scope="col">Email</th>
                 <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody v-for="(person, index) in persons" :key="index">
                <tr>
                <td>{{person.firstname}}</td>
                <td>{{person.company_email}}</td>
                <td v-if="person.role == 'User'">
                    <b-dropdown id="dropdown-1" dropright variant="dark-outline">
                        <b-dropdown-header><h5>ROLE: {{person.role}}</h5></b-dropdown-header>
                        <b-dropdown-item class="list-group">
                             <button class="btn btn-outline-danger" @click="deleteUser(person._id, index)">Delete</button>
                        </b-dropdown-item>
                    </b-dropdown>
                </td>
                </tr>
            </tbody>
    </table>
    </div>
    </center>

</center>
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
            persons: [],
            total_persons: '',
            forindex: 0
        }
    },
    methods: {
        logout () {
            sessionStorage.clear();
            this.$router.push('/')
        },
        deleteUser (id, index) {
            const options = {
        headers: {'Content-Type': 'application/json'}
      }
            axios.post('http://managedby.herokuapp.com:80/api/deleteuser/', {
                id: id
            },{crossdomain: true}, options).then( resp => {
                this.persons.splice(index, 1);
                this.total_persons = this.persons.length
            })
        },
        getCreatedBy () {
            const options = {
        headers: {'Content-Type': 'application/json'}
      }
            axios.post('http://managedby.herokuapp.com:80/api/coll/', {
                creator: this.creator
            }, {crossdomain:true} ,options).then( res => {
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