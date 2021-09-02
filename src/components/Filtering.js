import { useState } from 'react';



export function filterData(data, checkboxchecked, query) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [searchError, setSearchError] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const [value, setValue] = useState({});

    function filterMovie(movie, checkboxchecked, query) {
        const regexp = new RegExp(query, "gi");
        if(checkboxchecked === false) {
          return (movie.nameRU.match(regexp)&&movie.duration<40);
        } else {
          return movie.nameRU.match(regexp);
        }
      }

    
    if (data.length === 0) {
            setSearchError('Ничего не найдено')
    }
 

    // const handleMovieSearchInput = (e) => {
    //     const target = e.target;
    //     const name = target.name;
    //     const value = target.value;
    //     setValue({...value, [name]: value});
    // }

    const filteredData = data.filter(movie => filterMovie(movie, checkboxchecked, query));

    return {searchError, setSearchError, filteredData}
}