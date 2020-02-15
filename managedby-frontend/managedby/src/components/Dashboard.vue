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
              
                 {{company_name}} is ManagedBy <b>{{firstname}} | Dashboard</b>
               
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
      <div class="d-block text-center">
        <h3>Hello From My Modal!</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
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
        loadCompanyRequest() {
            console.log(this.role)
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