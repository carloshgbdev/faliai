import { Button, Card, Input } from "../../../components";

type CnpjFormProps = {
  cnpj: string;
  isLoading: boolean;
  error: string | null;
  handleCnpjChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitCnpj: () => void;
}

export const CnpjForm = ({ cnpj, isLoading, error, handleCnpjChange, submitCnpj }: CnpjFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCnpj();
  }

  return (
    <Card className="max-w-lg mx-auto w-full">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-text-main">FaliAI?</h1>
        <p className="text-text-muted mt-2 text-lg">Insira seu CNPJ e descubra se terá que fugir para outro país...</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          placeholder="00.000.000/0000-00"
          value={cnpj}
          onChange={handleCnpjChange}
          maxLength={18}
          disabled={isLoading}
          aria-label="CNPJ"
        />
        <Button 
          type="submit"
          className="w-full"
          disabled={isLoading || cnpj.length !== 18}
        >
          {isLoading ? 'Analisando...' : 'Enviar'}
        </Button>
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
      </form>
    </Card>
  );
};
