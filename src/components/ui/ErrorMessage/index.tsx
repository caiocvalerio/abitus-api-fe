import { JSX } from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps): JSX.Element => {
  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-red-100 text-red-800 border border-red-300 rounded-lg text-center" role="alert">
      <strong className="block mb-2 text-lg">Ocorreu um erro</strong>
      <p className="m-0 text-base">{message}</p>
    </div>
  );
};

export default ErrorMessage;