USE u408394733_waestem;
SELECT * FROM u408394733_waestem.travelers;
SELECT COLUMN_NAME, DATA_TYPE from INFORMATION_SCHEMA.COLUMNS where table_schema = 'u408394733_waestem' and table_name = 'travelers';
INSERT INTO travelers (id, name, img, email) VALUES (1, 'John Doe', 'https://example.com/img.jpg', 'johndoe@example.com');
SELECT * FROM u408394733_waestem.travelers;