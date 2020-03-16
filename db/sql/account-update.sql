INSERT INTO account_update(account, title, table_name_of_update, id_of_update_source, is_actionable)
	VALUES
		(7, 'Your Transfer Request was Approved.', 'transfer_request', 1, false);

INSERT INTO assignment (assigned_station, account, is_engine)
  VALUES
   (2, 7, true);

INSERT INTO assignment (assigned_station, account, is_engine, start_date, end_date) 
	VALUES 
		(1, 7, true, '2017-03-21', '2020-02-07');
