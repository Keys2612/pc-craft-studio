const TechnicianView = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Current Orders</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Order</th>
                <th className="p-3 text-left">Parts</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <TableRow order="#12345" parts="CPU, Motherboard, RAM" status="Complete" action="View" />
              <TableRow order="#12346" parts="Graphics Card, PSU" status="In Progress" action="View" />
              <TableRow order="#12347" parts="SSD, Cooling Fan" status="Pending" action="Cancel" />
              <TableRow order="#12347" parts="SSD, Cooling Fan" status="Reject" action="View" />
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  const TableRow = ({ order, parts, status, action }) => {
    return (
      <tr className="border-b">
        <td className="p-3">{order}</td>
        <td className="p-3">{parts}</td>
        <td className="p-3">{status}</td>
        <td className="p-3">
          <button className="text-blue-600 hover:text-blue-800">{action}</button>
        </td>
      </tr>
    );
  };
  
  export default TechnicianView;