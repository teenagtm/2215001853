import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner = ({ message = 'Loading...' }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
      <p className="mt-4 text-gray-600 text-lg">{message}</p>
    </div>
  );
};

export default LoadingSpinner;