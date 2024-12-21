/*
  # Add Features and Use Cases to Agents

  1. New Columns
    - `features`: JSONB array of feature objects (title, description)
    - `use_cases`: Array of use case strings
    
  2. Changes
    - Add JSONB column for features with validation function
    - Add text array column for use cases
    - Add trigger to validate features structure on insert/update
*/

-- Create function to validate features structure
CREATE OR REPLACE FUNCTION validate_features(features_data JSONB)
RETURNS BOOLEAN AS $$
DECLARE
  feature_item JSONB;
BEGIN
  -- Check if features is NULL (allowed) or an array
  IF features_data IS NULL OR jsonb_typeof(features_data) = 'array' THEN
    -- For non-null values, validate each feature object
    IF features_data IS NOT NULL THEN
      -- Check each element in the array
      FOR feature_item IN 
        SELECT jsonb_array_elements(features_data)
      LOOP
        -- Verify feature has required fields with correct types
        IF jsonb_typeof(feature_item->'title') != 'string' OR
           jsonb_typeof(feature_item->'description') != 'string' THEN
          RETURN FALSE;
        END IF;
      END LOOP;
    END IF;
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Add new columns
ALTER TABLE agents
ADD COLUMN features JSONB,
ADD COLUMN use_cases TEXT[];

-- Add validation for features using the function
ALTER TABLE agents
ADD CONSTRAINT valid_features 
  CHECK (validate_features(features));

-- Create trigger function to ensure features array elements are valid
CREATE OR REPLACE FUNCTION validate_features_trigger()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT validate_features(NEW.features) THEN
    RAISE EXCEPTION 'Invalid features structure. Each feature must have title and description as strings.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for validation
CREATE TRIGGER validate_features_on_change
  BEFORE INSERT OR UPDATE ON agents
  FOR EACH ROW
  EXECUTE FUNCTION validate_features_trigger();

-- Add comment explaining the structure
COMMENT ON COLUMN agents.features IS 'Array of feature objects with title and description fields';
COMMENT ON COLUMN agents.use_cases IS 'Array of use case strings';