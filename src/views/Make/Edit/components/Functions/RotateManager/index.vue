<template>
  <el-dialog
    title="管理3D物品"
    custom-class="rotate-manage"
    :visible.sync="active.object3d"
    v-append-to-body
    @before-close="close"
  >
    <!-- 侧边栏 -->
    <rotate-aside @create-rotate="createRotate"></rotate-aside>

    <!-- 主内容-->
    <rotate-content :updatecate.sync="updateItemCate" @update-rotate="updateRotate"></rotate-content>

    <!-- 创建物品3D弹窗 -->
    <el-dialog
      :title="`${dialogTitle}物品3D`"
      :visible.sync="dialog"
      @open="createOpen"
      size="tiny"
      v-append-to-body
    >
      <rotate-form
        :item="item"
        @done="editDone"
      ></rotate-form>
    </el-dialog>
  </el-dialog>
</template>

<script>
/**
 * 高级编辑 - 素材库管理3D物品
 * @author yangjun | luminghuai | chenliangshan
 * @version 2017-08-31
 */

import { mapState } from 'vuex'
import { emitter } from '@/mixins'
import modal from '../../../mixins/modal'
import RotateAside from './components/RotateAside'
import RotateContent from './components/RotateContent'
import RotateForm from './components/RotateForm'

export default {
  name: 'edit-rotate-manager',

  mixins: [emitter, modal],

  components: {
    RotateAside,
    RotateContent,
    RotateForm,
  },

  data() {
    return {
      dialog: false,
      item: {},
      updateItemCate: false,
      dialogTitle: '创建',
    }
  },

  computed: {
    ...mapState({
      activeCateId: state => state.edit.material.activeRotateCateId,
    }),
  },

  methods: {
    createRotate() {
      this.dialogTitle = '创建'
      this.dialog = true
      this.item = {}
    },

    updateRotate(item) {
      this.dialogTitle = '编辑'
      this.dialog = true
      this.item = item
    },

    close() {
      this.updateItemCate = false
      this.closeModal('object3d')
    },

    createOpen() {
      this.broadcast('rotate-form', 'on-set-form', this.item)
    },

    editDone(data, type) {
      this.dialog = false
      // 判断是否移动分类-编辑
      this.updateItemCate =
        this.activeCateId !== '' && this.activeCateId !== data.source_rotate_category_id

      if (type === 'create') {
        // 新增刷新列表
        this.broadcast('rotate-content', 'on-refresh-list')
      } else {
        // 编辑更新信息
        this.broadcast('rotate-content', 'on-update-list', data)
      }
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.rotate-manage {
  width: 1200px;
  margin-left: -600px;
  transform: none;

  &__aside {
    float: left;
    width: 140px;
    font-size: 14px;
    text-align: right;

    & > .el-button {
      margin-right: 10px;
    }

    &__catelist{
      margin-top: 20px;

      &__item {
        display: block;
        padding: 10px 12px 10px 16px;
        border-bottom: 1px dotted var(--border-color-split);
        line-height: 19px;
        cursor: pointer;
      }
    }
  }
}

/* 兼容小分辨率屏幕 */
@media screen and (max-height: 760px) {
  .rotate-manage {
    top: 5% !important;
    .rotate-content, .rotate-list {
      height: 480px;
    }
  }
  .rotate-view {
    width: 770px;
    top: 4% !important;
    .rotateView-box {
      width: 740px;
      height: 500px;
    }
  }
}
</style>
