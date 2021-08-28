<template>
  <el-card header="快捷鍵一覽">
    <div><el-button type="danger" size="mini" @click="fix">修復版本差異造成的錯誤</el-button></div>
     <div style="margin: 15px 0;"></div>
    <div>快速查價： F2</div>
    <div>喝水快捷： F3</div>
    <div>自動收包： F6</div>
    <div>左鍵快捷： Shift+F7</div>
    <div>自動點裝： F8</div>
    <div>自動點獵首： F9</div>
    <div>
      解析度設定：
      <el-form inline>
        <el-form-item label="寬">
          <el-input-number
              v-model="form.width"
              :step="10"
          >

          </el-input-number>
        </el-form-item>
        <el-form-item label="高">
          <el-input-number
              v-model="form.height"
              :step="10"
          >

          </el-input-number>
        </el-form-item>
      </el-form>
    </div>

  </el-card>
</template>

<script>
export default {
  name: "ShortcutPage",
  props: {
    width: {
      type: Number,
    },
    height: {
      type: Number
    }
  },
  created() {
    if (localStorage.getItem('resolution') != null) {
      this.form = JSON.parse(localStorage.getItem('resolution'))
    }
  },
  data() {
    return {
      form: {
        width: 2560,
        height: 1440
      }
    }
  },
  watch: {
    form: {
      deep: true,
      handler: function () {
        this.$emit('updateResolution', this.form)
        localStorage.setItem('resolution', JSON.stringify(this.form))
      }
    }

  },
  methods:{
    fix(){
      localStorage.clear()
      location.reload()
    }
  }
}
</script>

<style scoped>

</style>