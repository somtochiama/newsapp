<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" exact>Home</router-link>
      <router-link to="/timeline">Timeline</router-link>
      <router-link v-if="!loggedIn" to="/login">Login</router-link> 
      <button v-else @click="logout">Logout</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.state.isLoggedIn
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('email');
      localStorage.removeItem('loggedIn');
      this.$store.commit('setLoggedIn', false)
      this.$router.push({ name: 'login' })
    }
  },
  mounted() {
    this.$store.commit('setLoggedIn', localStorage.getItem('loggedIn'))
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  border: 10px solid #42b983;
  border-top: none;
  background: #EAF2EF;
  min-height: 99vh;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  // background: #912F56;
  background: #42b983;
  padding: 1rem;
  position: sticky;
  top: 0;
  a,
  button {
    color: #eaf2ef;
    padding: 1rem;
    text-decoration: none;
    cursor: pointer;
    font-size: 1rem;
    background: transparent;
    border: none;
  }
   a.router-link-active,
    a:hover,
    button:hover {
      color: #42b983;
      background: #EAF2EF;
    }
    button:focus {
      outline: 0;
    }
}
</style>
