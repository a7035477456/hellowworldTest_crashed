-- Sequence for id
CREATE SEQUENCE personVerificationInfo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Table definition
CREATE TABLE public.requestOtherInfo (
    id INTEGER NOT NULL DEFAULT nextval('requestOtherInfo_seq'::regclass),
    otherId INTEGER NOT NULL,


    ageRequest BOOLEAN DEFAULT FALSE,
    ageRequestStatus VARCHAR(255) DEFAULT 'None', --None, InProcess, Completed
    ageRequestApproval BOOLEAN DEFAULT FALSE,

    careerRequest BOOLEAN DEFAULT FALSE,
    careerRequestStatus VARCHAR(255) DEFAULT 'None', --None, InProcess, Completed
    careerRequestApproval BOOLEAN DEFAULT FALSE,

    educationRequest BOOLEAN DEFAULT FALSE,
    educationRequestStatus VARCHAR(255) DEFAULT 'None', --None, InProcess, Completed
    educationRequestApproval BOOLEAN DEFAULT FALSE,
    
    childrenRequest BOOLEAN DEFAULT FALSE,
    childrenRequestStatus VARCHAR(255) DEFAULT 'None', --None, InProcess, Completed
    childrenRequestApproval BOOLEAN DEFAULT FALSE,
    
    homeCityRequest BOOLEAN DEFAULT FALSE,
    homeCityRequestStatus VARCHAR(255) DEFAULT 'None', --None, InProcess, Completed
    homeCityRequestApproval BOOLEAN DEFAULT FALSE,
    
    countryOfBirthRequest BOOLEAN DEFAULT FALSE,
    countryOfBirthRequestStatus VARCHAR(255) DEFAULT 'None', --None, InProcess, Completed
    countryOfBirthRequestApproval BOOLEAN DEFAULT FALSE,

    religionRequest BOOLEAN DEFAULT FALSE,
    religionRequestStatus VARCHAR(255) DEFAULT 'None', --None, InProcess, Completed
    religionRequestApproval BOOLEAN DEFAULT FALSE,
    
    3hobbiesRequest BOOLEAN DEFAULT FALSE,  
    3hobbiesRequestStatus VARCHAR(255) DEFAULT 'None', --None, InProcess, Completed
    3hobbiesRequestApproval BOOLEAN DEFAULT FALSE,

    3FavTVShowsRequest BOOLEAN DEFAULT FALSE,
    3FavTVShowsRequestApproval BOOLEAN DEFAULT FALSE,
    
    3FavMoviesRequest BOOLEAN DEFAULT FALSE,
    3FavMoviesRequestStatus VARCHAR(255) DEFAULT 'None', --None, InProcess, Completed
    3FavMoviesRequestApproval BOOLEAN DEFAULT FALSE,
   
    PRIMARY KEY (id)
);

-- Optional: ensure sequence ownership
ALTER SEQUENCE personVerificationInfo_seq OWNED BY public.personVerificationInfo.id;

    createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT personInfo_pkey PRIMARY KEY (id)
);

-- Optional: ensure sequence ownership
ALTER SEQUENCE singles_seq OWNED BY public.singles.id;
