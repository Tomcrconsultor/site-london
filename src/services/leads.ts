import { supabase } from '../config/supabase';

export interface FormData {
  nome: string;
  email: string;
  telefone: string;
}

export async function saveLead(data: FormData) {
  console.log('Iniciando salvamento do lead:', data);
  
  try {
    const { data: result, error } = await supabase
      .from('leads')
      .insert([data])
      .select();

    if (error) {
      console.error('Erro ao salvar lead no Supabase:', error);
      throw new Error(`Erro ao salvar seus dados: ${error.message}`);
    }

    console.log('Lead salvo com sucesso:', result);
    return { success: true, data: result };
    
  } catch (error) {
    console.error('Erro inesperado ao salvar lead:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Ocorreu um erro inesperado ao salvar seus dados');
  }
} 