import React, { useState } from 'react';

function filterMovie(movie, checkboxchecked, query) {
    const regexp = new RegExp(query, "gi");
    if(checkboxchecked === false) {
      return (movie.nameRU.match(regexp)&&movie.duration<40);
    } else {
      return movie.nameRU.match(regexp);
    }
  }

export function filterData(data, query) {
    const [searchError, setSearchError] = useState('');
    
    return data.filter(movie => filterMovie(movie, query))
}