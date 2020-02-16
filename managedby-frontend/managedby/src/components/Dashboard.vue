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
               
            </b-card-body>
        </b-card>
        </div>
<br>
    <div v-if="role == 'Admin'">
        <b-button variant="outline-dark" align="center" @click="showModal">Add Colleagues</b-button> <br><br>
        <div class="card" style="width: 60%;">
            <div class="card-body">
                <h5 class="card-title">Total requests for {{company_name}}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
        </div>

    <b-modal ref="my-modal" hide-footer title="Add colleagues">
      <b-form-group>
        <b-form-input placeholder="Company Email" v-model="company_email" type="email"></b-form-input>
      </b-form-group>
       <b-form-group>
        <b-form-input placeholder="Firstname" v-model="firstname"></b-form-input>
      </b-form-group>
      <b-button class="mt-3" variant="outline-dark" block>Add</b-button>
    </b-modal>
    </div>
    <div v-else>
        <h3>For Employees</h3>
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
            company_name: sessionStorage.getItem('company_name'),
            name: sessionStorage.getItem('firstname'),
            role: sessionStorage.getItem('role'),
            company_email: '',
            firstname: ''
        }
    },
    methods: {
        logout () {
            sessionStorage.clear();
            this.$router.push('/')
        },
        loadCompanyRequest() {
            console.log(this.role)
            console.log(sessionStorage.getItem('firstname'))
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