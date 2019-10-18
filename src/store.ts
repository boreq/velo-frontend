import Vue from 'vue';
import Vuex from 'vuex';
import { Album } from '@/dto/Album';
import { Track } from '@/dto/Track';

Vue.use(Vuex);

export enum Mutation {
    Replace = 'replace',
    Play = 'play',
    Pause = 'pause',
}

export class Entry {
    album: Album;
    track: Track;
}

export class State {
    entries: Entry[];
    playingIndex: number;
    paused: boolean;
}

export class ReplaceCommand {
    entries: Entry[];
    playingIndex: number;
}

export default new Vuex.Store<State>({
    state: {
        entries: [],
        playingIndex: null,
        paused: null,
    },
    mutations: {
        [Mutation.Replace](state: State, command: ReplaceCommand): void {
            state.entries = command.entries;
            state.playingIndex = command.playingIndex;
        },
        [Mutation.Play](state: State): void {
            state.paused = false;
        },
        [Mutation.Pause](state: State): void {
            state.paused = true;
        },
    },
    getters: {
        nowPlaying: (state: State) => {
            if (emptyArray(state.entries)) {
                return null;
            }
            return state.entries[state.playingIndex];
        },
    },
});

function emptyArray(arr: any[]): boolean {
    return !arr || arr.length === 0;
}
