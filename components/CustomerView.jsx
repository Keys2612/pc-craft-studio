import PartCard from "./PartCard";

const CustomerView = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-2">
        <h2 className="text-xl font-semibold mb-4">Build Parts</h2>
        <div className="space-y-4">
          <PartCard name="NVIDIA 106B GDDR6X, PCI" price="$699.99" />
          <PartCard name="CPU: Intel Core 8 Cores, 16" price="$529.99" />
        </div>
      </div>
      <div className="col-span-1">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="space-y-2">
            <p>Parts Total: <span className="float-right">$1229.98</span></p>
            <p>Custom Build Fee: <span className="float-right">$20.00</span></p>
            <hr className="my-2" />
            <p className="font-bold">Total: <span className="float-right">$1249.98</span></p>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-800">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerView;