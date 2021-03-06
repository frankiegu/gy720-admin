<template>
  <div>
    <el-dialog
    :title="dialogTitle"
    :visible="active.hotspots"
    :before-close="() => closeModal('hotspots')"
    @close="closeModalAfter"
    class="edit-functions__hotspots-modal"
    >

      <component
        :is="currentView"
        @switch-step="switchStep"
        :type="type"
        :fir-info="firInfo"
        :sec-info="secInfo"
        :edit-info="editInfo"
        :type-config="typeConfig"
        @open-modal="openModalInner"
      >
      </component>

    </el-dialog>

    <!-- 热点图标弹窗 -->
    <el-dialog
      title="热点图标库"
      :visible.sync="modal.icon"
      size="large"
      v-append-to-body
    >
      <icon-hotspots v-model="modal.icon"></icon-hotspots>
    </el-dialog>

  </div>
</template>

<script>
/**
 * 高级编辑 - hotspots
 * @author yj
 * @version 2017-09-01
 */
import { mapState, mapGetters } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import hotspot from './mixins/hotspot'
import modal from '../../../mixins/modal'
import AddSpotFir from './components/AddSpotFir'
import AddSpotSec from './components/AddSpotSec'
import IconHotspots from './components/IconHotspots'

const TYPECONFIG = {
  SCENE: 1, // 场景漫游
  ARTICLE: 6, // 图文信息
  LINK: 3, // 超链接
  ROTATE: 5, // 物品3D
  AUDIO: 8, // 音频
  VIDEO: 9, // 视频
  PHOTO: 10, // 相册
  OTHER: 7, // 无
}

export default {
  name: 'edit-functions-hotspots',

  mixins: [modal, hotspot],

  components: {
    AddSpotFir,
    AddSpotSec,
    IconHotspots,
  },

  data() {
    return {
      currentView: AddSpotFir,
      type: TYPECONFIG.SCENE,
      typeConfig: TYPECONFIG,
      cateType: [
        { icon: 'icon-yanjing', key: TYPECONFIG.SCENE, text: '场景漫游', label: '链接场景' },
        { icon: 'icon-wendang', key: TYPECONFIG.ARTICLE, text: '图文信息', label: '图文信息' },
        { icon: 'icon-liulanqidakailianjie', key: TYPECONFIG.LINK, text: '超链接', label: '超链接' },
        { icon: 'icon-3d1', key: TYPECONFIG.ROTATE, text: '物品3D', label: '物品3D' },
        { icon: 'icon-xitongxiaoxi', key: TYPECONFIG.AUDIO, text: '音频', label: '音频' },
        { icon: 'icon-shexiang', key: TYPECONFIG.VIDEO, text: '视频', label: '视频' },
        { icon: 'icon-xiangce', key: TYPECONFIG.PHOTO, text: '相册', label: '相册' },
        { icon: 'icon-danxuankuang', key: TYPECONFIG.OTHER, text: '无', label: '' },
      ],
      modal: {
        icon: false,
      },
      title: '添加',
      editInfo: {},
    }
  },

  computed: {
    ...mapState({
      panoId: state => state.edit.panoInfo.hash_pano_id,
      spotsList: state => state.edit.hotspots.spotsList,
    }),

    ...mapGetters(['activeScene']),

    firInfo() {
      return this.cateType.map(({ icon, key, text }) => ({ icon, key, text }))
    },

    secInfo() {
      return this.cateType.find(item => (item.key === this.type)).label
    },

    dialogTitle() {
      const title = `${this.title}热点`
      if (this.currentView.name === AddSpotSec.name) {
        return `${title} (${this.secInfo || '其它'})`
      }
      return `${title}`
    },
  },

  methods: {
    switchStep(step, type) {
      if (step !== 1) {
        this.type = type
        this.currentView = AddSpotSec
      } else {
        this.currentView = AddSpotFir
      }
    },

    closeModalAfter() {
      // 点击上一步，关闭都要重置
      this.currentView = AddSpotFir
      // 重置选中的热点图标
      this.$store.commit(EDIT.HOTSPOTS.RESET.ICON)
      this.editInfo = {}
      this.title = '添加'
    },

    openModalInner(type) {
      this.modal[type] = true
    },
  },
}
</script>

<style lang="postcss">
.edit-functions__hotspots-modal {
  & .el-dialog{
    width: 700px;
  }
}
</style>
