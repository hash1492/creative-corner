<template>
    <div>
        <header class="app-header">
            <ul class="header-links navigation-links">
                <li class="header-link">
                    <a class="app-header-logo" href="/">
                        <img src="./../assets/logo.png" alt="Mansi's Creative Corner" aria-label="Mansi's Creative Corner">
                    </a>
                </li>
                <li class="header-link">
                    <a href="javascript:void(0);" @click="toggleCategoriesMenu">Products</a>
                    <div class="categories-menu" v-if="showMenu">
                      <a href="/category/necklaces">Necklaces</a>
                      <a href="/category/bangles">Bangles</a>
                      <a href="/category/earrings">Earrings</a>
                      <a href="/category/candle-holders">Candle Holders</a>
                      <a href="/category/latkans">Latkans</a>
                      <a href="/category/quilled-envelopes">Quilled Envelopes</a>
                    </div>
                </li>
                <li class="header-link">
                    <a href="/contact-us">Contact</a>
                </li>

                <li class="header-link">
                    <a href="/about">About</a>
                </li>
            </ul>
            <ul class="header-links navigation-links-end">
                <li class="header-link logout-action" v-if="isLoggedIn">
                    <button type="button" class="btn btn-info" @click="logout">Logout</button>
                    <img src="./../assets/logout.png" @click="logout" alt="logout">
                </li>
            </ul>
        </header>
    </div>
</template>

<script>
import * as firebase from "../firebase/config";
var firebaseAuth = firebase.firebaseAuth;

export default {
  data() {
    return {
      isLoggedIn: false,
      showMenu: false
    };
  },
  created() {
    var self = this;
    firebaseAuth.onAuthStateChanged(function(user) {
      if (user) {
        self.isLoggedIn = true;
        self.currentUser = firebaseAuth.currentUser;
      } else {
        self.isLoggedIn = false;
      }
    });
  },
  methods: {
    toggleCategoriesMenu() {
      this.showMenu = !this.showMenu;
    },
    logout() {
      var self = this;
      this.activeTab = "Home";
      firebaseAuth
        .signOut()
        .then(function(response) {
          console.log(response);
          // Sign-out successful.
          self.$router.push({ name: "Login" });
        })
        .catch(function(err) {
          console.log(err);
          // An error happened.
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "node_modules/include-media/dist/include-media";
$header-height: 80px;

.app-header {
  align-items: center;
  background-color: #080a52;
  height: $header-height;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  font-family: "Merienda", cursive;
  overflow-x: scroll;


  .categories-menu {
    position: absolute;
    top: $header-height;
    background: #080a52;
    color: white;
    text-align: left;
    z-index: 100;
    display: flex;
    flex-direction: column;


    a {
      padding: 10px 35px;
    }
  }
}

.navigation-links {
  display: flex;
  flex-direction: row;
  margin-bottom: 0;
}

.navigation-links-end {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0;
}

.app-header-logo {
  cursor: pointer;
  justify-self: center;
}

.app-header-logo img {
  width: 120px;
  justify-self: center;
}

.header-links {
  display: flex;
  align-items: center;
  @include media("<=480px") {
    padding-left: 0;
  }
}

.header-link {
  list-style-type: none;
  padding: 0 10px;
}

.header-link a {
  color: white;
  text-decoration: none;
  font-weight: 700;
}

.header-link a:hover {
  color: #eb2188;
}

.search-input {
  border-radius: 3px;
  border: 0;
  padding: 5px 10px;
  color: #6f7c8a;
}

.logout-action {
  button {
    display: initial;
  }

  img {
    display: none;
  }
  @include media("<=480px") {
    button {
      display: none;
    }

    img {
      display: initial;
    }
  }
}
</style>
