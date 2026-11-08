CREATE TABLE agents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  model TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'in-treatment', 'recovered')),
  complaint TEXT NOT NULL
);
