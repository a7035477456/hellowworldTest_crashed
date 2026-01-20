--
-- PostgreSQL database dump
--

\restrict dNLfe5vpfjPJJPicbhna61ffVhvT0d5ciOqg03ETGYxduFc7Z44QgRenGw6Dwta

-- Dumped from database version 16.11 (Homebrew)
-- Dumped by pg_dump version 16.11 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE SCHEMA public;

ALTER SCHEMA public OWNER TO pg_database_owner;

COMMENT ON SCHEMA public IS 'standard public schema';





CREATE SEQUENCE public.requests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.requests_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: requests; Type: TABLE; Schema: public; Owner: postgres
--

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
    interested date NULL,
    CONSTRAINT chk_not_self_request CHECK ((singles_id_from <> singles_id_to))
);


ALTER TABLE public.requests OWNER TO postgres;
SELECT pg_catalog.setval('public.requests_id_seq', 2, true);



ALTER TABLE ONLY public.requests
    ADD CONSTRAINT uq_requests_from_to UNIQUE (singles_id_from, singles_id_to);

CREATE INDEX idx_requests_from ON public.requests USING btree (singles_id_from);

CREATE INDEX idx_requests_to ON public.requests USING btree (singles_id_to);

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_pkey PRIMARY KEY (requests_id);



ALTER TABLE ONLY public.requests
    ADD CONSTRAINT fk_requests_from FOREIGN KEY (singles_id_from) REFERENCES public.singles(singles_id) ON DELETE CASCADE;


ALTER TABLE ONLY public.requests
    ADD CONSTRAINT fk_requests_to FOREIGN KEY (singles_id_to) REFERENCES public.singles(singles_id) ON DELETE CASCADE;




--
-- Name: singles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.singles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.singles_id_seq OWNER TO postgres;

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
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.singles OWNER TO postgres;

SELECT pg_catalog.setval('public.singles_id_seq', 11, true);

ALTER TABLE ONLY public.singles
    ADD CONSTRAINT singles_pkey PRIMARY KEY (singles_id);

--
-- Data for Name: requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.requests (requests_id, singles_id_from, singles_id_to, profilephoto_request, profilephoto_requestapproval, age_request, age_requestapproval, job_request, job_requestapproval, current_city_request, current_city_requestapproval, countryofbirth_request, countryofbirth_requestapproval, created_at, updated_at) FROM stdin;
2	5	8	t	t	t	t	t	f	t	f	f	f	2026-01-19 11:40:04.41368	2026-01-19 11:40:04.41368
3	5	4	t	t	t	t	t	f	f	f	f	f	2026-01-19 13:49:06.349045	2026-01-19 13:49:06.349045
\.


