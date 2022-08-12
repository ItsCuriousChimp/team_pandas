--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

-- Started on 2022-08-11 18:38:04

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 212 (class 1259 OID 36999)
-- Name: Account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    username character varying(128) NOT NULL,
    "passwordHash" character varying(256) NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."Account" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 37048)
-- Name: BookedSeat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BookedSeat" (
    id text NOT NULL,
    "seatId" text NOT NULL,
    "showId" text NOT NULL,
    "bookingId" text NOT NULL
);


ALTER TABLE public."BookedSeat" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 37041)
-- Name: Booking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Booking" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "showId" text NOT NULL,
    "numberOfSeatsBooked" integer NOT NULL,
    "showDate" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Booking" OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 36984)
-- Name: City; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."City" (
    id text NOT NULL,
    name character varying(64) NOT NULL
);


ALTER TABLE public."City" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 37027)
-- Name: Movie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Movie" (
    id text NOT NULL,
    name character varying(128) NOT NULL,
    "durationInMin" integer NOT NULL,
    language character varying(32) NOT NULL
);


ALTER TABLE public."Movie" OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 37013)
-- Name: Screen; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Screen" (
    id text NOT NULL,
    "screenNumber" integer NOT NULL,
    "theatreId" text NOT NULL
);


ALTER TABLE public."Screen" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 37020)
-- Name: Seat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Seat" (
    id text NOT NULL,
    "seatNumber" integer NOT NULL,
    "screenId" text NOT NULL
);


ALTER TABLE public."Seat" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 37034)
-- Name: Show; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Show" (
    id text NOT NULL,
    "screenId" text NOT NULL,
    "movieId" text NOT NULL,
    "availableUntilUtc" timestamp(3) without time zone,
    "showEndTimeInUtc" timestamp(3) without time zone NOT NULL,
    "showStartTimeInUtc" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Show" OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 37006)
-- Name: Theatre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Theatre" (
    id text NOT NULL,
    name character varying(64) NOT NULL,
    "numberOfScreens" integer NOT NULL,
    "cityId" text NOT NULL
);


ALTER TABLE public."Theatre" OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 36991)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name character varying(128) NOT NULL,
    email character varying(64) NOT NULL,
    "phoneNumber" character varying(32) NOT NULL,
    "loggedInAtUTC" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "cityId" text NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 36973)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 3383 (class 0 OID 36999)
-- Dependencies: 212
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Account" (id, username, "passwordHash", "userId") FROM stdin;
46f3af79-c443-4073-8561-edbf39506cc4	pichu	$2a$11$uKXIbtOpxanbPfHrG8H/..i0TtZVhrofdMoMmBAHy1cvC.Ikkfcl6	0fd5a190-111c-45cc-b466-5cc75e82d452
\.


--
-- TOC entry 3390 (class 0 OID 37048)
-- Dependencies: 219
-- Data for Name: BookedSeat; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."BookedSeat" (id, "seatId", "showId", "bookingId") FROM stdin;
7db94e21-7285-4232-b209-3aa6756172cd	8e88d51f-2f54-4627-b592-9b69ef4df5ba	1666ce55-4e96-49c4-899a-b98f0eac866d	78bc532e-b29b-4f65-be5c-ee21350dc090
16ea958d-b26c-49e4-9f46-10d92af51aad	abb19511-2c31-4d6c-b2c1-b91aaacf3bcf	1666ce55-4e96-49c4-899a-b98f0eac866d	78bc532e-b29b-4f65-be5c-ee21350dc090
\.


--
-- TOC entry 3389 (class 0 OID 37041)
-- Dependencies: 218
-- Data for Name: Booking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Booking" (id, "userId", "showId", "numberOfSeatsBooked", "showDate") FROM stdin;
78bc532e-b29b-4f65-be5c-ee21350dc090	0fd5a190-111c-45cc-b466-5cc75e82d452	1666ce55-4e96-49c4-899a-b98f0eac866d	2	1970-01-01 00:00:00
\.


--
-- TOC entry 3381 (class 0 OID 36984)
-- Dependencies: 210
-- Data for Name: City; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."City" (id, name) FROM stdin;
bc96857e-047e-4a58-89ac-48dd4c05e1d4	Lucknow
08bc14a5-9c3c-496a-9798-0c59ba7036fc	Hyderabad
\.


