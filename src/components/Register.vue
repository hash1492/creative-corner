<template>
  <div class="register-component">
    <h1>Register</h1>
    <form class="form-register">
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control" v-model="user.email" placeholder="Email">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" v-model="user.password" placeholder="Password">
      </div>
      <div class="form-group">
        <label>Confirm Password</label>
        <input type="password" class="form-control" v-model="user.confirm_password" placeholder="Confirm Password">
      </div>
      <button type="button" class="btn btn-info" v-on:keyup.enter="register" v-on:click="register()">Register</button>
      <br><br>
      <div>
        <router-link to="/login">Existing user? Login</router-link>
      </div>
    </form>
  </div>
</template>
<script type="text/javascript">
  import * as firebase from '../firebase/config'
  var firebaseAuth = firebase.firebaseAuth

  export default {
    name: 'Register',
    data () {
      return {
        user: {
          email: '',
          password: '',
          confirm_password: ''
        }
      }
    },
    methods: {
      register: function () {
        var self = this;
        if (!this.user.email || !this.user.password) {
          return 0
        }
        if (this.user.password !== this.user.confirm_password) {
          return 0
        }

        firebaseAuth.createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then(function (response) {
          console.log(response)
          self.$router.push({name: 'Login'})
        })
        .catch(function (err) {
          console.log(err);
          
        });
      }
    }
  }
</script>
<style lang="scss">
.register-component {
  margin-top: 50px;

  .form-register {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }
}
</style>
