export default function InventoryTable({ products }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">

      <table className="w-full text-sm">
        <thead className="bg-slate-800 text-slate-400">
          <tr>
            <th className="p-3 text-left">Product</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-t border-white/10 hover:bg-white/5">

              <td className="p-3">
                {p.brand} {p.model}
              </td>

              <td className="p-3 text-center">
                {p.category}
              </td>

              <td className="p-3 text-center">
                ₹{p.price}
              </td>

              <td className="p-3 text-center">
                {p.stock}
              </td>

              <td className="p-3 text-center">
                <StatusBadge stock={p.stock} />
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}


// 🔥 STATUS BADGE
const StatusBadge = ({ stock }) => {
  if (stock === 0)
    return <span className="text-red-400">Out</span>;

  if (stock <= 5)
    return <span className="text-yellow-400">Low</span>;

  return <span className="text-green-400">In Stock</span>;
};