--
-- TOC entry 3387 (class 0 OID 37027)
-- Dependencies: 216
-- Data for Name: Movie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Movie" (id, name, "durationInMin", language) FROM stdin;
6c4fe7dc-7d5a-4f95-bcd6-b242997c7740	One piece: Red	150	Japanese
dbeb97b9-22d2-43f2-bcd0-8ecb9b4d2651	JJK: 0	108	Japanese
188ed62b-883c-4289-9b11-9bb0c9d94ebd	Pichu: The electric panda	180	English
\.


--
-- TOC entry 3385 (class 0 OID 37013)
-- Dependencies: 214
-- Data for Name: Screen; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Screen" (id, "screenNumber", "theatreId") FROM stdin;
44b9f1e5-8f25-486b-ac2f-1ae892b015b0	1	c2f036e6-3822-460d-bef6-31a96b3b6f62
f90f7010-f23d-40c1-9d90-42aa487d527a	2	c2f036e6-3822-460d-bef6-31a96b3b6f62
18196ba4-5a31-4d3f-a9d4-e3f0640a9674	3	c2f036e6-3822-460d-bef6-31a96b3b6f62
783a85d5-9b2a-4e04-b5d7-4f36dc644140	1	87a78c3d-faa0-4bdb-85b8-31d190401a2d
f0a0c48a-4865-4c2d-b18b-95d30f22ffcd	2	87a78c3d-faa0-4bdb-85b8-31d190401a2d
f97ff5d3-8959-40f6-a457-2c484e792955	3	87a78c3d-faa0-4bdb-85b8-31d190401a2d
2ddcc7d2-582d-40b3-bfe3-c2b4fc1e4d4d	1	fc4bec84-8c2c-4cdb-8545-11812b60e23c
\.


--
-- TOC entry 3386 (class 0 OID 37020)
-- Dependencies: 215
-- Data for Name: Seat; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Seat" (id, "seatNumber", "screenId") FROM stdin;
abb19511-2c31-4d6c-b2c1-b91aaacf3bcf	1	783a85d5-9b2a-4e04-b5d7-4f36dc644140
dd716dca-356c-4d79-9f48-673d0b10c462	2	783a85d5-9b2a-4e04-b5d7-4f36dc644140
8e88d51f-2f54-4627-b592-9b69ef4df5ba	3	783a85d5-9b2a-4e04-b5d7-4f36dc644140
\.


--
-- TOC entry 3388 (class 0 OID 37034)
-- Dependencies: 217
-- Data for Name: Show; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Show" (id, "screenId", "movieId", "availableUntilUtc", "showEndTimeInUtc", "showStartTimeInUtc") FROM stdin;
1666ce55-4e96-49c4-899a-b98f0eac866d	783a85d5-9b2a-4e04-b5d7-4f36dc644140	6c4fe7dc-7d5a-4f95-bcd6-b242997c7740	\N	1970-01-01 02:00:00	1970-01-01 00:00:00
3e432ee5-475c-43a8-af29-7fa9264a299a	783a85d5-9b2a-4e04-b5d7-4f36dc644140	6c4fe7dc-7d5a-4f95-bcd6-b242997c7740	\N	1970-01-01 14:00:00	1970-01-01 12:00:00
782b0237-ad89-4ece-ad08-53e5c11d2fcb	f90f7010-f23d-40c1-9d90-42aa487d527a	dbeb97b9-22d2-43f2-bcd0-8ecb9b4d2651	\N	1970-01-01 00:00:00	1970-01-01 00:00:00
ca78571d-0a2a-43bf-ae99-9c2c5acbf190	f0a0c48a-4865-4c2d-b18b-95d30f22ffcd	dbeb97b9-22d2-43f2-bcd0-8ecb9b4d2651	\N	1970-01-01 00:00:00	1970-01-01 00:00:00
31d542a5-fd3f-4c35-8f0f-1be604541413	f0a0c48a-4865-4c2d-b18b-95d30f22ffcd	188ed62b-883c-4289-9b11-9bb0c9d94ebd	\N	1970-01-01 00:00:00	1970-01-01 00:00:00
\.


--
-- TOC entry 3384 (class 0 OID 37006)
-- Dependencies: 213
-- Data for Name: Theatre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Theatre" (id, name, "numberOfScreens", "cityId") FROM stdin;
c2f036e6-3822-460d-bef6-31a96b3b6f62	Phoenix	3	bc96857e-047e-4a58-89ac-48dd4c05e1d4
87a78c3d-faa0-4bdb-85b8-31d190401a2d	Lulu	3	bc96857e-047e-4a58-89ac-48dd4c05e1d4
fc4bec84-8c2c-4cdb-8545-11812b60e23c	Inorbit	2	08bc14a5-9c3c-496a-9798-0c59ba7036fc
\.


