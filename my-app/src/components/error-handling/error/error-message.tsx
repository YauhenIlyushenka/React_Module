import '../error-handling-style.css'

interface ErrorMessageProps {
    error: string;
  }
  
  const ErrorMessage = ({ error }: ErrorMessageProps) => {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  };
  
  export default ErrorMessage;