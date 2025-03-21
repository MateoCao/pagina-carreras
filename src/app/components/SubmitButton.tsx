interface SubmitButtonProps {
    slugError: string | null;
  }
  
  export const SubmitButton = ({ slugError }: SubmitButtonProps) => (
    <button
      type="submit"
      disabled={!!slugError}
      className={`w-1/5 mt-2 py-2 px-4 rounded transition-colors ${
        slugError ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer text-white'
      }`}
    >
      Crear Sección
    </button>
  );