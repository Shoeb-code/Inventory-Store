// modules/admin/components/StoreCard.jsx

import { useNavigate } from "react-router-dom";

export default function StoreCard({ store }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/admin/stores/${store.id}`)}
      className="p-4 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer hover:bg-slate-800 transition"
    >
      <h2 className="text-lg font-semibold">{store.name}</h2>
      <p className="text-sm text-slate-400">{store.email}</p>
    </div>
  );
}