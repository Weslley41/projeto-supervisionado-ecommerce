CREATE DATABASE IF NOT EXISTS ecommerce;
use ecommerce;

-- Tabela de categorias
CREATE TABLE IF NOT EXISTS categorias (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(40)
);

-- Tabela de tags
CREATE TABLE IF NOT EXISTS tags (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(40)
);

-- Tabela de imagens
CREATE TABLE IF NOT EXISTS imagens (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_produto INT REFERENCES produtos(id),
	caminho VARCHAR(100)
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(100),
	valor FLOAT,
	estoque INT,
	data_cadastro DATETIME
);

-- Relacionamento entre produtos, categorias e tags
CREATE TABLE IF NOT EXISTS relacionamento (
	id_produto INT REFERENCES produtos(id),
	id_categoria INT REFERENCES categorias(id),
	id_tag INT REFERENCES tags(id)
);