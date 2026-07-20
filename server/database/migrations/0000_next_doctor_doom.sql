CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`priority` text DEFAULT 'medium',
	`deadline` text,
	`completed` integer DEFAULT false,
	`created_at` text DEFAULT '2026-07-20T14:55:44.214Z'
);
