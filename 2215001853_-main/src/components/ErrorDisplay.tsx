import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayProps {
  message?: string;
  retry?: () => void;
}

const ErrorDisplay = ({ 
  message = 'An error occurred while fetching data.',
  retry
}: ErrorDisplayProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <AlertTriangle className="h-12 w-12 text-red-500" />
      <p className="mt-4 text-gray-700 text-lg">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;