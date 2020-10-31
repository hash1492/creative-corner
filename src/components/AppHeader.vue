<template>
  <div>
    <header class="app-header">
      <ul class="header-links navigation-links">
        <li class="header-link">
          <a class="app-header-logo" href="/">
            <img
              src="./../assets/default.png"
              alt="Mansi Creative Corner"
              aria-label="Mansi Creative Corner"
            />
          </a>
        </li>
        <li class="header-link">
          <a href="javascript:void(0);" @click="toggleCategoriesMenu">Products</a>
          <div class="categories-menu" v-if="showMenu">
            <a
              v-for="category in categories"
              :key="category.code"
              :href="`/category/${category.code}`"
              @mouseover="activeCategory = category.code"
              @mouseleave="activeCategory = null"
            >
              <span>{{ category.name }}</span>
              <span v-if="category.subcategories" class="subcategories-arrow" @click.prevent="activeCategory = category.code">></span>
              <div class="subcategories-menu" v-if="activeCategory === category.code">
                <a
                  :href="`/category/${category.code}/${subcategory}`"
                  v-for="subcategory in category.subcategories"
                  :key="subcategory"
                >{{subcategory}}</a>
              </div>
            </a>
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
          <img src="./../assets/logout.png" @click="logout" alt="logout" />
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
import * as firebase from "../firebase/config";
var firebaseAuth = firebase.firebaseAuth;
const categoriesCollection = firebase.categoriesCollection;

export default {
  data() {
    return {
      isLoggedIn: false,
      showMenu: false,
      categories: [],
      activeCategory: null
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

    categoriesCollection.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const category = {
          ...doc.data(),
          firebaseId: doc.id
        };
        self.categories.push(category);
      });
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

    @include media("<=480px") {
      left: 0;
    }

    a {
      padding: 10px 35px;
    }

    .subcategories-arrow {
      float: right;
      padding: 0 10px;
    }
  }

  .subcategories-menu {
    position: absolute;
    left: 200px;
    transform: translateY(-15%);
    background-color: #080a52;
    display: flex;
    flex-direction: column;
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
  width: 180px;
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
