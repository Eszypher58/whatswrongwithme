USE whatswrongwithmeTEST_db;

INSERT INTO Users 
	(firstName, lastName, dob, city, state, imgUrl, googleId, token, email, docPatient)
	VALUES
	("doctortest", "user1", "12/1/2010", "Los Angeles", "CA", "http://www.fillmurray.com/200/200", "1234567890", "token120983", "email1@email.com", 1),
	("patienttest", "user2", "12/2/2010", "Los Angeles", "CA", "http://www.fillmurray.com/200/200", "0987654321", "token123457869", "email2@email.com", 0),
	("doctorsecondtest", "user3", "12/3/2010", "New Orleans", "LA", "http://www.fillmurray.com/150/150", "2345768190", "tokenrandom0913847", "email3@email.com", 1),
	("patientsecondtest", "user4", "12/4/2010", "New Orleans", "LA", "http://www.fillmurray.com/150/200", "4567298347", "tokennewrandom298347", "email4@email.com", 0),
	("patientthirdtest", "user5", "12/5/2010", "Nowhere", "WA", "http://www.fillmurray.com/200/150", "239487583", "tokentoken092384", "email5@email.com", 0);

	INSERT INTO Doctors
		(specialization, betterDoctorId, UserId)
		VALUES
		("pediatrics", "12345", 1),
		("cardiology", "234987", 3);

		INSERT INTO Patients (biography, insuranceProvider, insuranceType, DoctorId, UserId)
			VALUES
			("test biography", "Aetna", "localInsurance", 1, 2),
			("second test biography", "Blue Cross", "crappyInsurance", 2, 4),
			("third test biography", "Local Insurance", "worthless", 2, 5);

			INSERT INTO Media (filename, location, PatientId)
				VALUES
				("10-10-2017.wav", "/files/users", 1),
				("10-11-2017.wav", "/files/users", 1),
				("10-12-2017.wav", "/files/users", 2),
				("10-13-2017.wav", "/files/users", 3);

				INSERT INTO MedicalCharts (comment, isDrComment, PatientId, DoctorId, MediumId)
				VALUES
				("test comment about 10-10-2017", 1, 1, 1, 1),
				("test comment about 10-11-2017", 0, 1, 1, 2),
				("test comment about no file", 1, 1, 1, NULL),
				("test comment about 10-12-2017", 1, 2, 2, 3),
				("test comment about 10-13-2017", 0, 3, 2, 4);