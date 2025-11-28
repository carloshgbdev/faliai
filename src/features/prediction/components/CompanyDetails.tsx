import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Input, Select } from "../../../components";
import { ToggleSwitch } from '../../../components/ToggleSwitch';
import { PredictionFormData } from "../types";

type CompanyDetailsProps = {
  isLoading: boolean;
  error: string | null;
  submitForPrediction: (formData: PredictionFormData) => void;
}

type IBGEState = {
  id: number;
  sigla: string;
  nome: string;
};

const FormItem = ({ label, children, error, className = '' }: { label: string; children: React.ReactNode; error?: string, className?: string }) => (
  <div className={`mb-4 ${className}`}>
    <label className="block text-sm font-medium text-text-muted mb-1">{label}</label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export const CompanyDetails = ({ isLoading, error, submitForPrediction }: CompanyDetailsProps) => {
  const [formData, setFormData] = useState<PredictionFormData>({
    tempo_atividade_anos: 0,
    total_debito: 0,
    mudou_situacao: false,
    tem_debito_governo: false,
    tem_acao_judicial: false,
    cnae_fiscal_principal: '',
    uf: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [states, setStates] = useState<IBGEState[]>([]);
  const [isFetchingStates, setIsFetchingStates] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setIsFetchingStates(true);
        const response = await axios.get<IBGEState[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
        setStates(response.data);
        setFetchError(null);
      } catch (error) {
        setFetchError('Não foi possível carregar a lista de estados.');
        console.error(error);
      } finally {
        setIsFetchingStates(false);
      }
    };
    fetchStates();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (formData.tempo_atividade_anos <= 0) newErrors.tempo_atividade_anos = 'Tempo de atividade deve ser maior que zero.';
    if (formData.total_debito <= 0) newErrors.total_debito = 'Total de débito deve ser maior que zero.';
    if (!formData.cnae_fiscal_principal) newErrors.cnae_fiscal_principal = 'CNAE é obrigatório.';
    if (!formData.uf) newErrors.uf = 'UF é obrigatório.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      submitForPrediction(formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'tempo_atividade_anos' || name === 'total_debito' ? parseFloat(value) : value }));
  };

  const handleToggleChange = (name: keyof PredictionFormData, value: boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="max-w-4xl mx-auto w-full">
      <div className="text-center mb-6 border-b border-border pb-4">
        <h2 className="text-3xl font-bold text-text-main">Dados para Predição</h2>
        <p className="text-text-muted mt-2">Preencha os dados para descobrir se você é gatinho ou leão...</p>
      </div>
      
      <div className="grid grid-cols-6 gap-x-6">
        <FormItem label="Tempo de Atividade (Anos)" error={errors.tempo_atividade_anos} className="col-span-6 md:col-span-2">
            <Input type="number" name="tempo_atividade_anos" value={formData.tempo_atividade_anos} onChange={handleInputChange} />
        </FormItem>
        <FormItem label="Total de Débito" error={errors.total_debito} className="col-span-6 md:col-span-2">
            <Input type="number" name="total_debito" value={formData.total_debito} onChange={handleInputChange} className="no-spinner" />
        </FormItem>
         <FormItem label="CNAE" error={errors.cnae_fiscal_principal} className="col-span-3 md:col-span-1">
            <Input name="cnae_fiscal_principal" value={formData.cnae_fiscal_principal} onChange={handleInputChange} />
        </FormItem>
        <FormItem label="UF" error={errors.uf} className="col-span-3 md:col-span-1">
            <Select name="uf" value={formData.uf} onChange={handleInputChange} disabled={isFetchingStates}>
              <option value="">{isFetchingStates ? 'Carregando...' : 'Selecione...'}</option>
              {states.map(state => <option key={state.id} value={state.sigla}>{state.sigla}</option>)}
            </Select>
            {fetchError && <p className="text-red-500 text-xs mt-1">{fetchError}</p>}
        </FormItem>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mt-8 pt-6 border-t border-border">
        <ToggleSwitch label="Mudou de Situação?" enabled={formData.mudou_situacao} onChange={(val) => handleToggleChange('mudou_situacao', val)} />
        <ToggleSwitch label="Débito com Governo?" enabled={formData.tem_debito_governo} onChange={(val) => handleToggleChange('tem_debito_governo', val)} />
        <ToggleSwitch label="Ação Judicial?" enabled={formData.tem_acao_judicial} onChange={(val) => handleToggleChange('tem_acao_judicial', val)} />
      </div>


      <Button
        onClick={handleSubmit}
        className="w-full mt-8"
        disabled={isLoading || isFetchingStates}
      >
        {isLoading ? 'Prevendo o futuro...' : 'E aí? Pronto para descobrir se vai virar uber?'}
      </Button>
      {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
    </Card>
  );
};
