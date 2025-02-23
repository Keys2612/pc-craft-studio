// File: app/components/PartCard.jsx
const PartCard = ({ part, onSelect }) => {
  return (
    <div className="border p-4 rounded-lg shadow flex flex-col items-center">
      {/* Constrain image height and keep aspect ratio with object-contain */}
      <img
        src={part.imageUrl}
        alt={part.name}
        className="h-32 w-auto object-contain mb-2"
      />
      <h3 className="font-bold text-center">{part.name}</h3>
      <p className="text-center">Price: ${part.price}</p>
      <button
        onClick={onSelect}
        className="mt-2 bg-purple-500 text-white px-4 py-2 rounded"
      >
        Select
      </button>
    </div>
  );
};

export default PartCard;
