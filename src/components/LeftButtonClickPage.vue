<template>
  <div></div>
</template>

<script>
export default {
  name: "LeftButtonClickPage",

  created() {
    window.ipcRenderer.on('click-left-button', () => {
      window.ipcRenderer.send('click-left-button')
    })
  }
}
</script>

<style scoped>

</style>