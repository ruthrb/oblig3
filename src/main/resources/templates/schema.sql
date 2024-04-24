CREATE TABLE Oblig3
(
    id SERIAL NOT NULL,
    film VARCHAR(255) NOT NULL,
    antall VARCHAR NOT NULL,
    fornavn VARCHAR(255) NOT NULL,
    etternavn VARCHAR(255) NOT NULL,
    epost VARCHAR(255) NOT NULL,
    telefonnr VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
);