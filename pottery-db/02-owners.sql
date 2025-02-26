DROP TABLE IF EXISTS owners;

CREATE TABLE owners (
    owners_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    postcode TEXT NOT NULL
);

INSERT INTO owners (name, postcode) VALUES
('Kiki', 'N17'),
('Marvia', 'WV4');