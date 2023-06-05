<script>
import BaseInput from '@/components/Base/BaseInput.vue'

export default {
  name: 'Login',
  components: {
    BaseInput,
  },
  data() {
    return {
      user: null,
      password: null,
      error: null,
    }
  },
  methods: {
    onLoginClick() {
      fetch('http://10.0.0.101:3000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          social_number: this.user,
          password: this.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'error') {
            this.error = data.message
          } else {
            this.error = null
            localStorage.setItem('token', data.token)
            this.$router.push({ path: '/dashboard' })
          }
        })
    },
  },
}
</script>

<template>
  <div class="container is-max-desktop section is-medium">
    <div class="has-text-centered">
      <h1 class="is-size-1">כניסה</h1>
    </div>
    <div class="card m-4 p-5">
      <div class="mb-5">
        <BaseInput
          dir="rtl"
          v-model="user"
          placeholder="שם משתמש"
          inputClass="input"
          errorClass="has-text-left is-size-7 has-text-danger mt-2"
        />
      </div>
      <div class="mb-5">
        <BaseInput
          dir="rtl"
          v-model="password"
          type="password"
          placeholder="סיסמא"
          inputClass="input"
          errorClass="has-text-left is-size-7 has-text-danger mt-2"
        />
      </div>
      <div
        v-if="error"
        class="has-text-centered is-size-6 has-text-danger mb-6"
      >
        {{ error }}
      </div>
      <div class="columns">
        <div class="column">
          <button @click="onLoginClick" class="button is-info is-fullwidth">
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
