import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const SUPABASE_URL = "https://swtrpzarrbailwuuqhlb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3dHJwemFycmJhaWx3dXVxaGxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NDM2NjYsImV4cCI6MjA4MjMxOTY2Nn0.NmWcobfzhUWSGRlHDqDb4TjoO9bDazMEsCtF8XSN4_Q";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);