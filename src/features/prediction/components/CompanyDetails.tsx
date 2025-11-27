import { Button, Card } from "../../../components";
import { formatCurrency } from "../../../utils/format";
import { CompanyData } from "../types";

type CompanyDetailsProps = {
  data: CompanyData;
  isLoading: boolean;
  error: string | null;
  submitForPrediction: () => void;
}

const DetailItem = ({ label, value }: { label: string; value?: string | number }) => (
  <div>
    <p className="text-sm font-medium text-text-muted">{label}</p>
    <p className="text-lg text-text-main">{value || 'N/A'}</p>
  </div>
);

export const CompanyDetails = ({ data, isLoading, error, submitForPrediction }: CompanyDetailsProps) => {
  return (
    <Card className="max-w-3xl mx-auto w-full">
      <h2 className="text-3xl font-bold text-text-main mb-6 border-b border-border pb-4">Dados da Empresa</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DetailItem label="CNPJ" value={data.cnpj} />
        <DetailItem label="Razão Social" value={data.razaoSocial} />
        <DetailItem label="Capital Social" value={formatCurrency(data.capitalSocial)} />
        <DetailItem label="Porte da Empresa" value={data.porteEmpresa} />
        <DetailItem label="CEP" value={data.cep} />
        <DetailItem label="Endereço" value={`${data.logradouro}, ${data.numero}`} />
        <DetailItem label="Complemento" value={data.complemento} />
        <DetailItem label="Bairro" value={data.bairro} />
        <DetailItem label="Município" value={`${data.municipio} - ${data.uf}`} />
      </div>

      <Button
        onClick={submitForPrediction}
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Prevendo o futuro...' : 'E aí? Pronto para descobrir se vai virar uber?'}
      </Button>
      {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
    </Card>
  );
};
