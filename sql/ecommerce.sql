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
	id_categoria INT,
	valor FLOAT,
	visitas INT DEFAULT 0,
	estoque INT,
	data_cadastro DATETIME
);

-- Relacionamento entre produtos e tags
CREATE TABLE IF NOT EXISTS prod_tags (
	id_produto INT REFERENCES produtos(id),
	id_tag INT REFERENCES tags(id)
);

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
	id VARCHAR(30) PRIMARY KEY,
	nome VARCHAR(100),
	adm BOOLEAN DEFAULT FALSE
);

-- Relacionamento entre usuários e produtos favoritos
CREATE TABLE IF NOT EXISTS fav_user (
	id_usuario VARCHAR(30) REFERENCES usuarios(id),
	id_produto INT REFERENCES produtos(id)
);

-- Relacionamento entre usuários e produtos no carrinho
CREATE TABLE IF NOT EXISTS user_cart (
	id_usuario VARCHAR(30) REFERENCES usuarios(id),
	id_produto INT REFERENCES produtos(id),
	qntd_produto INT
);
