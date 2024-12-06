# locadora

Criar a DATABASE
CREATE DATABASE locadora;

Criar a Tabela motoristas

CREATE TABLE motoristas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnh VARCHAR(20) UNIQUE NOT NULL,
    validade_cnh DATE NOT NULL,
    telefone VARCHAR(15),
    endereco TEXT
);

Criar a Tabela veiculos

CREATE TABLE veiculos (
    id SERIAL PRIMARY KEY,
    modelo VARCHAR(50) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    ano INT CHECK (ano > 1900 AND ano <= EXTRACT(YEAR FROM CURRENT_DATE)),
    placa VARCHAR(10) UNIQUE NOT NULL,
    quilometragem INT DEFAULT 0,
    disponivel BOOLEAN DEFAULT TRUE
);

Criar a Tabela aluguel

CREATE TABLE aluguel (
    id SERIAL PRIMARY KEY,
    motorista_id INT REFERENCES motoristas(id) ON DELETE CASCADE,
    veiculo_id INT REFERENCES veiculos(id) ON DELETE CASCADE,
    data_inicio DATE NOT NULL,
    data_fim DATE,
    valor_diaria DECIMAL(10, 2) NOT NULL,
    valor_total DECIMAL(10, 2),
    status VARCHAR(20) CHECK (status IN ('Em andamento', 'Finalizado', 'Cancelado')) DEFAULT 'Em andamento'
);

Criar a Tabela manutencoes

CREATE TABLE manutencoes (
    id SERIAL PRIMARY KEY,
    veiculo_id INT REFERENCES veiculos(id) ON DELETE CASCADE,
    descricao TEXT NOT NULL,
    data DATE NOT NULL,
    custo DECIMAL(10, 2) NOT NULL
);

