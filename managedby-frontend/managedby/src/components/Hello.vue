<template>
  <div class="container-fluid">
    <b-navbar>
      <b-navbar-brand justified>
       {{msg}}
      </b-navbar-brand>
    </b-navbar>
    <div v-if="loginbutton == true">
      <b-card title="ManagedBy Login">
      <b-card-text>
     <b> Office Managers can:</b> <br>
      1. Add colleagues, <br>
      2. Collect, Organise and Manage requests <br>
     
    <b> Colleagues can: </b><br>
     1. Place requests. <br>
     2. Track execution.
    </b-card-text>
    </b-card> <br>
    
      <b-form-group>
        <b-form-input placeholder="Company Email" v-model="company_email" type="email"></b-form-input>
      </b-form-group>

       <b-form-group>
        <b-form-input placeholder="Company Pin" v-model="company_pin" type="password"></b-form-input>
      </b-form-group>
      <b-button block variant="outline-dark" @click="login" size="sm">Login</b-button>
      <p align="center">Don't have an account yet? <a @click="loginbutton = false">Signup</a></p>
    <h5 align="center" bgcolor="red">{{message}}</h5>
    </div>


    <div v-else>
      <b-card title="Office manager signup">
      <b-card-text>
   <p>Office/House Manager? Use ManagedBy to receive,manage & record help requests within your office or apartment building. Get started by: <br>
      1. Creating an account, <br>
      2. Adding colleagues and <br>
      3. Collect & Organize their requests on your dashboard.</p>
    </b-card-text>
    </b-card> <br>

  <b-form-group>
        <b-form-input placeholder="Firstname"  v-model="firstname"></b-form-input>
        <b-form-input placeholder="Lastname"  v-model="lastname"></b-form-input>
  </b-form-group>

    <b-form-group>
        <b-form-input placeholder="Company Email" v-model="company_email" type="email"></b-form-input>
        <b-form-input placeholder="Company Name" v-model="company_name"></b-form-input>
        <b-form-input placeholder="Company Industry eg: Fintech" v-model="industry"></b-form-input>
        <b-form-input placeholder="Company size using a range (1-100)" v-model="company_size"></b-form-input>
        <b-form-input placeholder="Office location" v-model="office"></b-form-input>
    </b-form-group>
 <b-form-group>
    <b-form-input placeholder="Company Pin ( 4 digit pin that would provide access to your colleagues)" v-model="company_pin" type="password"></b-form-input>
  </b-form-group>
      <b-button block variant="outline-dark" size="sm" @click="signup">{{signupbutton}}</b-button>
    <h5 align="center" bgcolor="red">{{message}}</h5>

 <p align="center">Already have an account? <a @click="loginbutton = true">Login</a></p>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'ManagedBy',
      firstname: '',
      lastname: '',
      company_email: '',
      industry: '',
      company_pin: '',
      office: '',
      signupbutton: 'Signup',
      message: '',
      company_name: '',
      company_size:'',
      loginbutton: true
    }
  },
  methods: {
    login(){
      var company_email = this.company_email
      var password = this.company_pin
      if (company_email == '' || password == '') {
        this.message = 'Please fill in your data'
      } else {
        axios.post('http://localhost:3000/api/login', {
        company_email: company_email,
        company_pin: password
      }).then( res => {
        if (res.data.length == 0) {
          this.message = 'Email or password in-correct'
        } else {
          console.log(res.data)
          sessionStorage.setItem('firstname',res.data[0].firstname)
          sessionStorage.setItem('company_email', res.data[0].company_email)
          sessionStorage.setItem('company_name', res.data[0].company_name)
          sessionStorage.setItem('role', res.data[0].role)
          sessionStorage.setItem('pin', res.data[0].company_pin)
          sessionStorage.setItem('created_by', res.data[0].creator)
          this.$router.push('/dashboard')
        }
      }).catch(err => {
        console.log(err);
      })
      }
    },
    signup(){
      var firstname = this.firstname
      var lastname = this.lastname
      var company_email = this.company_email
      var company_name = this.company_name
      var industry = this.industry
      var company_size = this.company_size
      var password = this.company_pin
      var role = 'Admin'
      this.signupbutton = 'Loading...'
      var office = this.office
      var creator = this.company_email

      axios.post('http://localhost:3000/api/signup', {
        firstname: firstname,
        lastname: lastname,
        company_name: company_name,
        company_email: company_email,
        company_size: company_size,
        industry: industry,
        role: role,
        office: office,
        creator: creator,
        company_pin: password
      }).then( resp => {
        if (resp.data.message == "User's email exist") {
          this.message = "User already exist"
          this.signupbutton = "Signup"
        } else {
          sessionStorage.setItem('firstname', firstname)
          sessionStorage.setItem('company_email', this.company_email)
          sessionStorage.setItem('company_name', this.company_name)
          sessionStorage.setItem('role', 'Admin')
          sessionStorage.setItem('pin', this.company_pin)
          sessionStorage.setItem('created_by', this.company_email)
          this.$router.push('/dashboard')
          axios.post('http://localhost:3000/api/sendsignupemail', {
            company_email : this.company_email,
            firstname: firstname
          }).then( respo => {
            console.log(respo)
          }).catch(error => {
            console.log(error)
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style>

@media (min-width: 600px) {
  .container-fluid { width: 50%; }
}


</style>
