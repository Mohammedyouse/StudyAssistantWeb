import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className="text-blue-600" size={24} />
    </div>
  );
}