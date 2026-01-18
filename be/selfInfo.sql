-- Sequence for id
CREATE SEQUENCE selfVerificationInfo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Table definition
CREATE TABLE public.selfVerificationInfo (
    id INTEGER NOT NULL DEFAULT nextval('selfVerificationInfo_seq'::regclass),
    otherId INTEGER NOT NULL,

    age INTEGER,
    ageDisplay VARCHAR(255) DEFAULT 'Age',
    ageVerified BOOLEAN DEFAULT FALSE,
    ageVerifiedStatus VARCHAR(255) DEFAULT 'None', --None, InProcess, Completed
    ageVerifiedComment TEXT,

    career VARCHAR(255),
    careerDisplay VARCHAR(255) DEFAULT 'Career',
    careerVerified BOOLEAN DEFAULT FALSE,    
    careerVerifiedComment TEXT,

    education VARCHAR(255),
    educationDisplay VARCHAR(255) DEFAULT 'Education',
    educationVerified BOOLEAN DEFAULT FALSE,
    educationVerifiedStatus VARCHAR(255) DEFAULT 'None', --None, InProcess, Completed
    educationVerifiedComment TEXT,
    
    children INTEGER,
    childrenDisplay VARCHAR(255) DEFAULT '# of Children',
    childrenVerified BOOLEAN DEFAULT FALSE,
    childrenVerifiedStatus VARCHAR(255) DEFAULT 'None', --None, InProcess, Completed
    childrenVerifiedComment TEXT,
    
    homeCity VARCHAR(255),
    homeCityDisplay VARCHAR(255) DEFAULT 'Home City',
    homeCityVerified BOOLEAN DEFAULT FALSE,
    homeCityVerifiedStatus VARCHAR(255) DEFAULT 'None', --None, InProcess, Completed
    homeCityVerifiedComment TEXT,
    
    countryOfBirth VARCHAR(255),
    countryOfBirthDisplay VARCHAR(255) DEFAULT 'Country of Birth',
    countryOfBirthVerified BOOLEAN DEFAULT FALSE,
    countryOfBirthVerifiedStatus VARCHAR(255) DEFAULT 'None', --None, InProcess, Completed
    countryOfBirthVerifiedComment TEXT,

    religion VARCHAR(255),
    religionDisplay VARCHAR(255) DEFAULT 'Religion',
    religionVerified BOOLEAN DEFAULT FALSE,
    religionVerifiedStatus VARCHAR(255) DEFAULT 'None', --None, InProcess, Completed
    religionVerifiedComment TEXT,
    
    3Hobbies VARCHAR(255),
    3HobbiesDisplay VARCHAR(255) DEFAULT 'Three favorite hobbies',
    3HobbiesVerified BOOLEAN DEFAULT FALSE,
    3HobbiesVerifiedStatus VARCHAR(255) DEFAULT 'None', --None, InProcess, Completed
    3HobbiesVerifiedComment TEXT,
    
    3FavTVShows VARCHAR(255),
    3FavTVShowsDisplay VARCHAR(255) DEFAULT 'Three favorite TV shows',
    3FavTVShowsVerified BOOLEAN DEFAULT FALSE,
    3FavTVShowsVerifiedStatus VARCHAR(255) DEFAULT 'None', --None, InProcess, Completed
    3FavTVShowsVerifiedComment TEXT,
    
    3FavMovies VARCHAR(255),
    3FavMoviesDisplay VARCHAR(255) DEFAULT 'Three favorite movies',
    3FavMoviesVerified BOOLEAN DEFAULT FALSE,
    3FavMoviesVerifiedStatus VARCHAR(255) DEFAULT 'None', --None, InProcess, Completed
    3FavMoviesVerifiedComment TEXT,
    
    moviesVerifiedStatus VARCHAR(255) DEFAULT 'None', --None, InProcess, Completed
    moviesVerifiedComment TEXT,
    
    PRIMARY KEY (id)
);

-- Optional: ensure sequence ownership
ALTER SEQUENCE selfVerificationInfo_seq OWNED BY public.selfVerificationInfo.id;

    createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT selfVerificationInfo_pkey PRIMARY KEY (id)
);

-- Optional: ensure sequence ownership
ALTER SEQUENCE selfVerificationInfo_seq OWNED BY public.selfVerificationInfo.id;
