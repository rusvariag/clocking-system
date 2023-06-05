<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      data: null,
      limit: 10,
      page: 1,
      pages: 1,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString()
    },
    onPageClick(page) {
      this.page = page
      this.fetchData()
    },
    fetchData() {
      let headers = new Headers()
      let authToken = localStorage.getItem('token')

      if (authToken) {
        headers.append('Authorization', authToken)
      }
      headers.append('Content-Type', 'application/json')

      fetch(
        `http://10.0.0.101:3000/api/v1/clocking?_page=${this.page}&_limit=${this.limit}`,
        {
          method: 'GET',
          headers: headers,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          this.data = data.data
          this.pages = data.pages
        })
    },
  },
}
</script>

<template>
  <div>
    <div class="container is-max-desktop my-6">
      <nav class="pagination mx-5" role="navigation" aria-label="pagination">
        <ul class="pagination-list">
          <li v-for="index in pages" :key="index">
            <a
              @click="onPageClick(index)"
              class="pagination-link"
              :class="{ 'is-current': page == index }"
              >{{ index }}</a
            >
          </li>
        </ul>
      </nav>
    </div>

    <div class="container is-max-desktop my-6 is-hidden-touch">
      <table
        class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-hidden-touch"
      >
        <thead class="has-text-centered">
          <th>id</th>
          <th>user</th>
          <th>clock in</th>
          <th>clock out</th>
        </thead>
        <tbody>
          <tr v-for="entry in data" :key="entry.id">
            <td># {{ entry.id }}</td>
            <td>{{ entry.name }}</td>
            <td>{{ formatDate(entry.clock_in_time) }}</td>
            <td>{{ formatDate(entry.clock_out_time) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="m-5 is-hidden-desktop">
      <div v-for="entry in data" class="card mb-3">
        <div class="card-content">
          <div class="is-flex">
            <span># {{ entry.id }}</span>
            <span class="has-text-weight-bold mx-4">{{ entry.name }}</span>
          </div>
          <div dir="rtl">
            <span class="has-text-weight-bold ml-5">כניסה:</span>
            <span dir="ltr" class="is-size-7">{{
              formatDate(entry.clock_in_time)
            }}</span>
          </div>
          <div dir="rtl">
            <span class="has-text-weight-bold ml-5">יציאה:</span>
            <span dir="ltr" class="is-size-7">{{
              formatDate(entry.clock_out_time)
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
