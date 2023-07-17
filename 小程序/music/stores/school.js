import {
  HYEventStore
} from 'hy-event-store'

const schoolStore = new HYEventStore({
  state: {
    name: 'yyb',
    count: 100,
    obj: {
      userData: {
        name: 'Vunbo'
      }
    }
  },
  actions: {
    getData(ctx) {
      ctx.obj = {
        userData: {
          name: 'BOBO'
        }
      }
      ctx.count = 999
    }
  }
})

export default schoolStore
