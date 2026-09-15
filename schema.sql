-- Schema do banco de dados - Projeto Site ONG
-- PostgreSQL

CREATE TABLE ongs (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    area_atuacao VARCHAR(50)
);

CREATE TABLE eventos (
    id SERIAL PRIMARY KEY,
    ong_id INTEGER NOT NULL REFERENCES ongs(id) ON DELETE CASCADE,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    data_evento DATE NOT NULL,
    local VARCHAR(150)
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT NOW()
);

CREATE TABLE inscricoes (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    evento_id INTEGER NOT NULL REFERENCES eventos(id) ON DELETE CASCADE,
    data_inscricao TIMESTAMP DEFAULT NOW(),
    UNIQUE (usuario_id, evento_id)
);
