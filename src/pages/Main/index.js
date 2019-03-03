import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';

import logo from '../../assets/logo.png';

import { Container, Form } from './style';

import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    repositoryError: false,
    loading: false,
    repositoryInput: '',
    repositories: [],
  };

  componentWillMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  removeRepository = (repo) => {
    const { repositories } = this.state;
    // Removendo o repositorio do array
    const newRepositories = repositories.filter(repository => repository !== repo);
    // atualizando o array no state
    this.setState({ repositories: newRepositories });
    // atualizando o array no storage
    localStorage.setItem('repositories', JSON.stringify(newRepositories));
  };

  updateRepository = async (repo) => {
    const { repositories } = this.state;
    this.setState({ loading: true });

    try {
      // Buscando informacoes atualizadas do repositorio
      const { data: repository } = await api.get(`/repos/${repo.full_name}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      // Percorrendo os repositorios e atualizando o repositorio solicitado
      const newRepositories = repositories.map((repoItem) => {
        if (repoItem === repo) {
          return repository;
        }
        return repoItem;
      });

      this.setState({
        repositories: newRepositories,
        repositoryError: false,
      });

      localStorage.setItem('repositories', JSON.stringify(newRepositories));
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleAddRepository = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { repositories, repositoryInput } = this.state;

    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput: '',
        repositories: [...repositories, repository],
        repositoryError: false,
      });

      localStorage.setItem('repositories', JSON.stringify(this.state.repositories));
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      repositories, repositoryInput, repositoryError, loading,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="Git Compare" />
        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>

        <CompareList
          updateRepository={this.updateRepository}
          removeRepository={this.removeRepository}
          repositories={repositories}
        />
      </Container>
    );
  }
}
