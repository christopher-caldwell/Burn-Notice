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

CREATE TYPE vacancy_status AS ENUM (
  'filled',
  'pending',
  'cancelled',
  'active'
);

CREATE TYPE transfer_request_status AS ENUM (
  'new',
  'denied',
  'accepted',
	'cancelled'
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
  "is_eligible_for_transfer" boolean DEFAULT true,
  "account_role" account_role,
	"last_transfer" date DEFAULT null
);

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
	"is_engine" boolean,
  "account" int not null REFERENCES account(id)
);

CREATE TABLE vacancy (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "fire_station" int NOT NULL REFERENCES fire_station(id),
  "is_engine" boolean,
  "is_temporary" boolean,
  "status" vacancy_status DEFAULT 'active',
  "post_date" date DEFAULT (now()),
  "fill_date" date DEFAULT null,
  "num_of_applicants" int DEFAULT 0,
  "notes" text
);

CREATE TABLE transfer_request (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "vacancy" int NOT NULL REFERENCES vacancy(id),
  "request_submitter" int NOT NULL REFERENCES account(id),
  "application_status" transfer_request_status DEFAULT 'new',
  "approving_authority" int DEFAULT null REFERENCES account(id),
  "sent_date" date DEFAULT (now()),
  "approval_date" date DEFAULT null
);

CREATE TABLE report (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "submitter" int NOT NULL REFERENCES account(id),
	"fire_station" int NOT NULL REFERENCES fire_station(id),
  "type_of_incident" type_of_incident,
  "created_at" date DEFAULT (now()),
  "time_dispatched" date DEFAULT (now()),
  "time_arrived" date DEFAULT (now()),
  "was_exposed_to_chem" boolean,
  "was_fire_retardant_present" boolean,
	"chemical_exposure_notes" text,
  "actions_of_primary_team" text,
  "actions_of_secondary_team" text,
  "description_of_event" text
);

CREATE TABLE report_to_account(
	"id" SERIAL PRIMARY KEY NOT NULL,
	"report" int NOT NULL REFERENCES report(id),
	"account" int NOT NULL REFERENCES account(id),
	"team" varchar
);

CREATE TABLE account_update (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"account" int NOT NULL REFERENCES account(id),
	"title" varchar,
	"table_name_of_update" varchar,
	"id_of_update_source" int,
	"is_actionable" boolean,
	"post_date" date DEFAULT (now())
);
