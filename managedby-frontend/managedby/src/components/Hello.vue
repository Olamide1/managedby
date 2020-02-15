<template>
  <div class="container-fluid">
    <b-navbar>
      <b-navbar-brand justified>
       {{msg}}
      </b-navbar-brand>
    </b-navbar>
    <div v-if="loginbutton == true">
      <b-card title="Login to your ManagedBy Account">
      <b-card-text>
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </b-card-text>
    </b-card> <br>
    
      <b-form-group>
        <b-form-input placeholder="Company Email" v-model="company_email" type="email"></b-form-input>
      </b-form-group>

       <b-form-group>
        <b-form-input placeholder="Password" v-model="password" type="password"></b-form-input>
      </b-form-group>
      <b-button block variant="outline-dark" @click="login" size="sm">Login</b-button>
      <p align="center">Don't have an account yet? <a @click="loginbutton = false">Signup</a></p>
    <h5 align="center" bgcolor="red">{{message}}</h5>
    </div>
    <div v-else>
      <b-card title="Signup in minutes">
      <b-card-text>
      Some quick example text to build on the card title and make up the bulk of the card's content.
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
        <b-form-input placeholder="Company size using ranges (1-100)" v-model="company_size"></b-form-input>
    </b-form-group>
 <b-form-group>
    <b-form-input placeholder="Password" v-model="password" type="password"></b-form-input>
  </b-form-group>
      <b-button block variant="outline-dark" size="sm" @click="signup">Signup</b-button>
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
      password: '',
      message: '',
      company_name: '',
      company_size:'',
      loginbutton: true
    }
  },
  methods: {
    login(){
      var company_email = this.company_email
      var password = this.password
      if (company_email == '' || password == '') {
        this.message = 'Please fill in your data'
      } else {
        axios.post('http://localhost:3000/api/login', {
        company_email: company_email,
        password: password
      }).then( res => {
        if (res.data.length == 0) {
          this.message = 'Email or password in-correct'
        } else {
          console.log(res.data)
          sessionStorage.setItem('firstname', res.data[0].firstname)
          sessionStorage.setItem('company_email', res.data[0].company_email)
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
      var password = this.password
      var role = 'Admin'
      var creator = this.company_email

      axios.post('http://localhost:3000/api/signup', {
        firstname: firstname,
        lastname: lastname,
        company_name: company_name,
        company_email: company_email,
        company_size: company_size,
        industry: industry,
        role: role,
        creator: creator,
        password: password
      }).then( resp => {
        console.log(resp.data)
        if (resp.data.message == "User's email exist") {
          this.message = "User already exist"
        } else {
          this.message = 'Account created'
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style>

</style>
