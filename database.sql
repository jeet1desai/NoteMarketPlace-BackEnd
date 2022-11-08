CREATE TABLE Users(
	ID SERIAL primary key,
 	RoleID int not null,
	FirstName varchar(50) not null,
	LastName varchar(50) not null,
	Email varchar(100) not null unique,
	Password varchar(24) not null,
	IsEmailVerified Boolean not null default false,
	DOB TIMESTAMP,
	Gender varchar(10),
	PhoneCountryCode varchar(5),
	PhoneNumber varchar(10),
	ProfilePicture varchar(500),
	AddressLine1 varchar(100),
	AddressLine2 varchar(100),
	City varchar(50),
	State varchar(50),
	ZipCode varchar(50),
	Country  varchar(50),
	University varchar(100),
	College varchar(100),
	CreatedDate TIMESTAMP,
	CreatedBy int,
	ModifiedDate TIMESTAMP,
	ModifiedBy int,
	IsActive Boolean not null default true,
	CONSTRAINT fk_created_by FOREIGN KEY(CreatedBy) REFERENCES Users(ID),
	CONSTRAINT fk_modified_by FOREIGN KEY(ModifiedBy) REFERENCES Users(ID)
)

CREATE TABLE Countries(
	ID SERIAL primary key,
	Name varchar(100) not null unique,
	CountryCode varchar(100) not null unique,
	CreatedDate TIMESTAMP,
	CreatedBy int,
	ModifiedDate TIMESTAMP,
	ModifiedBy int,
	IsActive Boolean not null default true,
	CONSTRAINT fk_created_by FOREIGN KEY(CreatedBy) REFERENCES Users(ID),
	CONSTRAINT fk_modified_by FOREIGN KEY(ModifiedBy) REFERENCES Users(ID)
)

CREATE TABLE NoteCategories(
	ID SERIAL primary key,
	Name varchar(100) unique not null,
	Description varchar(255) not null,
	CreatedDate TIMESTAMP,
	CreatedBy int,
	ModifiedDate TIMESTAMP,
	ModifiedBy int,
	IsActive Boolean not null default true,
	CONSTRAINT fk_created_by FOREIGN KEY(CreatedBy) REFERENCES Users(ID),
	CONSTRAINT fk_modified_by FOREIGN KEY(ModifiedBy) REFERENCES Users(ID)
)

CREATE TABLE NoteTypes(
	ID SERIAL primary key,
	Name varchar(100) unique not null,
	Description varchar(255) not null,
	CreatedDate TIMESTAMP,
	CreatedBy int,
	ModifiedDate TIMESTAMP,
	ModifiedBy int,
	IsActive Boolean not null default true,
	CONSTRAINT fk_created_by FOREIGN KEY(CreatedBy) REFERENCES Users(ID),
	CONSTRAINT fk_modified_by FOREIGN KEY(ModifiedBy) REFERENCES Users(ID)
)

CREATE TABLE SellerNotes(
	ID SERIAL primary key,
	AdminRemarks varchar(255),
	PublishedDate TIMESTAMP,
	Title varchar(100) not null,
	DisplayPicture varchar(500),
	NumberofPages int,
	Description varchar(255) not null,
	UniversityName varchar(200),
	Course varchar(100),
	CourseCode varchar(100),
	Professor varchar(100),
	IsPaid Boolean not null,
	SellingPrice Numeric,
	Status varchar(20) not null,
	NotesPreview varchar(255),
	FileName varchar(100) not null,
	File varchar(255) not null,
	FileSize varchar(25) not null,
	Country int,
	NoteType int,
	Category int not null,
	SellerID int not null,
	ActionedBy int,
	CreatedDate TIMESTAMP,
	CreatedBy int,
	ModifiedDate TIMESTAMP,
	ModifiedBy int,
	IsActive Boolean not null default true,
	CONSTRAINT fk_country FOREIGN KEY(Country) REFERENCES Countries(ID),
	CONSTRAINT fk_note_type FOREIGN KEY(NoteType) REFERENCES NoteTypes(ID),
	CONSTRAINT fk_category FOREIGN KEY(Category) REFERENCES NoteCategories(ID),
	CONSTRAINT fk_seller_id FOREIGN KEY(SellerID) REFERENCES Users(ID),
	CONSTRAINT fk_action_by FOREIGN KEY(ActionedBy) REFERENCES Users(ID),
	CONSTRAINT fk_created_by FOREIGN KEY(CreatedBy) REFERENCES Users(ID),
	CONSTRAINT fk_modified_by FOREIGN KEY(ModifiedBy) REFERENCES Users(ID)
)

