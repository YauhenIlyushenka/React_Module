interface FetchFactButtonProps {
  fetchFact: () => void;
}

const FetchFactButton = ({ fetchFact }: FetchFactButtonProps) => {
  return (
    <button onClick={fetchFact}>
      Get fact about cat.
    </button>
  );
};

export default FetchFactButton;