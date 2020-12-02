create database moumzip;

/* user */
create table user(
  user_id  varchar(20) not null ,
  password varchar(20) not null,
  name varchar(20) not null,
  nickname varchar(20),
  primary key(user_id)
);

insert into moumzip.user (user_id, password, name) values ("admin2","12345","jihyun2");


/* wording */
create table wording(
  wording_id int AUTO_INCREMENT  not null,
  user_id varchar(20)  not null,
  bookname varchar(20) not null,
  page int,
  content longtext,
  date datetime not null default NOW(),
  primary key(wording_id),
  foreign key(user_id) references user(user_id);
);

insert into moumzip.user (user_id, bookname, cotent) values (,"admin","book is fun", "this is content");