<template>
  <transition name="edit-function-fade">
    <v-camera
      v-if="active.initialview"
      confirmButtonText="设置画面"
      @confirm="onConfirmInitialView"
      @cancel="close">
    </v-camera>
  </transition>
</template>

<script>
/**
 * 高级编辑 - 设置初始画面
 *
 * @author huojinzhao | chenliangshan
 */

import { mapState, mapGetters } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import vCamera from './components/Camera'
import modal from '../../mixins/modal'
import esc from '../../mixins/esc'

export default {
  name: 'edit-functions-initialview',

  mixins: [modal, esc],

  components: {
    vCamera,
  },

  computed: {
    ...mapState({
      pano: state => state.edit.panoInfo,
    }),
    ...mapGetters(['activeScene']),
  },

  methods: {
    onConfirmInitialView() {
      // eslint-disable-next-line
      const krpano = window.__krpano
      const fov = krpano.get('view.fov')
      const vlookat = krpano.get('view.vlookat')
      const hlookat = krpano.get('view.hlookat')
      const id = this.activeScene.id
      const pano_id = this.pano.hash_pano_id
      this.$http.post('/user/scene/defaultangle',
        {
          fov,
          vlookat,
          hlookat,
          pano_id,
          id,
        })
        .then(() => {
          // 重新加载场景XML
          this.$store.dispatch(EDIT.PANO.UPDATESCENE)

          this.$message({
            type: 'success',
            message: '初始画面设置成功',
          })
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: '初始画面设置失败',
          })
        })
        .finally(() => {
          this.close()
        })
    },

    close() {
      this.closeModal('initialview')
      this.openModal('control')
    },
  },
}
</script>

<style>

</style>
