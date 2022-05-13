import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
    },
    state: {
      user: null,
      socket: null,
      messages: [],
    },
    getters: {
      isLoggedIn(state) {
        return state.user !== null
      }
    },
    mutations: {
      SET_USER (state, user) {
        state.user = user
      },
      SET_SOCKET (state, socket) {
        state.socket = socket
      },
      SET_TOKEN(state, token) {
        state.token = token
        if (token)
          localStorage.setItem('token', token)
        else
          localStorage.removeItem('token')
      },
      SET_MESSAGES(state, messages) {
        state.messages = messages
      },
    },
    actions: {
      connectSocket({ commit, state, dispatch }) {
        // try {
        //   const socket = io("http://192.168.1.109:8900",{reconnection:true})
        //   socket.on('connect', () => {
        //     console.log('connected')
        //     socket.emit('joinConnectedUsers', { userId: state.user._id })
        //     console.log("joined socket");
        //   })
        // }catch (e) {
        //   console.log(e)
        // }


        // commit('SET_SOCKET', socket)
      },
      closeSocket({ commit, state }) {
        if (state.socket) {
          state.socket.emit('disconnected', { userId: state.userId })
          console.log("closing socket");
          state.socket.close()
          commit('SET_SOCKET', null)
        }
      },
    },


    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
