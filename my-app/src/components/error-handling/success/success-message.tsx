import '../error-handling-style.css'

interface SuccessMessageProps {
  fact: string;
}

const SuccessMessage = ({ fact }: SuccessMessageProps) => {
  return (
    <div className="success-message">
      <p>{fact}</p>
    </div>
  );
};

export default SuccessMessage;