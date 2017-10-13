USE whatswrongwithmeTEST_db;

CREATE TABLE Doctors (
	id INT NOT NULL AUTO_INCREMENT,
	specialization VARCHAR(255),
	betterDoctorId VARCHAR(255),
	isActive TINYINT,
	createdAt DATETIME,
	updatedAt DATETIME,
	UserId INT,
	PRIMARY KEY(id)
);

CREATE TABLE Media (
	id INT NOT NULL AUTO_INCREMENT,
	filename VARCHAR(255),
	location VARCHAR(255),
	isActive TINYINT,
	createdAt DATETIME,
	updatedAt DATETIME,
	PatientId INT,
	PRIMARY KEY(id)
);

CREATE TABLE MedicalCharts (
	id INT NOT NULL AUTO_INCREMENT,
	comment TEXT,
	isDrComment TINYINT,
	isActive TINYINT,
	createdAt DATETIME,
	updatedAt DATETIME,
	PatientId INT,
	DoctorId INT,
	MediumId INT,
	PRIMARY KEY(id)
);

CREATE TABLE Patients (
	id INT NOT NULL AUTO_INCREMENT,
	biography TEXT,
	insuranceProvider VARCHAR(255),
	insuranceType VARCHAR(255),
	isActive TINYINT,
	createdAt DATETIME,
	updatedAt DATETIME,
	DoctorId INT,
	UserId INT,
	PRIMARY KEY(id)
);

CREATE TABLE Users (
	id INT NOT NULL AUTO_INCREMENT,
	firstName VARCHAR(255),
	lastName VARCHAR(255),
	dob DATETIME,
	city VARCHAR(255),
	state VARCHAR(255),
	imgUrl VARCHAR(255),
	googleId VARCHAR(255),
	token TEXT,
	email VARCHAR(255),
	docPatient TINYINT,
	isActive TINYINT,
	createdAt DATETIME,
	updatedAt DATETIME,
	PRIMARY KEY(id)
);