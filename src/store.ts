import Vue from 'vue';
import Vuex from 'vuex';
import { User } from '@/dto/User';

Vue.use(Vuex);

export enum Mutation {
    SetUser = 'setUser',
}

export class State {
    user: User;
}

export default new Vuex.Store<State>({
    state: {
        user: undefined,
    },
    mutations: {
        [Mutation.SetUser](state: State, user: User): void {
            state.user = user;
        },
    },
});

