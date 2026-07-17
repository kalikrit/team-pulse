CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`completed` integer DEFAULT false,
	`created_at` text DEFAULT '2026-07-17T12:37:13.504Z'
);
