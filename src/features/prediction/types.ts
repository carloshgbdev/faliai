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
