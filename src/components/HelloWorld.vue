<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-radio v-model="radio" label="1">选项</el-radio>
    <router-link to="/">
        <el-button>Home</el-button>
    </router-link>
    <router-link to="/use">
        <el-button type="warning">用户</el-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
