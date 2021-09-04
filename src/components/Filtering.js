import { SHORT_MOVIES_DURATION } from "../config";

export function filterData(data, checkboxChecked, query) {

    function filterMovie(movie, checkboxChecked, query) {
      const regexp = new RegExp(query, "gi");
      if ((query === "")&&(checkboxChecked === true)) {
          return {};
      } 
      else if(((query === "")&&(checkboxChecked === false))) {
        return (movie.duration<SHORT_MOVIES_DURATION);
      } 
      else if (checkboxChecked === false) {
        return (movie.nameRU.match(regexp)&&movie.duration<SHORT_MOVIES_DURATION);
      }
      else return movie.nameRU.match(regexp);
    }

    const filteredData = data.filter(movie => filterMovie(movie, checkboxChecked, query));

    return filteredData
}