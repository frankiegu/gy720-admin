export const GLOBAL = {
  USER: {
    INIT: 'GLOBAL.USER.INIT',
    UPDATE_POINT: 'GLOBAL.USER.UPDATE_POINT',
  },
}

// 个人中心
export const CENTER = {
  INITIALIZE: 'center/initialize',
  SETPAGINATE: 'center/setpaginate',
  LIST_UPDATE: 'center/updatelist',
  LINK_UPDATE: 'center/updatelink',
  LOAD_LOCK: 'center/lockload',
}

export const MESSAGE = {
  SYSTEM: {
    INIT: 'MESSAGE.SYSTEM.INIT',
  },
  PRIVATE: {
    INIT: 'MESSAGE.PRIVATE.INIT',
  },
  SAY: {
    INIT: 'MESSAGE.SAY.INIT',
  },
  CHECK: 'MESSAGE.CHECK',
  CHECK_ALL: 'MESSAGE.CHECK_ALL',
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
