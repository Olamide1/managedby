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
            
            <a @click="logout"><span>Logout</span></a>

            </Slide> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              
                 <span v-if="role == 'Admin'">{{company_name}} is ManagedBy <b>{{name}} | Dashboard</b></span>
                <span v-else>Welcome, <b>{{name}}.</b></span>
            </b-card-body>
        </b-card>
        </div>
<br>
<!-- Admin section -->
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
<br>
    <table class="table scroll">
        <p align="center" v-if="requests.length == 0">No requests available</p>
        <div v-show="this.requests.length >= 1">
            <thead>
                <tr>
                 <th scope="col">Area</th>
                 <th scope="col">Category</th>
                 <th scope="col">Status</th>
                 <th scope="col">Details</th>
                </tr>
            </thead>
            <tbody v-for="(request, index) in requests" :key="index">
            <tr>
                <td>{{request.area}}</td>
                <td>{{request.category}}</td>
           <td>
               <span v-if="request.status == 'todo'" class="badge badge-danger">Todo</span>
                <span v-else-if="request.status == 'doing'" class="badge badge-primary">Done</span>
                <span v-else class="badge badge-info"> Done</span>
           </td>
           <td align="center">
               <b-dropdown id="dropdown" dropright variant="outline-dark">
               <b-dropdown-header>
                    <b>Request Details </b>
                By: {{request.request_by}} <br>
                 {{request.request}}
               </b-dropdown-header>
               <b-dropdown-item>
                  <button class="btn btn-outline-dark" @click="load">Done</button>
                  <button class="btn btn-outline-dark">Doing</button>
               </b-dropdown-item>
            </b-dropdown></td>
            </tr>
            </tbody>
         </div>
    </table>
    </div>
<!-- End of Admin Section -->

<!-- User section -->

    <div v-else class="container-fluid scroll">
        <b-button variant="outline-dark" align="center" @click="showModalTwo">Submit request</b-button><br><br>
        <b-modal ref="modal-two" hide-footer title="Place request">
      <b-form-group>
        <b-form-input placeholder="Category (repairs, replacement)" v-model="category"></b-form-input>
      </b-form-group>
       <b-form-group>
        <b-form-input placeholder="Area (could be dept, apartment number etc" v-model="area"></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-textarea placeholder="Request" v-model="request"></b-form-textarea>
      </b-form-group>
      <p align="center">{{message}}</p>
      <b-button class="mt-3" variant="outline-dark" block @click="createRequest">Submit</b-button>
    </b-modal>
    <div class="card" style="width: 60%;">
            <div class="card-body">
                <h5 class="card-title">Total requests by {{name}}</h5>
                    <p class="card-text">
                        total request placed is {{my_total_request}}
                    </p>
                </div>
        </div>

    <table class="table scroll">
        <p align="center" v-if="my_requests.length == 0">You have not placed any request yet</p>
        <div v-show="this.my_requests.length >= 1">
              <thead>
                <tr>
                 <th scope="col">Status</th>
                 <th scope="col">Area</th>
                 <th scope="col">Category</th>
                 <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody v-for="(my_request, index) in my_requests" :key="index">
            <tr>
                <td>
               <span v-if="my_request.status == 'todo'" class="badge badge-danger">Todo</span>
                <span v-else class="badge badge-info">Done</span>
                </td>
                <td>{{my_request.area}}</td>
                <td>{{my_request.category}}</td>
                 <td>
                    <b-dropdown id="dropdown-1" dropright  variant="outline-dark">
                        <b-dropdown-header>Request Details </b-dropdown-header> 
                        <b-dropdown-item>{{my_request.request}}</b-dropdown-item>
                         <b-dropdown-item><button class="btn btn-outline-dark" @click="deleteRequest(my_request._id, index)">Delete</button></b-dropdown-item>
                     </b-dropdown>
                </td>  
            </tr>
            </tbody>
            
         </div>
    </table>
    </div>
<!-- End of user section -->
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
            creator: sessionStorage.getItem('created_by'),
            my_email: sessionStorage.getItem('company_email'),
            name: sessionStorage.getItem('firstname'),
            role: sessionStorage.getItem('role'),
            company_email: '',
            firstname: '',
            category: '',
            area:'',
            indie: [],
            my_total_request: '',
            request: '',
            total_request: '',
            message: '',
            requests: [],
            my_requests: [],
            pin: sessionStorage.getItem('pin')
        }
    },
    methods: {
        logout () {
            sessionStorage.clear();
            this.$router.push('/')
        },
        load(){
            console.log('hello')
        },
        loadCompanyRequest() {
            axios.post('http://localhost:3000/api/getcompanyrequest', {
                    company_name: this.company_name
            }).then( resp => {
                this.total_request = resp.data.length
                this.requests = resp.data
            }).catch( err => {
                console.log(err)
            })
        },
        createRequest(){
            var request = this.request
            var category = this.category
            var area = this.area
            var request_by = this.my_email
            var status = 'todo'
            var company_name = this.company_name

            if (request == ''|| category == '' || area == '') {
                this.message = 'Plese fill the forms'
            } else {
                axios.post('http://localhost:3000/api/createrequest', {
                    request: request,
                    category: category,
                    area: area,
                    request_by: request_by,
                    status: status,
                    company_name: company_name
                }).then(response => {
                    console.log(response.data)
                    this.my_requests.push({'status': status, 'category': category, 'area': area, 'request': request})
                    this.hideModal()
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        deleteRequest(id, index){
            var identify = id
            var i = index
            axios.post('http://localhost:3000/api/deleterequest', {
                id: identify
            }).then( resp => {
                this.my_requests.splice(i, 1);
                this.total_request = this.requests.length
            }).catch(err => {
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
                company_name: company_name,
                company_email: company_email,
                creator: creator,
                company_pin: company_pin
            }).then(res => {
                console.log(res.data)

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
      findMyRequest(){
          axios.post('http://localhost:3000/api/myrequests', {
                  request_by: this.my_email
          }).then( response => {
              console.log(response.data)
              this.my_requests = response.data
              this.my_total_request = response.data.length
          }).catch(err => {
              console.log(err)
          })
      }
    },
    mounted(){
        this.loadCompanyRequest()
        this.findMyRequest()
    }
}
</script>
<style>
    @media (min-width: 600px) {
  .container-fluid { width: 90%; }
}
.break {
     overflow-wrap: break-word;
}
.scroll {
    overflow: hidden;
}
</style>