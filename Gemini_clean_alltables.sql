-- Sequence for singles
CREATE SEQUENCE public.singles_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE public.singles (
    singles_id bigint DEFAULT nextval('public.singles_id_seq'::regclass) NOT NULL,
    password_hash character varying(255) NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    middlename character varying(255),
    user_status character(10) DEFAULT 'active'::bpchar,
    email character varying(255) NOT NULL,
    email_verified character(10) DEFAULT 'n/a'::bpchar,
    phone character varying(50),
    vetted_status boolean DEFAULT false,
    vetted_description character varying(500) DEFAULT 'n/a'::character varying,
    optoutadvertise boolean DEFAULT false,
    profile_image_url character varying(500),
    profilephoto_vetted character(10) DEFAULT 'n/a'::bpchar,
    profilephoto_vetted_date timestamp without time zone,
    profilephoto_vetted_by_userid bigint,
    profilephoto_vetted_note character varying(255) DEFAULT 'n/a'::character varying,
    age smallint,
    age_vetted character(10) DEFAULT 'n/a'::bpchar,
    age_vetted_date timestamp without time zone,
    age_vetted_by_userid bigint,
    age_vetted_note character varying(255) DEFAULT 'n/a'::character varying,
    job_title character varying(255),
    job_vetted character(10) DEFAULT 'n/a'::bpchar,
    job_vetted_date timestamp without time zone,
    job_vetted_by_userid bigint,
    job_vetted_note character varying(255) DEFAULT 'new'::character varying,
    current_city character varying(255),
    current_city_vetted character(10) DEFAULT 'n/a'::bpchar,
    current_city_vetted_date timestamp without time zone,
    current_city_vetted_by_userid bigint,
    current_city_vetted_note character varying(255) DEFAULT 'n/a'::character varying,
    countryofbirth character varying(255),
    countryofbirth_vetted character(10) DEFAULT 'n/a'::bpchar,
    countryofbirth_vetted_date timestamp without time zone,
    countryofbirth_vetted_by_userid bigint,
    countryofbirth_vetted_note character varying(255) DEFAULT 'n/a'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT singles_pkey PRIMARY KEY (singles_id)
);


-- Sequence for requests
CREATE SEQUENCE public.requests_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE public.requests (
    requests_id bigint DEFAULT nextval('public.requests_id_seq'::regclass) NOT NULL,
    singles_id_from bigint NOT NULL,
    singles_id_to bigint NOT NULL,
    profilephoto_request boolean DEFAULT false,
    profilephoto_requestapproval boolean DEFAULT false,
    age_request boolean DEFAULT false,
    age_requestapproval boolean DEFAULT false,
    job_request boolean DEFAULT false,
    job_requestapproval boolean DEFAULT false,
    current_city_request boolean DEFAULT false,
    current_city_requestapproval boolean DEFAULT false,
    countryofbirth_request boolean DEFAULT false,
    countryofbirth_requestapproval boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    interested date,

    CONSTRAINT requests_pkey PRIMARY KEY (requests_id),
    CONSTRAINT chk_not_self_request CHECK (singles_id_from <> singles_id_to),
    CONSTRAINT uq_requests_from_to UNIQUE (singles_id_from, singles_id_to),
    
    -- Foreign Key Constraints
    CONSTRAINT fk_requests_from FOREIGN KEY (singles_id_from) 
        REFERENCES public.singles(singles_id) ON DELETE CASCADE,
    CONSTRAINT fk_requests_to FOREIGN KEY (singles_id_to) 
        REFERENCES public.singles(singles_id) ON DELETE CASCADE
);

-- Performance Indices
CREATE INDEX idx_requests_from ON public.requests USING btree (singles_id_from);
CREATE INDEX idx_requests_to ON public.requests USING btree (singles_id_to);