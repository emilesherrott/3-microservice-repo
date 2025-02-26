DROP TABLE IF EXISTS ceramics;

CREATE TABLE ceramics (
    ceramics_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    piece_name TEXT NOT NULL,
    clay TEXT NOT NULL,
    style TEXT NOT NULL,
    price INT NOT NULL,
    size TEXT NOT NULL,
    piece_name_owner_id INT REFERENCES owners (owners_id),
    piece_name_potter_id INT NOT NULL REFERENCES potters (potters_id)
);

INSERT INTO ceramics (piece_name, clay, style, price, size, piece_name_owner_id, piece_name_potter_id) VALUES
('Ceramic White Espresso', 'Porcelain', 'Mug', 4, '5cm', 1, 1),
('Medium Ceramic Stonware Bowl', 'Stoneware', 'Bowl', 12, '7cm', 1, 1),
('Large Ceramic White Dinner Plate', 'Porcelain', 'Plate', 15, '23cm', 2, 1),
('Guyana Crest Vase', 'Stoneware', 'Vase', 27, '10cm', NULL, 2),
('Blue and White Mug', 'Stoneware', 'Mug', 12, '7cm', 2, 1);