--
-- TOC entry 3382 (class 0 OID 36991)
-- Dependencies: 211
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, "phoneNumber", "loggedInAtUTC", "cityId") FROM stdin;
0fd5a190-111c-45cc-b466-5cc75e82d452	Pranjal	pichu@gmail.com	8726837299	2022-08-11 10:47:33.941	bc96857e-047e-4a58-89ac-48dd4c05e1d4
\.


--
-- TOC entry 3380 (class 0 OID 36973)
-- Dependencies: 209
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
914e37db-4987-4d8d-923c-515329288569	426bd02b562659a8a61a05435c315dde7c1db1bd8ce038b2135190a38458d72e	2022-08-08 12:53:35.745043+05:30	20220808072335_initial_schema	\N	\N	2022-08-08 12:53:35.649703+05:30	1
\.


--
-- TOC entry 3213 (class 2606 OID 37005)
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- TOC entry 3228 (class 2606 OID 37054)
-- Name: BookedSeat BookedSeat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BookedSeat"
    ADD CONSTRAINT "BookedSeat_pkey" PRIMARY KEY (id);


--
-- TOC entry 3226 (class 2606 OID 37047)
-- Name: Booking Booking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_pkey" PRIMARY KEY (id);


--
-- TOC entry 3209 (class 2606 OID 36990)
-- Name: City City_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."City"
    ADD CONSTRAINT "City_pkey" PRIMARY KEY (id);


--
-- TOC entry 3222 (class 2606 OID 37033)
-- Name: Movie Movie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movie"
    ADD CONSTRAINT "Movie_pkey" PRIMARY KEY (id);


--
-- TOC entry 3218 (class 2606 OID 37019)
-- Name: Screen Screen_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Screen"
    ADD CONSTRAINT "Screen_pkey" PRIMARY KEY (id);


--
-- TOC entry 3220 (class 2606 OID 37026)
-- Name: Seat Seat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Seat"
    ADD CONSTRAINT "Seat_pkey" PRIMARY KEY (id);


--
-- TOC entry 3224 (class 2606 OID 37040)
-- Name: Show Show_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Show"
    ADD CONSTRAINT "Show_pkey" PRIMARY KEY (id);


--
-- TOC entry 3216 (class 2606 OID 37012)
-- Name: Theatre Theatre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Theatre"
    ADD CONSTRAINT "Theatre_pkey" PRIMARY KEY (id);


--
-- TOC entry 3211 (class 2606 OID 36998)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 3207 (class 2606 OID 36981)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3214 (class 1259 OID 37055)
-- Name: Account_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Account_username_key" ON public."Account" USING btree (username);


--
-- TOC entry 3230 (class 2606 OID 37061)
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3240 (class 2606 OID 37111)
-- Name: BookedSeat BookedSeat_bookingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BookedSeat"
    ADD CONSTRAINT "BookedSeat_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES public."Booking"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3238 (class 2606 OID 37101)
-- Name: BookedSeat BookedSeat_seatId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BookedSeat"
    ADD CONSTRAINT "BookedSeat_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES public."Seat"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3239 (class 2606 OID 37106)
-- Name: BookedSeat BookedSeat_showId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BookedSeat"
    ADD CONSTRAINT "BookedSeat_showId_fkey" FOREIGN KEY ("showId") REFERENCES public."Show"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3237 (class 2606 OID 37096)
-- Name: Booking Booking_showId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_showId_fkey" FOREIGN KEY ("showId") REFERENCES public."Show"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3236 (class 2606 OID 37091)
-- Name: Booking Booking_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3232 (class 2606 OID 37071)
-- Name: Screen Screen_theatreId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Screen"
    ADD CONSTRAINT "Screen_theatreId_fkey" FOREIGN KEY ("theatreId") REFERENCES public."Theatre"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3233 (class 2606 OID 37076)
-- Name: Seat Seat_screenId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Seat"
    ADD CONSTRAINT "Seat_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES public."Screen"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3235 (class 2606 OID 37086)
-- Name: Show Show_movieId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Show"
    ADD CONSTRAINT "Show_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES public."Movie"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3234 (class 2606 OID 37081)
-- Name: Show Show_screenId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Show"
    ADD CONSTRAINT "Show_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES public."Screen"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3231 (class 2606 OID 37066)
-- Name: Theatre Theatre_cityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Theatre"
    ADD CONSTRAINT "Theatre_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES public."City"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3229 (class 2606 OID 37056)
-- Name: User User_cityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES public."City"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


-- Completed on 2022-08-11 18:38:05

--
-- PostgreSQL database dump complete
--

