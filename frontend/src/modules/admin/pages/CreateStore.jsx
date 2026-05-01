// modules/admin/pages/CreateStore.jsx

import { useState } from "react";
import CreateStoreModal from "../components/CreateStoreModal";

export default function CreateStore() {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <CreateStoreModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}