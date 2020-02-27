<template>
    <div class="container-fluid">
        <div>
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
            <router-link to="/todo" v-show="role == 'User'">
                <span>Done requests</span>
            </router-link>
            <a @click="logout"><span>Logout</span></a>

            </Slide> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              
                 {{company_name}} is ManagedBy <b>{{firstname}}  | Todos</b>
               
            </b-card-body>
        </b-card>
        </div>
<br>

<!-- Admin Section -->
    <div v-show="role == 'Admin'">
       <center>
           <div>
                <h2>Admin</h2>
           </div>
           
      </center>
    </div>

<!-- End of admin section -->
<!-- user section -->
    <div v-show="role == 'User'">
        <center>
            <h4>Your handled requests. </h4>
        <div v-if="dones.length == 0">
            <p>None of your requests are done yet</p>
        </div>

        <div v-else>
            <table class="table scroll">
            <thead>
                <tr>
                 <th scope="col">Status</th>
                 <th scope="col">Area</th>
                 <th scope="col">Category</th>
                </tr>
            </thead>
            <tbody v-for="(done, index) in dones" :key="index">
                <tr v-show="done.status == 'done'">
                    <td><span class="badge badge-success">done</span></td>
                    <td>{{done.area}}</td>
                    <td>{{done.category}}</td>
                </tr>
            </tbody>
            </table>
        </div>
        </center>
    </div>

    <!--End of user section -->
</div>
</template>

<script>
import { Slide } from 'vue-burger-menu'
import axios from 'axios'
export default {
    name: 'todo',
    components: {
        Slide
    },
    data(){
        return {
            role: sessionStorage.getItem('role'),
            company_name: sessionStorage.getItem('company_name'),
            firstname: sessionStorage.getItem('firstname'),
            company_email: sessionStorage.getItem('company_email'),
            dones: [],
            requests: [],
            total_request: ''
        }
    },
    methods: {
        logout() {
            sessionStorage.clear()
            this.$router.push('/')
        },
        findMyRequest(){
          axios.post('http://localhost:3000/api/myrequests', {
                  request_by: this.company_email
          }).then( response => {
              console.log(response.data)
              this.my_requests = response.data
              this.dones = response.data
              this.my_total_request = response.data.length
          }).catch(err => {
              console.log(err)
          })
      },
      loadCompanyRequest() {
            axios.post('http://localhost:3000/api/getcompanyrequest', {
                    company_name: this.company_name
            }).then( resp => {
                this.total_request = resp.data.length
                this.requests = resp.data
                console.log(this.requests)
            }).catch( err => {
                console.log(err)
            })
        }
    },
    mounted(){
        this.findMyRequest()
        this.loadCompanyRequest()
    }
}
</script>

<style>

</style>