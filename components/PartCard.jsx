export default function PartCard({ part }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img src={part.imageUrl} alt={part.name} className="h-32 w-full object-contain" />
      <h3 className="text-lg font-semibold">{part.name}</h3>
      <p className="text-gray-600">Price: ${part.price}</p>
      <button className="mt-2 bg-purple-500 text-white px-4 py-2 rounded">Select</button>
    </div>
  );
}
