<script>
export default {
  name: 'Navbar',
  components: {},
  data() {
    return {
      isActiveBruger: false,
      loginStatus: false,
    }
  },
  watch: {
    $route: function (to, from) {
      this.isActiveBruger = false
      this.loginStatus = localStorage.getItem('token') ? true : false
    },
  },
  methods: {
    onBurgerToggle() {
      this.isActiveBruger = !this.isActiveBruger
      this.loginStatus = localStorage.getItem('token') ? true : false
    },
    onLoginClick() {
      this.$router.push({ path: '/login' })
    },
    onLogoutClick() {
      fetch('http://10.0.0.101:3000/api/v1/auth/logout', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.removeItem('token')
          this.$router.push({ path: '/' })
        })
    },
  },
}
</script>

<template>
  <nav class="navbar has-shadow">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <img src="/vue.svg" width="28" height="28" alt="Vite logo" />
      </a>

      <a
        class="navbar-burger"
        :class="{ 'is-active': isActiveBruger }"
        @click="onBurgerToggle"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      class="navbar-menu burger-menu"
      :class="{ 'is-active': isActiveBruger }"
    >
      <div dir="rtl" class="navbar-end">
        <router-link to="/" class="navbar-item"> שעון נובחות </router-link>

        <router-link v-if="loginStatus" to="/dashboard" class="navbar-item">
          דוחות
        </router-link>
      </div>
      <div class="separator my-3 is-hidden-desktop"></div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <button
              v-if="!loginStatus"
              class="button is-info is-fullwidth"
              @click="onLoginClick"
            >
              Log in
            </button>
            <button
              v-else
              class="button is-info is-fullwidth"
              @click="onLogoutClick"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@media only screen and (min-device-width: 100px) and (max-width: 1023px) {
  .burger-menu {
    width: 100%;
    position: absolute;
    background-color: #eee;
  }
  .separator {
    border: solid 1px #777;
  }
}
</style>
