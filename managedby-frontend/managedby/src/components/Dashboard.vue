<template>
    <div class="container-fluid">
        <div >
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
              
                 <span v-if="role == 'Admin'">{{company_name}} is ManagedBy <b>{{name}} | Dashboard</b></span>
                <span v-else>Welcome, <b>{{name}}.</b></span>
            </b-card-body>
        </b-card>
        </div>
<br>
    <div v-if="role == 'Admin'">
        <b-button variant="outline-dark" align="center" @click="showModal">Add Colleagues</b-button> <br><br>
        <div class="card" style="width: 60%;">
            <div class="card-body">
                <h5 class="card-title">Total requests for {{company_name}}</h5>
                    <p class="card-text">
                        total request placed is {{total_request}}
                    </p>
                </div>
        </div>

    <b-modal ref="my-modal" hide-footer title="Add colleagues">
      <b-form-group>
        <b-form-input placeholder="Company Email" v-model="company_email" type="email"></b-form-input>
      </b-form-group>
       <b-form-group>
        <b-form-input placeholder="Firstname" v-model="firstname"></b-form-input>
      </b-form-group>
      <p align="center">{{message}}</p>
      <b-button class="mt-3" variant="outline-dark" block @click="addColleagues">Add</b-button>
    </b-modal>

    <table class="table" align="center">
        <p align="center" v-if="requests.length == 0">No requests available</p>
        <div>
            <thead>
                <tr>
                 <th scope="col">By</th>
                 <th scope="col">Area</th>
                 <th scope="col">Category</th>
                </tr>
            </thead>
            <tr v-for="(request, index) in requests" :key="index">
                <td>{{request.request_by}}</td>
                <td>{{request.area}}</td>
                <td>{{request.category}}</td>
            </tr>
         </div>
    </table>
    </div>


    <div v-else>
        <b-button variant="outline-dark" align="center" @click="showModalTwo">Place request</b-button><br><br>
        <b-modal ref="modal-two" hide-footer title="Place request">
      <b-form-group>
        <b-form-input placeholder="Company Email"></b-form-input>
      </b-form-group>
       <b-form-group>
        <b-form-input placeholder="Firstname" ></b-form-input>
      </b-form-group>
      <p align="center">{{message}}</p>
      <b-button class="mt-3" variant="outline-dark" block>Add</b-button>
    </b-modal>
    </div>

    </div>
</template>
<script>
import { Slide } from 'vue-burger-menu'
import axios from 'axios'
export default {
    name: 'dashboard',
    components: {
        Slide
    },
    data(){
        return {
            company_name: sessionStorage.getItem('company_name'),
            creator: sessionStorage.getItem('company_email'),
            name: sessionStorage.getItem('firstname'),
            role: sessionStorage.getItem('role'),
            company_email: '',
            firstname: '',
            total_request: '',
            message: '',
            requests: [],
            pin: sessionStorage.getItem('pin')
        }
    },
    methods: {
        logout () {
            sessionStorage.clear();
            this.$router.push('/')
        },
        loadCompanyRequest() {
            axios.get('http://localhost:3000/api/getcompanyrequest', {
                params: {
                    company_name: this.company_name
                }
            }).then( resp => {
                this.total_request = resp.data.length
                this.requests = resp.data
            }).catch( err => {
                console.log(err)
            })
        },
        addColleagues(){
            var firstname = this.firstname
            var role = 'User'
            var company_name = this.company_name
            var company_email = this.company_email
            var creator = this.creator
            var company_pin = this.pin
            console.log(company_pin)

            if(firstname == '' || company_email == '') {
                this.message = 'Fill in data please'
            } {
                axios.post('http://localhost:3000/api/signup', {
                firstname: firstname,
                role: role,
                company_email: company_email,
                company_email: company_email,
                creator: creator,
                company_pin: company_pin
            }).then(res => {
                console.log(res.data)
                this.requests = res.data
            }).catch(err => {
                console.log(err);
            })
            }
        },
        showModalTwo(){
            this.$refs['modal-two'].show()
        },
        showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
    },
    mounted(){
        this.loadCompanyRequest()
    }
}
</script>
<style>
    @media (min-width: 600px) {
  .container-fluid { width: 90%; }
}
</style>