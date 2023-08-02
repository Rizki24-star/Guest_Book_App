# Guest_Book_App
Techincal Test IT Web Platform Developer Intern MSIB Batch 5 - Aksesmu

Client : React JS,
Server : Node JS,
Database : MySQL

How to run the App :Q
- create a database with the name "db_guest_book" on your phpmyadmin

and you can import this query (also available on the project with file name db_guest_book.sql) : 

CREATE TABLE `guest_entries` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `id_card_number` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `guest_entries` (`id`, `name`, `date_of_birth`, `email`, `id_card_number`, `created_at`) VALUES
(21, 'User 1', '2023-08-10', 'user1@gmail.com', 123456543, '2023-08-02 10:10:36'),
(22, 'User 2', '2023-08-02', 'user2@gmail.com', 654323456, '2023-08-02 10:11:03'),
(23, 'User 3', '2023-08-02', 'user3@gmail.com', 6543234567, '2023-08-02 10:11:21'),
(24, 'User 4', '2005-01-03', 'user4@gmail.com', 12345676543, '2023-08-02 10:11:48'),
(25, 'User 5', '1998-06-25', 'user5@gmail.com', 5432345654345, '2023-08-02 10:12:25');

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indeks untuk tabel `guest_entries`
--
ALTER TABLE `guest_entries`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE_EMAIL` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `guest_entries`
--
ALTER TABLE `guest_entries`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;
COMMIT;

-- Running Clinet 
- npm install
- npm start 


-- Running Server : 
- npm install
- npm start (default port is 8800)
