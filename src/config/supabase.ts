import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ghsuhoyzdlrlyxylqdfi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdoc3Vob3l6ZGxybHl4eWxxZGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MjM0MTUsImV4cCI6MjA1OTA5OTQxNX0.fc3qV5HfiQZjUUcc1azZTG3MRbrdhcl_1FioHxmeBCQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para os dados do formulário
export interface FormData {
  nome: string;
  email: string;
  telefone: string;
  created_at?: string;
} 