-- Migration to add columns for Tally integration
-- Run this in the Supabase SQL Editor

ALTER TABLE leads_isabel
ADD COLUMN IF NOT EXISTS profesion text,
ADD COLUMN IF NOT EXISTS pasaporte text,
ADD COLUMN IF NOT EXISTS presupuesto text,
ADD COLUMN IF NOT EXISTS objetivo_viaje text,
ADD COLUMN IF NOT EXISTS es_vip boolean DEFAULT false;

-- Add a comment or check
COMMENT ON COLUMN leads_isabel.es_vip IS 'Automatically set to TRUE if budget > $4,000';
