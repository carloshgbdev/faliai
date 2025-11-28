export interface CompanyData {
  cnpj: string;
  razaoSocial: string;
  capitalSocial: number;
  porteEmpresa: string;
  pais: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  uf: string;
  municipio: string;
}

export type Prediction = 0 | 1;

export interface PredictionFormData {
  tempo_atividade_anos: number;
  total_debito: number;
  mudou_situacao: boolean;
  tem_debito_governo: boolean;
  tem_acao_judicial: boolean;
  cnae_fiscal_principal: string;
  uf: string;
}
