import { useState } from 'react';
import { CompanyData, Prediction } from '../types';
import { formatCNPJ } from '../../../utils/format';

// Tipos de estado da UI
export type PredictionStep = 'form' | 'details' | 'result';

// URLs (vazias conforme solicitado)
const GET_COMPANY_DATA_URL = '';
const GET_PREDICTION_URL = '';

export const usePrediction = () => {
  const [step, setStep] = useState<PredictionStep>('form');
  const [cnpj, setCnpj] = useState('');
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCnpj(formatCNPJ(e.target.value));
  };

  const submitCnpj = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simula a chamada de API para obter dados da empresa
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockData: CompanyData = {
        cnpj: cnpj,
        razaoSocial: 'FALI AI CONSULTORIA FICTICIA LTDA',
        capitalSocial: 1000000,
        porteEmpresa: 'EMPRESA DE PEQUENO PORTE',
        pais: 'BRASIL',
        logradouro: 'AVENIDA DOS AUTONOMISTAS',
        numero: '900',
        complemento: 'TORRE 1 ANDAR 10',
        bairro: 'VILA YARA',
        cep: '06020-012',
        uf: 'SP',
        municipio: 'OSASCO',
      };
      setCompanyData(mockData);
      setStep('details');
    } catch (err) {
      setError('Não foi possível buscar os dados da empresa. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const submitForPrediction = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simula a chamada de API para obter a predição
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockPrediction: Prediction = Math.random() > 0.5 ? 1 : 0;
      setPrediction(mockPrediction);
      setStep('result');
    } catch (err) {
      setError('Não foi possível obter a predição. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setStep('form');
    setCnpj('');
    setCompanyData(null);
    setPrediction(null);
    setError(null);
  };

  return {
    step,
    cnpj,
    companyData,
    prediction,
    isLoading,
    error,
    handleCnpjChange,
    submitCnpj,
    submitForPrediction,
    reset,
  };
};
