import { usePrediction } from '../features/prediction/hooks/usePrediction';
import { CnpjForm, CompanyDetails, PredictionResult } from '../features/prediction/components';

export const HomePage = () => {
  const {
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
  } = usePrediction();

  const renderStep = () => {
    switch (step) {
      case 'form':
        return (
          <CnpjForm
            cnpj={cnpj}
            isLoading={isLoading}
            error={error}
            handleCnpjChange={handleCnpjChange}
            submitCnpj={submitCnpj}
          />
        );
      case 'details':
        if (companyData) {
          return (
            <CompanyDetails
              data={companyData}
              isLoading={isLoading}
              error={error}
              submitForPrediction={submitForPrediction}
            />
          );
        }
        return null; // or a loading/error state
      case 'result':
        if (prediction !== null) {
          return (
            <PredictionResult
              prediction={prediction}
              reset={reset}
            />
          );
        }
        return null; // or a loading/error state
      default:
        return null;
    }
  }

  const getContainerWidth = () => {
    switch (step) {
      case 'details':
        return 'max-w-3xl';
      case 'form':
      case 'result':
      default:
        return 'max-w-lg';
    }
  }

  return (
    <main className="bg-bg-app min-h-screen w-full flex items-center justify-center p-4">
      <div className={`w-full animated-fade-in transition-all duration-700 ease-in-out ${getContainerWidth()}`}>
        {renderStep()}
      </div>
    </main>
  );
};
