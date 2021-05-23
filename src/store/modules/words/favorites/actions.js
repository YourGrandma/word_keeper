export const addFavoriteItem = ( { dispatch, commit, state }, word ) => {

    commit( 'ADD_FAVORITE', word );

    commit( 'SET_STORAGE' );

    dispatch( 'saveFavorites' )

};

export const removeFavoriteItem = ( { dispatch, commit, state }, id ) => {

    commit( 'REMOVE_FAVORITE', id );

    commit( 'SET_STORAGE' );

};

export const fetchFavorites = ( { dispatch, commit, state } ) => {

    commit( 'SET_FAVORITES' );

};

export const arrangeFavorites = ( { dispatch, commit, state }, payload ) => {

    commit( 'ARRANGE_FAVORITES', payload )

    commit( 'SET_STORAGE' );

    // dispatch( 'saveFavorites' )

};

export const saveFavorites = ( { dispatch, commit, state } ) => {

    commit( 'SET_STORAGE' )

};

export const saveSearch = ( { dispatch, commit, state }, data ) => {

    commit( 'SET_SEARCH', data )

};

export const saveClasses = ( { dispatch, commit, state }, data ) => {

    commit( 'SET_CLASSES', data )

};

export const saveFilter = ( { dispatch, commit, state }, data ) => {

    commit( 'SET_FILTER', data )

};
