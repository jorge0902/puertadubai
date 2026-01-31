-- Migration V2: Simplify Schema & Match Tally Questions
-- Run this in Supabase SQL Editor

-- 1. Remove obsolete column
ALTER TABLE leads_isabel 
DROP COLUMN IF EXISTS profesion;

-- 2. Add new columns based on Tally questions
ALTER TABLE leads_isabel
ADD COLUMN IF NOT EXISTS proximidad_viaje text,
ADD COLUMN IF NOT EXISTS pasaporte text,
ADD COLUMN IF NOT EXISTS presupuesto text,
ADD COLUMN IF NOT EXISTS meta_principal text,
ADD COLUMN IF NOT EXISTS contacto_personal text,
ADD COLUMN IF NOT EXISTS es_vip boolean DEFAULT false;

-- 3. Comments for clarity
COMMENT ON COLUMN leads_isabel.proximidad_viaje IS 'From: ¿Qué tan cerca estás hoy de Dubái?';
COMMENT ON COLUMN leads_isabel.pasaporte IS 'From: ¿Tienes tu pasaporte vigente?';
COMMENT ON COLUMN leads_isabel.presupuesto IS 'From: ¿Con qué presupuesto inicial cuentas?';
COMMENT ON COLUMN leads_isabel.meta_principal IS 'From: ¿Cuál es tu meta principal?';
COMMENT ON COLUMN leads_isabel.contacto_personal IS 'From: ¿Te gustaría que Isabel te contacte?';
