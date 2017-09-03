<template>
  <div class="rotate-content" v-loading="loading">
    <ul class="rotate-list list clearfix">
      <rotate-item
        v-for="item in list.data"
        :key="item.id"
        :item="item"
        @open-upload="openUpload"
        @open-manage="openImages"
        @update="update"
        @remove="removeObject"
      ></rotate-item>

      <div v-if="isEmpty" class="empty">
        <div>该分类下还未上传任何素材</div>
      </div>
    </ul>

    <el-pagination
      v-if="list.last_page > 1"
      :page-size="list.per_page"
      :total="list.total"
      :current-page="list.current_page"
      @current-change="pageChange"
      layout="prev, pager, next"
    ></el-pagination>

    <el-dialog
      title="上传物品3D图片"
      :visible.sync="dialog.upload"
      :modal="false"
      custom-class="rotate-upload-dialog"
    >
      <rotate-upload v-if="dialog.upload" :id="activeItemId" @close="dialog.upload = false"></rotate-upload>
    </el-dialog>

    <el-dialog
      title="管理图片"
      :visible.sync="dialog.images"
      :modal="false"
      custom-class="rotate-image-dialog"
    >
      <rotate-images v-if="dialog.images" :id="activeItemId"></rotate-images>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 管理3D物品 - 列表
 * @author yangjun | luminghuai
 * @version 2017-08-31
 */

import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'
import RotateItem from './RotateItem'
import RotateForm from './RotateForm'
import RotateUpload from './RotateUpload'
import RotateImages from './RotateImages'

export default {
  name: 'rotate-content',

  components: {
    RotateItem,
    RotateForm,
    RotateUpload,
    RotateImages,
  },

  data() {
    return {
      dialog: {
        upload: false,
        images: false,
      },
      loading: false,
      activeItemId: null,
    }
  },

  computed: {
    ...mapState({
      cates: state => state.edit.material.rotateCates,
      activeCateId: state => state.edit.material.activeRotateCateId,
      list: state => state.edit.material.materialData.rotate,
    }),

    isEmpty() {
      return !this.loading && (!this.list.data || !this.list.data.length)
    },
  },

  watch: {
    /**
     * 分类更改时，应根据分类重新获取列表
     */
    activeCateId(val) {
      this.getList(1, val)
    },
  },

  methods: {
    /**
     * 获取物品3D列表
     * @param {number} page - 页数
     * @param {number} cateId - 分类id
     */
    getList(page = 1, cateId = 1) {
      this.loading = true
      this.$store.dispatch(EDIT.MATERIAL.INIT, {
        url: '/user/sourcerotate',
        params: `?source_rotate_category_id=${cateId}&page=${page}`,
      })
        .then(() => {
          this.loading = false
        })
    },

    pageChange(page) {
      this.getList(page)
    },

    /**
     * 询问是否删除
     */
    removeObject(id) {
      this.$confirm('确定要删除该项目么？删除后不可以恢复。', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => this.remove(id))
    },

    /**
     * 删除某项物品3D
     * @param {number} id - 删除项的id
     */
    remove(id) {
      this.$store.dispatch(EDIT.ROTATE.REMOVE, id)
        .then(() => {
          this.$message.success('操作成功')
        })
        .catch(({ status: { reason } }) => {
          this.$message.error(reason)
        })
    },

    /**
     * 打开修改窗口，填充修改项的数据
     */
    update(id) {
      const data = this.list.data.find(item => item.id === id)
      this.$emit('update-rotate', data)
    },

    /** 打开上传图片窗口 */
    openUpload(id) {
      this.activeItemId = id
      this.dialog.upload = true
    },

    /** 打开图片管理窗口 */
    openImages(id) {
      this.activeItemId = id
      this.dialog.images = true
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";

:root {
  --item-count: 4;
  --item-gut: 10px;
  --total-item-gut: calc((var(--item-count) - 1) * var(--item-gut));

  --btn-width: 65px;
  --cover-width: calc(100% - var(--btn-width));
}

.rotate-content {
  height: 620px;
  overflow: hidden;
}
.rotate-list {
  height: 540px;
  padding: 0 10px;
  border-left: 1px solid var(--gray-extra-light);
}

.rotate-item {
  float: left;
  width: calc((100% - var(--total-item-gut)) / var(--item-count));
  padding: 5px;
  border: 1px solid var(--gray-extra-light);
  margin-bottom: var(--item-gut);

  &:not(:nth-child(4n + 1)) {
    margin-left: var(--item-gut);
  }

  &__img {
    float: left;
    width: var(--cover-width);
  }

  &__btns {
    float: right;
    width: var(--btn-width);
    padding-left: 5px;

    & > li {
      & + li {
        margin-top: 5px;
      }
    }

    .el-button {
      width: 100%;
    }
  }

  &__name {
    text-align: center;
    line-height: 2;
  }
}
</style>