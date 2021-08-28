<template>
  <div></div>
</template>

<script>
export default {
  name: "HeadhunterPage",
  props: {
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  data() {
    return {

      flags: {
        running: false
      }
    }
  },
  created() {
    window.ipcRenderer.on('headhunter', () => {
      const form = {
        height: this.height,
        width: this.width
      }
      window.ipcRenderer.send('headhunter', form)
    })

  },
}
</script>

<style scoped>
.running {
  color: #F56C6C;
}
</style>