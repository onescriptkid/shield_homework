--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.6
-- Dumped by pg_dump version 9.6.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: logs; Type: TABLE; Schema: public; Owner: shieldAdmin
--

CREATE TABLE public.logs (
    id integer NOT NULL,
    drone_generation integer NOT NULL,
    start_time timestamp without time zone NOT NULL,
    end_time timestamp without time zone NOT NULL,
    lat double precision NOT NULL,
    lng double precision NOT NULL,
    building_map_layout uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    username text
);


ALTER TABLE public.logs OWNER TO "shieldAdmin";

--
-- Name: logs_id_seq; Type: SEQUENCE; Schema: public; Owner: shieldAdmin
--

CREATE SEQUENCE public.logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.logs_id_seq OWNER TO "shieldAdmin";

--
-- Name: logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shieldAdmin
--

ALTER SEQUENCE public.logs_id_seq OWNED BY public.logs.id;


--
-- Name: logs id; Type: DEFAULT; Schema: public; Owner: shieldAdmin
--

ALTER TABLE ONLY public.logs ALTER COLUMN id SET DEFAULT nextval('public.logs_id_seq'::regclass);


--
-- Data for Name: logs; Type: TABLE DATA; Schema: public; Owner: shieldAdmin
--

COPY public.logs (id, drone_generation, start_time, end_time, lat, lng, building_map_layout, created_at, username) FROM stdin;
1	11	2018-07-04 02:01:42.826	2018-07-04 02:03:42.826	40.4670559999999995	-79.9165019999999942	98994f9b-31f2-48fc-b7cc-c265812c6b2f	2018-07-06 06:01:42.957435	Ottilie Carter
2	9	2018-07-05 02:17:37.752	2018-07-05 02:34:37.752	40.4904730000000015	-79.9610330000000005	ab0f83e3-a322-4c11-9f06-e2eabf5006bc	2018-07-06 06:17:37.888923	Mr. Earnestine Cremin
\.


--
-- Name: logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shieldAdmin
--

SELECT pg_catalog.setval('public.logs_id_seq', 2, true);


--
-- Name: logs logs_pkey; Type: CONSTRAINT; Schema: public; Owner: shieldAdmin
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_pkey PRIMARY KEY (id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: shieldAdmin
--

REVOKE ALL ON SCHEMA public FROM rdsadmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO "shieldAdmin";
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

