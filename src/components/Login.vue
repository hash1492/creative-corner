<template>
  <div class="login-component">
    <h1>Login</h1>
    <form class="form-login">
      <div class="form-group">
        <label>Email address</label>
        <input class="form-control" type="email" v-model="user.email" placeholder="Email">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input class="form-control" type="password" v-model="user.password" v-on:keyup.enter="login" placeholder="Password">
      </div>
      <button type="button" class="btn btn-info" v-on:click="login()">Login</button>
      <br><br>
      <div>
        <!-- <router-link to="/register">New user? Register</router-link> -->
      </div>
    </form>
  </div>
</template>
<script type="text/javascript">
  import * as firebase from '../firebase/config'
  var firebaseAuth = firebase.firebaseAuth

  export default {
    name: 'Login',
    data () {
      return {
        user: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      login: function () {
        if (!this.user.email || !this.user.password) {
          return 0
        }
        
        var self = this;
        firebaseAuth.signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(function (response) {
          console.log(response)
          self.$router.push({name: 'AdminHome'})
        })
        .catch(function (err) {
          console.log(err);
        });
      }
    }
  }
</script>
<style lang="scss">
.login-component {
  margin-top: 50px;
  .form-login {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }
}
</style>
