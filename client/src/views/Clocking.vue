<script>
import BaseInput from '@/components/Base/BaseInput.vue'

export default {
  name: 'Clocking',
  components: {
    BaseInput,
  },
  data() {
    return {
      employeeId: '',
      error: null,
      showElement: true,
      message: null,
    }
  },
  methods: {
    onClockInClick() {
      fetch('http://10.0.0.101:3000/api/v1/clocking/in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId: this.employeeId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'error') {
            this.error = data.message
          } else {
            this.error = null
            this.showElement = false
            this.message = data.message
            this.tempMessage()
          }
        })
    },
    onClockOutClick() {
      fetch('http://10.0.0.101:3000/api/v1/clocking/out', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId: this.employeeId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.showElement = false
          this.message = data.message
          this.tempMessage()
        })
    },
    tempMessage() {
      setTimeout(() => {
        this.showElement = true
        this.message = null
      }, 2000)
    },
  },
}
</script>

<template>
  <div class="container is-max-desktop section is-medium">
    <div v-if="showElement">
      <div class="has-text-centered mt-6 pt-6">
        <h1 class="is-size-1">שעון נוכחות</h1>
      </div>
      <div class="card m-4 p-5">
        <div class="mb-5">
          <BaseInput
            dir="rtl"
            v-model="employeeId"
            placeholder="ת.ז."
            inputClass="input"
            errorClass="has-text-left is-size-7 has-text-danger mt-2"
            :error="error"
          />
        </div>
        <div class="columns">
          <div class="column">
            <button
              @click="onClockInClick"
              class="button is-success is-fullwidth"
            >
              Clock-in
            </button>
          </div>
          <div class="column">
            <button
              @click="onClockOutClick"
              class="button is-danger is-fullwidth"
            >
              Clock-out
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="box has-background-success m-4 p-5 is-size-4 has-text-centered"
    >
      {{ message }}
    </div>
  </div>
</template>
