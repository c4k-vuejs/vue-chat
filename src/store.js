//  * Vuex * http://vuex.vuejs.org/zh-cn/intro.html
import Vue from 'vue'; import Vuex from 'vuex'; Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: { name: 'user1', img: 'dist/images/1.jpg' },
        sessions: [
            {
                id: 1,
                user: { name: 'user2', img: 'dist/images/2.png' },
                messages: [
                    { content: 'Hello..', date: new Date() },
                    { content: '가슴뛰는 시간 되시길!', date: new Date() }
                ]
            },
            {
                id: 2,
                user: { name: 'user3', img: 'dist/images/3.jpg' },
                messages: []
            }
        ],
        currentSessionId: 1,
        filterKey: ''
    },

    mutations: {
        INIT_DATA (state) {
            let data = localStorage.getItem('vue-chat-session');
            if (data) { state.sessions = JSON.parse(data); }
        },
        SEND_MESSAGE ({ sessions, currentSessionId }, content) {
            let session = sessions.find(item => item.id === currentSessionId);
            session.messages.push({ content: content, date: new Date(), self: true });
        },
        SELECT_SESSION (state, id) { state.currentSessionId = id; } ,
        SET_FILTER_KEY (state, value) { state.filterKey = value; }
    }
});

store.watch(
    (state) => state.sessions,
    (val) => {
        localStorage.setItem('vue-chat-session', JSON.stringify(val)); console.log('CHANGE: ', val);
    },
    { deep: true }
);

export default store;
export const actions = {
    initData: ({ dispatch }) => dispatch('INIT_DATA'),
    sendMessage: ({ dispatch }, content) => dispatch('SEND_MESSAGE', content),
    selectSession: ({ dispatch }, id) => dispatch('SELECT_SESSION', id),
    search: ({ dispatch }, value) => dispatch('SET_FILTER_KEY', value)
};
