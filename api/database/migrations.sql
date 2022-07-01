
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE logs (
  -- required
	id SERIAL PRIMARY KEY,
  drone_generation INTEGER NOT NULL,
  start_time timestamp NOT NULL,

  end_time  timestamp NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,

  building_map_layout UUID NOT NULL,
  -- extras
	created_at timestamp DEFAULT now(),
  username TEXT
);

--
CREATE INDEX lat_idx ON logs (lat);
CREATE INDEX lng_idx ON logs (lng);
-- Lowercase comparison
CREATE INDEX username_idx ON logs ((lower(username)));