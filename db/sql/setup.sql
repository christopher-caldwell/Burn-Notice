CREATE TYPE account_role AS ENUM (
  'captain',
  'chief',
  'fire_fighter'
);

CREATE TYPE type_of_incident AS ENUM (
  'fire',
  'medical',
  'building'
);
CREATE TABLE account (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "sap" int unique,
  "email" varchar,
  "phone" varchar,
  "created_at" date DEFAULT (now()),
  "last_logged_in_at" date DEFAULT null,
  "first_name" varchar,
  "last_name" varchar,
  "password" varchar,
  "account_role" account_role
);

-- CREATE TABLE team (
--   "id" SERIAL PRIMARY KEY NOT NULL,
--   "leader" int NOT NULL REFERENCES account(id),
--   "name" varchar
-- );

CREATE TABLE district (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "chief" int NOT NULL REFERENCES account(id),
  "name" varchar
);

CREATE TABLE fire_station (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "district" int NOT NULL REFERENCES district(id),
  "captain" int NOT NULL REFERENCES account(id),
  "name" varchar
);

CREATE TABLE assignment (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "start_date" date DEFAULT (now()),
  "end_date" date DEFAULT null,
  "assigned_station" int NOT NULL REFERENCES fire_station(id),
  "account" int not null REFERENCES account(id)
);

CREATE TABLE vacancy (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "station" int NOT NULL REFERENCES fire_station(id),
  "is_engine" boolean,
  "is_temporary" boolean,
  "post_date" date DEFAULT (now()),
  "fill_date" date DEFAULT null
);

CREATE TABLE transfer_request (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "vacancy" int NOT NULL REFERENCES vacancy(id),
  "request_submitter" int NOT NULL REFERENCES account(id),
  "application_status" varchar DEFAULT 'new',
  "approving_authority" int DEFAULT null REFERENCES account(id),
  "sent_date" date DEFAULT (now()),
  "approval_date" date DEFAULT null
);

CREATE TABLE report (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "submitter" int NOT NULL REFERENCES account(id),
  "type_of_incident" type_of_incident,
  "created_at" date DEFAULT (now()),
  "time_dispatched" date DEFAULT (now()),
  "time_arrived" date DEFAULT (now()),
  "was_exposed_to_chem" boolean,
  "was_fire_retardant_present" boolean,
  "actions_of_primary_team" text,
  "actions_of_secondary_team" text,
  "description_of_events" text,
  "team_one_members" int[],
  "team_two_members" int[]
);
