const PartCard = ({ part, onSelect }) => {
  return (
    <div className="border p-4 rounded-lg shadow">
      <img src={part.imageUrl} alt={part.name} className="w-full h-32 object-cover mb-2" />
      <h3 className="font-bold">{part.name}</h3>
      <p>Price: ${part.price}</p>
      <button onClick={onSelect} className="mt-2 bg-purple-500 text-white px-4 py-2 rounded">
        Select
      </button>
    </div>
  );
};

export default PartCard;
