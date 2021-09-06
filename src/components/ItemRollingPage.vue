<template>
  <el-card>
    <template v-slot:header>
      <el-row>
        <el-col :span="24">
          <div>自動點裝 F8</div>
        </el-col>
      </el-row>
    </template>
    <div>使用的時候，先把滑鼠放到通貨倉庫頁的裝備上，之後直接按下F8就會開始點裝備。</div>
    <el-form>
      <el-form-item label="使用寶石">
        <el-radio-group v-model="form.orb">
          <el-radio label="alt">改造</el-radio>
          <el-radio label="chaos">混沌</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="停止方式">
        <el-radio-group v-model="form.method">
          <el-radio label="and">和</el-radio>
          <el-radio label="or">或</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="詞綴關鍵字(請用逗號分隔)">
        <el-input v-model="form.keywords"></el-input>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "ItemRollingPage",
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
      form: {
        orb: 'alt',
        keywords: '',
        method: 'and',
      },
    }
  },
  created() {
    if (localStorage.getItem('item-rolling') != null) {
      this.form = JSON.parse(localStorage.getItem('item-rolling'))
    }
    window.ipcRenderer.on('item-rolling', () => {
      const form = {
        height: this.height,
        width: this.width,
        ...this.form
      }
      window.ipcRenderer.send('item-rolling', form)
    })
  },
  watch: {
    form: {
      deep: true,
      handler: function (val) {
        localStorage.setItem('item-rolling', JSON.stringify(val))
      }
    }
  },
}
</script>

<style scoped>

</style>