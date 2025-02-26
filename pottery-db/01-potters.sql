DROP TABLE IF EXISTS potters;

CREATE TABLE potters (
    potters_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    studio_postcode TEXT NOT NULL
);

INSERT INTO potters (name, studio_postcode) VALUES
('Keith Jones', 'CT5'),
('Rich Miller', 'CR3');