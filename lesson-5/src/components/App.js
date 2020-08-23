import React from 'react';
import './App.css';
import { serverAPI } from '../API/serverAPI';
import Preloader from './common/Preloader/Preloader';
import { FilmListPage } from './FIlmListPage/FilmListPage';
import { FilmFormPage } from './FIlmFormPage/FilmFormPage';
import clsns from "classnames"
import { Button } from './common/Button/Button';

const tableHeader = ['Название', 'Год выпуска', 'Режисер', 'Рейтинг', 'Статус']

const displayMode = {
  list: 'list',
  add: "add",
  edit: 'edit',
  delete: 'delete',
}

class App extends React.Component {
  state = {

    films: null,
    loading: true,
    error: null,

    filmOnEdit: '',

    renderMode: displayMode.list
  }

  setFilmOnEdit = (filmId, mode) => {
    this.setState({ filmOnEdit: filmId, renderMode: displayMode[mode] })
  }

  addFilm = (film) => {
    film.id = this.state.films.length + 1
    this.setState({ films: [...this.state.films, film] })
  }

  deleteFilm = (id) => {
    this.setState({ films: this.state.films.filter(film => film.id !== id) })
  }

  editFilm = (newFilm) => {
    let index = this.state.films.findIndex(film => film.id === newFilm.id)
    let films = [...this.state.films.slice(0, index), newFilm, ...this.state.films.slice(index + 1)]
    this.setState({ films: films })
  }

  setError = (e) => {
    this.setState({error : e}, () => console.log(this.state.error))
  }

  changeRenderMode = (mode) => {
    this.setState({ renderMode: displayMode[mode] })
  }

  async componentDidMount() {
    try {
      let payload = await serverAPI.getFilms()
      this.setState({ films: payload, loading: false })
    } catch (error) {
      this.setError(error.message)
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <Preloader />
        </div>
      )
    }
    if (this.state.error) {
      return (
        <div className={clsns({
          'error' : true , 
          'error__active' : this.state.error
        })}>
          {this.state.error}
        </div>
      )
    }
    return (
      <>
        <div className="App">
          <h1 className='section_header'>ФИЛЬМ МЕНЕДЖЕР</h1>
          {
            this.state.renderMode === displayMode.list
              ? <Button onClick={() => this.changeRenderMode('add')} buttonMode='add'>Добавление</Button>
              : <Button onClick={() => this.changeRenderMode('list')}  buttonMode='edit'>К списку</Button>
          }
          {this.state.renderMode === displayMode.list &&
            <FilmListPage tableHeader={tableHeader}
              films={this.state.films}
              setFilmOnEdit={this.setFilmOnEdit}
              deleteFilm={this.deleteFilm}
              setError={this.setError} />}

          {this.state.renderMode === displayMode.add &&
            <FilmFormPage changeRenderMode={this.changeRenderMode}
              serverRequest={serverAPI.addFilms}
              filmOnEdit={this.state.filmOnEdit}
              changeParrentState={this.addFilm}
              makeRequest={this.makeRequest}
              setError={this.setError} />}

          {this.state.renderMode === displayMode.edit &&
            <FilmFormPage {...this.state.films.filter(film => film.id === this.state.filmOnEdit)[0]}
              filmOnEdit={this.state.filmOnEdit}
              changeRenderMode={this.changeRenderMode}
              serverRequest={serverAPI.editFilm}
              changeParrentState={this.editFilm}
              setError={this.setError}
            />}
        </div>
      </>
    );
  }
}

export default App;
