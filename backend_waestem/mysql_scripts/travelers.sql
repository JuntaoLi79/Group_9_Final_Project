USE u408394733_waestem;
SELECT * FROM u408394733_waestem.travelers;
SELECT COLUMN_NAME, DATA_TYPE from INFORMATION_SCHEMA.COLUMNS where table_schema = 'u408394733_waestem' and table_name = 'travelers';
INSERT INTO travelers (id, name, img, email) VALUES (1, 'John Doe', 'https://picsum.photos/200/300', 'johndoe@example.com');
SELECT * FROM u408394733_waestem.travelers;
ALTER TABLE travelers ADD UNIQUE (email);
-- -------------------------------------
CREATE TABLE posts (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  image LONGBLOB,
  PRIMARY KEY (id)
);
SELECT * FROM u408394733_waestem.posts;
DELETE FROM u408394733_waestem.posts
WHERE id = 1;