import { Button, Card } from "../../../components";
import { Prediction } from "../types";

type PredictionResultProps = {
  prediction: Prediction;
  reset: () => void;
};

export const PredictionResult = ({ prediction, reset }: PredictionResultProps) => {
  const isBankrupt = prediction === 1;

  const content = {
    title: isBankrupt ? "Só lhe resta o churrascamento!" : "Chad! Você moggou os betas...",
    message: isBankrupt
      ? "Baseado em nossa análise, sua empresa tem uma alta probabilidade de encontrar dificuldades financeiras severas."
      : "Sua saúde financeira é de um verdadeiro GigaChad. Continue no topo.",
    icon: isBankrupt ? "😢" : "🎉",
    titleColor: isBankrupt ? "text-red-600" : "text-green-600",
  };

  return (
    <Card className="max-w-lg mx-auto w-full text-center">
      <div className="py-8">
        <div className="text-6xl mb-4">{content.icon}</div>
        <h1 className={`text-4xl font-bold ${content.titleColor}`}>{content.title}</h1>
        <p className="text-text-muted mt-4 text-lg">{content.message}</p>
      </div>
      <Button onClick={reset} className="w-full">
        Fazer Nova Consulta
      </Button>
    </Card>
  );
};
