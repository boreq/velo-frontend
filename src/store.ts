import Vue from 'vue';
import Vuex from 'vuex';
import { Album } from '@/dto/Album';
import { Track } from '@/dto/Track';

Vue.use(Vuex);

export enum Mutation {
    Replace = 'replace',
}

export class Entry {
    album: Album;
    track: Track;
}

export class State {
    entries: Entry[];
    playingIndex: number;
}

export class ReplaceCommand {
    entries: Entry[];
    playingIndex: number;
}

export default new Vuex.Store<State>({
    state: {
        entries: [],
        playingIndex: null,
    },
    mutations: {
        replace(state: State, command: ReplaceCommand): void {
            state.entries = command.entries;
            state.playingIndex = command.playingIndex;
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