CREATE TABLE Downloads(
	ID SERIAL primary key,
	NoteID int not null,
	Seller int not null,
	Downloader int not null,
	IsSellerHasAllowedDownload Boolean not null,
	AttachmentPath varchar(255),
	IsAttachmentDownloaded Boolean not null,
	AttachmentDownloadedDate TIMESTAMP,
	IsPaid Boolean not null,
	PurchasedPrice Numeric,
	NoteTitle varchar(100) not null,
	NoteCategory varchar(100) not null,
	CreatedDate TIMESTAMP,
	CreatedBy int,
	ModifiedDate TIMESTAMP,
	ModifiedBy int,
	CONSTRAINT fk_downloader_id FOREIGN KEY(Downloader) REFERENCES Users(ID),
	CONSTRAINT fk_seller FOREIGN KEY(Seller) REFERENCES Users(ID),
	CONSTRAINT fk_note_id FOREIGN KEY(NoteID) REFERENCES SellerNotes(ID),
	CONSTRAINT fk_created_by FOREIGN KEY(CreatedBy) REFERENCES Users(ID),
	CONSTRAINT fk_modified_by FOREIGN KEY(ModifiedBy) REFERENCES Users(ID)
)

CREATE TABLE SellerNotesReviews(
	ID SERIAL primary key,
	NoteID int not null,
	ReviewedByID int not null,
	AgainstDownloadsID int not null,
	Ratings Numeric not null,
	Comments varchar(255) not null,
	CreatedDate TIMESTAMP,
	CreatedBy int,
	ModifiedDate TIMESTAMP,
	ModifiedBy int,
	IsActive Boolean not null default true,
	CONSTRAINT fk_review_id FOREIGN KEY(ReviewedByID) REFERENCES Users(ID),
	CONSTRAINT fk_download_id FOREIGN KEY(AgainstDownloadsID) REFERENCES Downloads(ID),
	CONSTRAINT fk_note_id FOREIGN KEY(NoteID) REFERENCES SellerNotes(ID),
	CONSTRAINT fk_created_by FOREIGN KEY(CreatedBy) REFERENCES Users(ID),
	CONSTRAINT fk_modified_by FOREIGN KEY(ModifiedBy) REFERENCES Users(ID)
)

CREATE TABLE SellerNotesReportedIssues(
	ID SERIAL primary key,
	NoteID int not null,
	ReportedByID int not null,
	AgainstDownloadID int not null,
	Remarks varchar(255) not null,
	CreatedDate TIMESTAMP,
	CreatedBy int,
	ModifiedDate TIMESTAMP,
	ModifiedBy int,
	CONSTRAINT fk_reporter_id FOREIGN KEY(ReportedByID) REFERENCES Users(ID),
	CONSTRAINT fk_download_id FOREIGN KEY(AgainstDownloadsID) REFERENCES Downloads(ID),
	CONSTRAINT fk_note_id FOREIGN KEY(NoteID) REFERENCES SellerNotes(ID),
	CONSTRAINT fk_created_by FOREIGN KEY(CreatedBy) REFERENCES Users(ID),
	CONSTRAINT fk_modified_by FOREIGN KEY(ModifiedBy) REFERENCES Users(ID)
)

CREATE TABLE SystemConfigurations(
	ID SERIAL primary key,
	Email varchar(100) not null,
	PhoneNumber varchar(15) not null,
	ProfilePicture varchar(255),
	NotePicture varchar(255),
	FacebookURL varchar(255),
	TwitterURL varchar(255),
	LinkedInURL varchar(255),
	CreatedDate TIMESTAMP,
	CreatedBy int,
	ModifiedDate TIMESTAMP,
	ModifiedBy int,
	IsActive Boolean not null default true,
	CONSTRAINT fk_created_by FOREIGN KEY(CreatedBy) REFERENCES Users(ID),
	CONSTRAINT fk_modified_by FOREIGN KEY(ModifiedBy) REFERENCES Users(ID)
)

SELECT * FROM users WHERE email = 'email'

DELETE FROM users WHERE id = 4;

INSERT INTO users() VALUES() RETURNING *