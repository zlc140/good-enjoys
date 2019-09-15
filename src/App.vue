<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    mounted() {
    }
  }
</script>
<style lang="scss">
  html,body,div,span,
  applet,object,iframe,
  h1,h2,h3,h4,h5,h6,p,blockquote,pre,
  a,abbr,acronym,address,big,cite,code,
  del,dfn,em,font,img,ins,kbd,q,s,samp,
  small,strike,strong,sub,sup,tt,var,
  dd,dl,dt,li,ol,ul,
  fieldset,form,label,legend,
  table,caption,tbody,tfoot,thead,tr,th,td {
    margin: 0;
    padding: 0;
    border: 0;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  ol,ul {
    list-style: none;
  }
  q:before,q:after,
  blockquote:before,blockquote:after {
    content: "";
  }
  html,body, #app{
    width: 100%;
    height: 100%;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
