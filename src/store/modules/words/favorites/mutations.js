export const ADD_FAVORITE = ( state, data ) => {

    state.data.favorites.push( data )

};

export const REMOVE_FAVORITE = ( state, uuid ) => {

    let index = state.data.favorites.findIndex(item => item.uuid == uuid)

    state.data.favorites.splice( index, 1 )

};

export const SET_FAVORITES = ( state ) => {

    if (localStorage.getItem( 'favorites' )) {

        state.data.favorites = JSON.parse(localStorage.getItem( 'favorites' ))

    }

};
export const ARRANGE_FAVORITES = ( state, payload ) => {

    state.data.favorites.splice( payload.index, 1 )

    state.data.favorites.splice( payload.overItemIndex, 0, payload.item );

};

export const SET_STORAGE = ( state ) => {

    localStorage.setItem( 'favorites', JSON.stringify(state.data.favorites) )

};

export const SET_SEARCH = ( state, data ) => {

    state.data.search = data

};

export const SET_CLASSES = ( state, data ) => {

    state.data.classes = data

};

export const SET_FILTER = ( state, data ) => {

    state.data.filter = data

};
