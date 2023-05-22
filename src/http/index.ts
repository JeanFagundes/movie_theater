import axios from 'axios';

//exportação para fazer requisições de filmes pelo axios

const httpAxios = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie/',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDAzZmM5NzM4MjFlNThjZGY1OTgxOGEwNDQ4MjUzYSIsInN1YiI6IjY0NjcwMjAxYTUwNDZlMDE2ODM2MWY2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bOZaLsMPZbnvsfJSFyDYEHMdbju54j9XNTD8OBd7f-A',
  },
});

export default httpAxios;
