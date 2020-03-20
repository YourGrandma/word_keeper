export const getCurrentFavorites = state => {

    return state.data.favorites;

};

export const getFavoritesIDs = state => {

    return state.data.favorites.map( item => item.uuid );

};

export const getClasses = state => {

    return state.data.classes

};

export const getSearch = state => {

    return state.data.search

};

export const getFilter = state => {

    return state.data.filter

};