--
-- Data for Name: singles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.singles (singles_id, password_hash, firstname, lastname, middlename, user_status, email, email_verified, phone, vetted_status, vetted_description, optoutadvertise, profile_image_url, profilephoto_vetted, profilephoto_vetted_date, profilephoto_vetted_by_userid, profilephoto_vetted_note, age, age_vetted, age_vetted_date, age_vetted_by_userid, age_vetted_note, job_title, job_vetted, job_vetted_date, job_vetted_by_userid, job_vetted_note, current_city, current_city_vetted, current_city_vetted_date, current_city_vetted_by_userid, current_city_vetted_note, countryofbirth, countryofbirth_vetted, countryofbirth_vetted_date, countryofbirth_vetted_by_userid, countryofbirth_vetted_note, created_at, updated_at) FROM stdin;
5	$2a$06$/57VbOMBqrY.fmjEL1MQ2uZfiSsizzYEJgKOyb9IrtSkpKD7UBJZm	\N	\N	\N	active    	lizeth@example.com	n/a       	+1-555-0105	f	n/a	f	https://i.pravatar.cc/150?img=5	n/a       	\N	\N	n/a	\N	n/a       	\N	\N	n/a	Investor Division Strategist	n/a       	\N	\N	new	Boston, USA	n/a       	\N	\N	n/a	\N	n/a       	\N	\N	n/a	2026-01-12 11:57:00.279181	2026-01-12 11:57:00.279181
8	$2a$06$FDEr8eGLx4zYJHXvYJ7c8uRoG0kkRwjZiWpOb8saCLTeqSKNEks0W	\N	\N	\N	active    	sarah@example.com	n/a       	+1-555-0108	f	n/a	f	https://i.pravatar.cc/150?img=8	n/a       	\N	\N	n/a	\N	n/a       	\N	\N	n/a	Business Development Manager	n/a       	\N	\N	new	Denver, USA	n/a       	\N	\N	n/a	\N	n/a       	\N	\N	n/a	2026-01-12 11:57:00.279181	2026-01-12 11:57:00.279181
4	$2a$06$CnI863Edvp0dcIm0spUoLeCUoDmfbTduV2fOrtflUTNu/OyF6uc6q	\N	\N	\N	active    	rosalia@example.com	n/a       	+1-555-0104	f	n/a	f	https://i.pravatar.cc/150?img=10	n/a       	\N	\N	n/a	\N	n/a       	\N	\N	n/a	Dynamic Operations Officer	n/a       	\N	\N	new	Los Angeles, USA	n/a       	\N	\N	n/a	\N	n/a       	\N	\N	n/a	2026-01-12 11:57:00.279181	2026-01-12 11:57:00.279181
2	$2a$06$GRLvjwvZ30Xn9uBEf3.cK.1JdLwhs/PEhqeGNfe9haE4RLGgxHK1C	\N	\N	\N	active    	gaetano@example.com	n/a       	+1-555-0102	f	n/a	f	https://i.pravatar.cc/150?img=11	n/a       	\N	\N	n/a	\N	n/a       	\N	\N	n/a	Investor Division Strategist	n/a       	\N	\N	new	San Francisco, USA	n/a       	\N	\N	n/a	\N	n/a       	\N	\N	n/a	2026-01-12 11:57:00.279181	2026-01-12 11:57:00.279181
3	$2a$06$SthEdc4NEuWODkoYNr5El.x1WsFu/AJIoY2pwqbqURI0bLhzs351C	\N	\N	\N	active    	elisabeth@example.com	n/a       	+1-555-0103	f	n/a	f	https://i.pravatar.cc/150?img=12	n/a       	\N	\N	n/a	\N	n/a       	\N	\N	n/a	Future Markets Associate	n/a       	\N	\N	new	Chicago, USA	n/a       	\N	\N	n/a	\N	n/a       	\N	\N	n/a	2026-01-12 11:57:00.279181	2026-01-12 11:57:00.279181
6	$2a$06$f3eEUrHWNXxMmXPGHcQduuf7Sl2JMApM4FBc8G0q34mfWUFxntuyC	\N	\N	\N	active    	jessyca@example.com	n/a       	+1-555-0106	f	n/a	f	https://i.pravatar.cc/150?img=16	n/a       	\N	\N	n/a	\N	n/a       	\N	\N	n/a	Future Markets Associate	n/a       	\N	\N	new	Seattle, USA	n/a       	\N	\N	n/a	\N	n/a       	\N	\N	n/a	2026-01-12 11:57:00.279181	2026-01-12 11:57:00.279181
7	$2a$06$x6tjZrXaJBpA/Lxk3O0z3O7WH3Tij.FsI8xkbnpipYu0/npozP9Am	\N	\N	\N	active    	john@example.com	n/a       	+1-555-0107	f	n/a	f	https://i.pravatar.cc/150?img=17	n/a       	\N	\N	n/a	\N	n/a       	\N	\N	n/a	Senior Financial Analyst	n/a       	\N	\N	new	Austin, USA	n/a       	\N	\N	n/a	\N	n/a       	\N	\N	n/a	2026-01-12 11:57:00.279181	2026-01-12 11:57:00.279181
9	$2a$06$ghCR9vNVirzRheim1lWG9OIhWSJB9tMa/hhDT8acuAPhe349YBELq	\N	\N	\N	active    	michael@example.com	n/a       	+1-555-0109	f	n/a	f	https://i.pravatar.cc/150?img=19	n/a       	\N	\N	n/a	\N	n/a       	\N	\N	n/a	Operations Coordinator	n/a       	\N	\N	new	Miami, USA	n/a       	\N	\N	n/a	\N	n/a       	\N	\N	n/a	2026-01-12 11:57:00.279181	2026-01-12 11:57:00.279181
1	$2a$06$k.1pWyxJUJkE3LhOt99O8uUWwBxbriTGIYyrTteYMebJLEp0Djm2u	\N	\N	\N	active    	phoebe@example.com	n/a       	+1-555-0101	f	n/a	f	https://i.pravatar.cc/150?img=20	n/a       	\N	\N	n/a	\N	n/a       	\N	\N	n/a	Dynamic Operations Officer V2	n/a       	\N	\N	new	New York, USA	n/a       	\N	\N	n/a	\N	n/a       	\N	\N	n/a	2026-01-12 11:57:00.279181	2026-01-12 11:57:00.279181
\.




\unrestrict dNLfe5vpfjPJJPicbhna61ffVhvT0d5ciOqg03ETGYxduFc7Z44QgRenGw6Dwta

