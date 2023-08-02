-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 02 Agu 2023 pada 05.20
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_guest_book`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `guest_entries`
--

CREATE TABLE `guest_entries` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `id_card_number` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `guest_entries`
--

INSERT INTO `guest_entries` (`id`, `name`, `date_of_birth`, `email`, `id_card_number`, `created_at`) VALUES
(21, 'User 1', '2023-08-10', 'user1@gmail.com', 123456543, '2023-08-02 10:10:36'),
(22, 'User 2', '2023-08-02', 'user2@gmail.com', 654323456, '2023-08-02 10:11:03'),
(23, 'User 3', '2023-08-02', 'user3@gmail.com', 6543234567, '2023-08-02 10:11:21'),
(24, 'User 4', '2005-01-03', 'user4@gmail.com', 12345676543, '2023-08-02 10:11:48'),
(25, 'User 5', '1998-06-25', 'user5@gmail.com', 5432345654345, '2023-08-02 10:12:25');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
