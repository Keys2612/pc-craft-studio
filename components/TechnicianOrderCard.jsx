const TechnicianOrderCard = ({ order }) => {
    return (
      <div className="bg-white border rounded-lg shadow p-4">
        <h4 className="font-semibold text-lg">{order.status}</h4>
        <p className="text-gray-600">Order #{order.id}</p>
        <p className="text-gray-500">Parts List</p>
        <p className="text-gray-500">Requirements</p>
        <div className="mt-3 flex gap-3">
          <button className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600">
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
  