-- Criação da tabela 'games'
CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    id_steam INT NOT NULL,
    url_image TEXT
);

-- Criação da tabela 'configuracoes'
CREATE TABLE configuracoes (
    id SERIAL PRIMARY KEY,
    desempenho_esperado TEXT NOT NULL,
    custo_final FLOAT NOT NULL,
    configuracao JSON NOT NULL,
    game_id INT NOT NULL,
    usuario_id INT NOT NULL,
    data date NOT NULL,
    FOREIGN KEY (game_id) REFERENCES games(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)  -- Chave estrangeira referenciando 'usuarios'
);

-- Criação da tabela 'usuarios'
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,  -- Email é único
    senha TEXT NOT NULL, 
    tipo CHAR(1) NOT NULL CHECK (tipo = 'A' OR tipo = 'U'),  -- Restrição para tipo ser 'A' ou 'U'
    telefone VARCHAR(14) NOT NULL, 
    nome VARCHAR(50) NOT NULL
);


INSERT INTO games (nome, id_steam, url_image) 
VALUES 
('Cyberpunk 2077', 1091500, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg?t=1726188854'),
('The Witcher 3: Wild Hunt', 292030, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg?t=1726045366'),
('Red Dead Redemption 2', 1174180, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg?t=1720558643');


INSERT INTO configuracoes (desempenho_esperado, custo_final, configuracao, game_id, usuario_id, data) 
VALUES 
('Alto', 5000.00, '{"cpu": "Intel i9", "gpu": "RTX 3080", "ram": "32GB", "storage": "1TB SSD"}', 1, 2, '2024-10-01'),
('Médio', 3000.00, '{"cpu": "AMD Ryzen 5", "gpu": "RTX 2060", "ram": "16GB", "storage": "512GB SSD"}', 2, 3, '2024-10-02'),
('Baixo', 1500.00, '{"cpu": "Intel i5", "gpu": "GTX 1050", "ram": "8GB", "storage": "256GB SSD"}', 3, 2, '2024-10-03');
