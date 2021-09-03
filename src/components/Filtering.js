export function filterData(data, checkboxChecked, query) {

    function filterMovie(movie, checkboxChecked, query) {
        const regexp = new RegExp(query, "gi");
        if ((query === "")&&(checkboxChecked === false)) {
            return (movie.duration<40);
        } 
        else if(checkboxChecked === false) {
          return (movie.nameRU.match(regexp)&&movie.duration<40);
        } else {
          return movie.nameRU.match(regexp);
        }
      }

    const filteredData = data.filter(movie => filterMovie(movie, checkboxChecked, query));
    
    return filteredData
}