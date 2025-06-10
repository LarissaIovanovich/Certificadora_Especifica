import React, { useState } from 'react';
import { createTeam } from '../services/api';
import './CadastroEquipe.module.css';

const CadastroEquipe = () => {
  const [nomeEquipe, setNomeEquipe] = useState('');
  const [tag, setTag] = useState('');
  const [imagemEquipe, setImagemEquipe] = useState(null);
  const [imagemPreview, setImagemPreview] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf9IlIoDAoMWCaofQ6rp1WgGBgBALXhNk-3w&s');
  const [integrantes, setIntegrantes] = useState([]);
  const [nomeIntegrante, setNomeIntegrante] = useState('');
  const [nicknameIntegrante, setNicknameIntegrante] = useState('');
 
  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagemEquipe(file);
        setImagemPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoverImagem = () => {
    setImagemEquipe(null);
    setImagemPreview('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf9IlIoDAoMWCaofQ6rp1WgGBgBALXhNk-3w&s');
  };

  const nicknameExiste = (nickname, ignorarIndex = -1) => {
    return integrantes.some((i, idx) => i.nickname.toLowerCase() === nickname.toLowerCase() && idx !== ignorarIndex);
  };

  const handleAdicionarIntegrante = () => {
    if (!nomeIntegrante || !nicknameIntegrante) {
      alert('Preencha nome e nickname do integrante.');
      return;
    }

    if (nicknameExiste(nicknameIntegrante)) {
      alert('Nickname já existe na equipe.');
      return;
    }

    setIntegrantes([...integrantes, { nome: nomeIntegrante, nickname: nicknameIntegrante }]);
    setNomeIntegrante('');
    setNicknameIntegrante('');
  };

  const handleEditarIntegrante = (index) => {
    const integrante = integrantes[index];
    const novoNome = prompt('Novo nome do integrante:', integrante.nome);
    const novoNickname = prompt('Novo nickname:', integrante.nickname);

    if (novoNome && novoNickname) {
      if (nicknameExiste(novoNickname, index)) {
        alert('Este nickname já está em uso por outro integrante.');
        return;
      }

      const novosIntegrantes = [...integrantes];
      novosIntegrantes[index] = {
        nome: novoNome.trim(),
        nickname: novoNickname.trim()
      };
      setIntegrantes(novosIntegrantes);
    }
  };

  const handleRemoverIntegrante = (index) => {
    const novosIntegrantes = integrantes.filter((_, i) => i !== index);
    setIntegrantes(novosIntegrantes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        nome: nomeEquipe,
        tag: tag,
        url_logo: imagemPreview
      }

      await createTeam(data);
      alert("Time criado com sucesso!");
      setTimeout(() => {
       //window.location.href = "/cadastroequipe";
      }, 1000);
    } catch (error) {
      //pendente: fazer verificacao e retornar msg da api
      alert("Dados inválidos. Tente novamente.");
      console.log(error)
    }
  };

  return (
    <div>

      <main className="main-container">
        <section className="form-container">
          <h1>CADASTRO DE EQUIPE</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="nomeEquipe">NOME DA EQUIPE</label>
            <input
              type="text"
              id="nomeEquipe"
              placeholder="Insira o nome da equipe"
              value={nomeEquipe}
              onChange={(e) => setNomeEquipe(e.target.value)}
            />
            <label htmlFor="nomeEquipe">TAG</label>
            <input
              type="text"
              id="nomeEquipe"
              placeholder="Insira a TAG da equipe"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <label>IMAGEM DA EQUIPE</label>
            <div className="upload-box">
              <img id="previewImagem" src={imagemPreview} alt="Upload imagem equipe" />
              <input type="file" id="uploadImagem" onChange={handleImagemChange} />
            </div>
            {imagemEquipe && (
              <div className="file-name">
                <span>{imagemEquipe.name}</span>
                <button type="button" className="remover" onClick={handleRemoverImagem}>REMOVER</button>
              </div>
            )}

            <label>INTEGRANTES</label>
            <div className="integrante-inputs">
              <input
                type="text"
                placeholder="Nome do integrante"
                value={nomeIntegrante}
                onChange={(e) => setNomeIntegrante(e.target.value)}
              />
              <input
                type="text"
                placeholder="Nickname"
                value={nicknameIntegrante}
                onChange={(e) => setNicknameIntegrante(e.target.value)}
              />
              <button type="button" id="addIntegrante" onClick={handleAdicionarIntegrante}>
                + ADICIONAR
              </button>
            </div>

            <ul id="listaIntegrantes">
              {integrantes.map((intg, index) => (
                <li key={index}>
                  <span>{intg.nome} (<strong>{intg.nickname}</strong>)</span>
                  <div>
                    <button type="button" onClick={() => handleEditarIntegrante(index)}>EDITAR</button>
                    <button type="button" onClick={() => handleRemoverIntegrante(index)}>REMOVER</button>
                  </div>
                </li>
              ))}
            </ul>

            <button type="submit" className="btn-submit">
              CADASTRAR EQUIPE <i className="fas fa-chevron-right"></i>
            </button>
          </form>
        </section>
        <aside className="img-container"></aside>
      </main>
    </div>
  );
};

export default CadastroEquipe;
