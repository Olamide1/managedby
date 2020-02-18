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
    <table class="table">
        <p align="center" v-if="requests.length == 0">No requests available</p>
        <div v-show="this.requests.length >= 1">
            <div v-for="(request, index) in requests" :key="index">
                <thead>
                <tr>
                 <th scope="col">Request By</th>
                 <th scope="col">Area</th>
                 <th scope="col">Category</th>
                 <th scope="col">Status</th>
                </tr>
            </thead>
            <tr  @click="$bvToast.show('example-toast')">
                <td>{{request.request_by}}</td>
                <td>{{request.area}}</td>
                <td>{{request.category}}</td>
                <td v-if="request.status == 'todo'" class="badge badge-danger">todo</td>
                <td v-else>Done</td>
            </tr>
            <b-toast id="example-toast" title="Mark as" static no-auto-hide>
                    <ul class="list-group">
                        <li class="list-group-item">Done</li>
                        <li class="list-group-item">Doing</li>
                    </ul>
            </b-toast>
            </div>
         </div>
    </table>
    </div>
<!-- End of Admin Section -->

<!-- User section -->

    <div v-else>
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
                        total request placed is {{total_request}}
                    </p>
                </div>
        </div>

    <table class="table">
        <p align="center" v-if="requests.length == 0">You have not placed any request yet</p>
        <div v-show="this.requests.length >= 1">
            <div v-for="(request, index) in requests" :key="index">
            <thead>
                <tr>
                 <th scope="col">Status</th>
                 <th scope="col">Area</th>
                 <th scope="col">Category</th>
                 <th>Action</th>
                </tr>
            </thead>
            <tr>
                <td>{{request.status}}</td>
                <td>{{request.area}}</td>
                <td>{{request.category}}</td>
                <td><button @click="$bvToast.show('example-toast')" class="btn btn-outline-dark">Action</button></td>
            </tr>

                <b-toast id="example-toast" title="Actions" static no-auto-hide>
                   <ul class="list-group">
                       <li class="list-group-item">Delete</li>
                   </ul>
                </b-toast>
            </div>
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
            request: '',
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
                    this.requests.push({'status': status, 'category': category, 'area': area})
                }).catch(err => {
                    console.log(err)
                })
            }
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
          axios.get('http://localhost:3000/api/myrequests', {
              params: {
                  company_email: this.my_email
              }
          }).then( response => {
              console.log(response.data)
              this.requests = response.data
              this.total_request = response.data.length
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
</style>