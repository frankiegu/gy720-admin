export const GLOBAL = {
  USER: {
    INIT: 'GLOBAL.USER.INIT',
    UPDATE_POINT: 'GLOBAL.USER.UPDATE_POINT',
  },
}

// 作品
export const WORK = {
  CATE: {
    INIT: 'WORK.CATE.INIT',
    ADD: 'WORK.CATE.ADD',
  },
  TAG: {
    INIT: 'WORK.TAG.INIT',
  },
}

// 个人中心
export const CENTER = {
  INITIALIZE: 'CENTER.INITIALIZE',
  SETPAGINATE: 'CENTER.SETPAGINATE',
  LIST_UPDATE: 'CENTER.UPDATELIST',
  LINK_UPDATE: 'CENTER.UPDATELINK',
  LOAD_LOCK: 'CENTER.LOCKLOAD',
}


export const MESSAGE = {
  COUNT: {
    INIT: 'MESSAGE.COUNT.INIT',
    UPDATE: 'MESSAGE.COUNT.UPDATE',
  },
  SYSTEM: {
    INIT: 'MESSAGE.SYSTEM.INIT',
    DELETE: 'MESSAGE.SYSTEM.DELETE',
  },
  PRIVATE: {
    INIT: 'MESSAGE.PRIVATE.INIT',
  },
  SAY: {
    INIT: 'MESSAGE.SAY.INIT',
  },
}

export const POINT = {
  TASK: {
    INIT: 'POINT.TASK.INIT',
  },
  LOG: {
    INIT: 'POINT.LOG.INIT',
  },
  EXCHANGE: {
    INIT: 'POINT.EXCHANGE.INIT',
  },
  RECORD: {
    INIT: 'POINT.RECORD.INIT',
  },
}

export const PURCHASE = {
  ORDERS: {
    INIT: 'PURCHASE.ORDERS.INIT',
  },
}


// 高级编辑模块 Edit
export const EDIT = {
  GET_PANOINFO: 'EDIT.GET_PANOINFO',

  // Functions组件控制
  MODAL: {
    OPEN: 'EDIT.MODAL.OPEN',
    CLOSE: 'EDIT.MODAL.CLOSE',
  },

  // Logo
  LOGO: {
    INITIALIZE: 'edit/logo/initialize',
  },

  // 作者
  AUTHOR: {
    INITIALIZE: 'edit/author/initialize',
  },

  // 素材模块
  MATERIAL: {
    INIT: {
      LOAD: 'EDIT.MATERIAL.LOAD',
      PANOS: 'EDIT.MATERIAL.INIT.PANOS',
      NORMALS: 'EDIT.MATERIAL.INIT.NORMALS',
    },
    SELECT: 'EDIT.MATERIAL.SELECT',
    RESET: 'EDIT.MATERIAL.RESET',
    TAB: {
      SELECT: 'EDIT.MATERIAL.TAG.SELECT',
    },
  },

  // 场景模块
  SCENE: {

  },
}
