<template>
  <div class="container-fluid">
    <b-navbar>
      <b-navbar-brand justified>
       {{msg}}
      </b-navbar-brand>
    </b-navbar>
    <div v-if="loginbutton == true">
      <div class="card mb-3">
  <img src="../assets/login.svg" height="150px" class="card-img-top" alt="Login">
  <div class="card-body">
    <h5 class="card-title">Managedby Login</h5>
    <p class="card-text">Access your account to place or receive helpdesk requests within your space.</p>
  </div>
</div>
  <br>
    
      <b-form-group>
        <b-form-input placeholder="Company Email" v-model="company_email" type="email"></b-form-input>
      </b-form-group>

       <b-form-group>
        <b-form-input placeholder="Company Pin" v-model="company_pin" type="password"></b-form-input>
      </b-form-group>
      <b-button block variant="outline-dark" @click="login" size="sm">{{loginbtn}}</b-button> <br>
      <p align="center">Don't have an account yet? <a @click="loginbutton = false">Signup</a></p>
    <h5 align="center" bgcolor="red">{{message}}</h5>
    </div>


    <div v-else>
    <div class="card mb-3">
  <img src="../assets/intro-image.svg" height="150px" class="card-img-top" alt="image">
  <div class="card-body">
    <h5 class="card-title">Space Manager Signup</h5>
    <p class="card-text">Use ManagedBy to receive, manage & record inhouse helpdesk requests 
     within your office, apartment & buildings. Just: <br>
      1. Create an account, <br>
      2. Add people & <br>
      3. Easily Manage these helpdesk requests.</p>
  </div>
</div>
       <br>

  <form netlify>
    <b-form-group>
        <b-form-input placeholder="Firstname"  v-model="firstname"></b-form-input>
        <b-form-input placeholder="Lastname"  v-model="lastname"></b-form-input>
  </b-form-group>

    <b-form-group>
        <b-form-input placeholder="Company Email" v-model="company_email" type="email"></b-form-input>
        <b-form-input placeholder="Company Name" v-model="company_name"></b-form-input>
        <b-form-input placeholder="Company Industry eg: Fintech" v-model="industry"></b-form-input>
        <b-form-input placeholder="Company size (An approximation will do)" v-model="company_size"></b-form-input>
        <b-form-input placeholder="Office Location (Nairobi, Accra, HeadOffice)" v-model="office"></b-form-input>
    </b-form-group>
 <b-form-group>
    <b-form-input placeholder="Company Pin (4 digit pin that would provide access to your colleagues)" v-model="company_pin" type="password"></b-form-input>
  </b-form-group>
      <b-button block variant="outline-dark" size="sm" @click="signup">{{signupbutton}}</b-button> <br>
    <h6 align="center" color="red">{{message}}</h6>
  </form>
    <br>

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
      loginbtn: 'Login',
      loginbutton: true
    }
  },
  methods: {
    login(){
      var company_email = this.company_email
      var password = this.company_pin
      const options = {
        headers: {'Content-Type': 'application/json'}
      }
      if (company_email == '' || password == '') {
        this.message = 'Please fill in your data'
      } else {
        this.loginbtn = 'Loading...'
        axios.post('http://managedby.herokuapp.com:80/api/login/', {
        company_email: company_email,
        company_pin: password
      },{ crossdomain: true }, options).then( res => {
        if (res.data.length == 0) {
          this.message = 'Email or password in-correct'
          this.loginbtn = 'Login'
        } else {
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
      var office = this.office
      var creator = this.company_email
       const options = {
        headers: {'Content-Type': 'application/json'}
      }
      if(firstname == '' || lastname == '' || company_email == '' || company_name == '' || company_size== '' || password == '') {
        this.message = 'Please fill details'
      } else {
         this.signupbutton = 'Loading...'
        axios.post('http://managedby.herokuapp.com:80/api/signup/', {
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
      },{ crossdomain: true }, options).then( resp => {
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
          Email.send({
            Host : "smtp.gmail.com",
            Username : "olamideakomolafe1234@gmail.com",
            Password : "Holyjesus2016",
            port: 465,
            EnableSsl: true, 
            To : this.company_email,
            From : "Ola from ManagedBy <olamideakomolafe1234@gmail.com>",
            Subject : "Welcome to ManagedBy " + this.firstname,
            Body : "<center> <img src='https://res.cloudinary.com/theakomolafe/image/upload/v1582911255/Header_ksb5kg.png' /> </center> <br> <p> Welcome " +'<b>' + firstname+ '</b>' 
            + ", Thank you for being a part of our journey & joining our Beta. <br>"
            + " <b>Managedby</b> allows space managers to add people," 
            + " recieve internal helpdesk requests, "
            + " manage tasks, have records for compliance while keeping everyone in the loop on progress.</p><br>" 
            + "<h3> Say goodbye to taps on the shoulder and awkward office visits.</h3>"
            + "<p>Of course, this beta is free for a month as we are mostly getting feedback to improve" 
            + " the product for the companies we'll be working with. Please feel free to reach out at any time.</p><br> Cheers."
          }).then(
            message => console.log(message)
          )
        }
      }).catch(err => {
        console.log(err)
      })
      }
    }
  }
}
</script>
<style>

@media (min-width: 600px) {
  .container-fluid { width: 50%; }
}


</style>
