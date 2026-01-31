-- Migration V3: Refine Columns for Custom Form (Exact Match)
-- Run this in Supabase SQL Editor to align with LeadForm.tsx

-- 1. Rename columns (if they exist from V2, otherwise we create them)
DO $$
BEGIN
  IF EXISTS(SELECT * FROM information_schema.columns WHERE table_name = 'leads_isabel' AND column_name = 'pasaporte') THEN
      ALTER TABLE leads_isabel RENAME COLUMN pasaporte TO pasaporte_ok;
  END IF;
  
  IF EXISTS(SELECT * FROM information_schema.columns WHERE table_name = 'leads_isabel' AND column_name = 'presupuesto') THEN
      ALTER TABLE leads_isabel RENAME COLUMN presupuesto TO presupuesto_rango;
  END IF;

  IF EXISTS(SELECT * FROM information_schema.columns WHERE table_name = 'leads_isabel' AND column_name = 'meta_principal') THEN
      ALTER TABLE leads_isabel RENAME COLUMN meta_principal TO meta_viaje;
  END IF;

  IF EXISTS(SELECT * FROM information_schema.columns WHERE table_name = 'leads_isabel' AND column_name = 'contacto_personal') THEN
      ALTER TABLE leads_isabel RENAME COLUMN contacto_personal TO interes_contacto;
  END IF;
END $$;

-- 2. Ensure all V3 columns exist (Idempotent)
ALTER TABLE leads_isabel
ADD COLUMN IF NOT EXISTS proximidad_viaje text,
ADD COLUMN IF NOT EXISTS pasaporte_ok text,
ADD COLUMN IF NOT EXISTS presupuesto_rango text,
ADD COLUMN IF NOT EXISTS meta_viaje text,
ADD COLUMN IF NOT EXISTS interes_contacto text,
ADD COLUMN IF NOT EXISTS es_vip boolean DEFAULT false;

-- 3. Comments (Metadata)
COMMENT ON COLUMN leads_isabel.proximidad_viaje IS 'Q1: Filtro de Tiempo';
COMMENT ON COLUMN leads_isabel.pasaporte_ok IS 'Q2: Filtro Legal';
COMMENT ON COLUMN leads_isabel.presupuesto_rango IS 'Q3: Filtro de Solvencia';
COMMENT ON COLUMN leads_isabel.meta_viaje IS 'Q4: Motivación';
COMMENT ON COLUMN leads_isabel.interes_contacto IS 'Q6: Consentimiento Cierre';
