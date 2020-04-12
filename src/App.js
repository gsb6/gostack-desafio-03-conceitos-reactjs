import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositores, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories')
      .then(response => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: 'https://github.com.br/novo-repositorio',
      techs: ['ReactJS', 'NodeJS'],
    });

    setRepositories([...repositores, response.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`)
      .then(response => {
        if (response.status === 204) {
          const newList = repositores.filter((repo) => repo.id !== id);

          setRepositories(newList);
        }
      })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositores.map(({ id, title }) => (
            <li key={id}>
              {title}
              <button onClick={() => handleRemoveRepository(id)}>Remover</button>
            </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
