import * as movieService from "./movies/index.js";

const invokeAction = async({action, id, title, director}) => {
    switch(action) {
        case "list":
            const allMovies = await movieService.getAllMovies();
            return console.log(allMovies);
        case "getById":
            const oneMovie = await movieService.getMovieById(id);
            return console.log(oneMovie);
        case "add":
            const newMovie = await movieService.addMovie({title, director});
            return console.log(newMovie);
        case "updateById":
            const updateMovie = await movieService.updateMovieById(id, {title, director});
            return console.log(updateMovie);
        case "deleteById":
            const deleteMovie = await movieService.deleteById(id);
            return console.log(deleteMovie);
        default:
            console.log("Unknown action");
    }
}

console.log(process.argv);