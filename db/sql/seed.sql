
INSERT INTO account (sap, email, phone, first_name, last_name, account_role)
  VALUES
   (123456, 'mail@mail.com', '(123) 456-2345)', 'Jim', 'Bob', 'fire_fighter'), --1
   (923456, 'mail@mail.com', '(123) 456-2345)', 'Christopher', 'Wallace', 'fire_fighter'), --2
   (423456, 'mail@mail.com', '(123) 456-2345)', 'Jermaine', 'Cole', 'fire_fighter'), --3
   (123457, 'mail@mail.com', '(123) 456-2345)', 'Chief', 'Jimmy', 'chief'), --4
   (233157, 'mail@mail.com', '(123) 456-2345)', 'Captain', 'Spongebob', 'captain'), --5
   (231157, 'mail@mail.com', '(123) 456-2345)', 'Captain', 'Snaggle-Tooth', 'captain'); --6

-- INSERT INTO team (leader, name)
--   VALUES
--    (1, 'Blue Team');

INSERT INTO district (chief, name)
  VALUES
   (4, 'District 14');
   
INSERT INTO fire_station (district, captain, name)
  VALUES
   (1, 5, 'Bandera'),
   (1, 6, 'Stone Oak');

INSERT INTO assignment (assigned_station, account)
  VALUES
   (2, 2);

INSERT INTO vacancy (station, is_engine, is_temporary)
  VALUES
   (2, true, false);

INSERT INTO transfer_request (vacancy, request_submitter)
  VALUES
   (1, 2);

INSERT INTO report (submitter, type_of_incident, was_exposed_to_chem, was_fire_retardant_present, actions_of_primary_team, actions_of_secondary_team, 
description_of_events, team_one_members, team_two_members)
  VALUES
   (1, 'fire', true, false, 'Excellent show of fire fighting', 'Eh, they suck', 'Big fire', '{1,2,3}', '{6,5}');
   
