const TechnicianOrderCard = ({ order, onAccept }) => {
    // Check if order is valid
    if (!order) return <p>Order not available</p>;
  
    // Ensure order.parts is an array
    const parts = Array.isArray(order.parts) ? order.parts : [];
  
    return (
      <div className="bg-white border rounded-lg shadow p-6">
        <h4 className="font-semibold text-lg mb-2">{order.status}</h4>
        <p className="text-gray-600 mb-3">Order ID: #{order.id}</p>
  
        {/* Display Parts List */}
        <div className="mb-3">
          <p className="text-gray-500 font-semibold">Parts List:</p>
          <ul className="list-disc pl-5">
            {parts.length > 0 ? (
              parts.map((part, index) => (
                <li key={index} className="text-gray-600">
                  {part.name} - x{part.quantity} - ${part.price * part.quantity}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No parts listed</li>
            )}
          </ul>
        </div>
  
        {/* Total Price */}
        <p className="font-semibold text-gray-700">Total Price: ${order.totalPrice || "0.00"}</p>
  
        {/* Action Buttons */}
        <div className="mt-3 flex gap-3">
          <button
            className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
            onClick={() => onAccept(order.id)} // Call onAccept when accepted
          >
            Accept
          </button>
          <button className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600">
            Decline
          </button>
        </div>
      </div>
    );
  };
  
  export default TechnicianOrderCard;
  