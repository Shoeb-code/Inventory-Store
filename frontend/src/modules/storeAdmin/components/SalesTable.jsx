import { useState, useMemo } from "react";

import {
  Search,
  ArrowUpDown,
  X,
  IndianRupee,
  Cpu,
  HardDrive,
  MemoryStick,
  CalendarDays,
  Package,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

export default function SalesTable({
  sales = [],
  loading,
}) {

  const [search, setSearch] =
    useState("");

  const [sortKey, setSortKey] =
    useState("date");

  const [sortOrder, setSortOrder] =
    useState("desc");

  const [page, setPage] =
    useState(1);

  const [selected, setSelected] =
    useState(null);

  const ITEMS_PER_PAGE = 6;

  // =========================================
  // FILTER + SORT
  // =========================================

  const processedSales = useMemo(() => {

    let filtered =
      sales.filter((s) => {

        const text =
          `
          ${s.product?.brand}
          ${s.product?.model}
          ${s.product?.ram}
          ${s.unit?.serialNumber}
          `
            .toLowerCase();

        return text.includes(
          search.toLowerCase()
        );
      });

    filtered.sort((a, b) => {

      const aVal =
        getValue(a, sortKey);

      const bVal =
        getValue(b, sortKey);

      if (sortOrder === "asc") {

        return aVal > bVal ? 1 : -1;
      }

      return aVal < bVal ? 1 : -1;
    });

    return filtered;

  }, [
    sales,
    search,
    sortKey,
    sortOrder,
  ]);

  // =========================================
  // PAGINATION
  // =========================================

  const totalPages =
    Math.ceil(
      processedSales.length /
      ITEMS_PER_PAGE
    );

  const paginated =
    processedSales.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );

  // =========================================
  // SORT
  // =========================================

  const handleSort = (key) => {

    if (sortKey === key) {

      setSortOrder(
        sortOrder === "asc"
          ? "desc"
          : "asc"
      );

    } else {

      setSortKey(key);

      setSortOrder("desc");
    }
  };

  // =========================================
  // UI
  // =========================================

  return (

    <div className="space-y-6 text-white">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>

          <h2 className="text-2xl font-bold tracking-tight">

            Sales Transactions

          </h2>

          <p className="text-sm text-slate-400 mt-1">

            Monitor and analyze all recent sales.

          </p>

        </div>

        {/* SEARCH */}
        <div className="flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/10 w-full md:w-80 focus-within:border-blue-500 transition-all duration-300">

          <Search
            size={16}
            className="text-slate-500"
          />

          <input

            placeholder="Search transactions..."

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }

            className="bg-transparent outline-none text-sm w-full placeholder:text-slate-500"
          />

        </div>

      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] shadow-2xl shadow-black/20">

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            {/* HEAD */}
            <thead className="sticky top-0 z-10 bg-[#0f172a]/95 backdrop-blur-xl text-slate-400 text-xs uppercase">

              <tr>

                <Th
                  label="Product"
                  onClick={() =>
                    handleSort("product")
                  }
                />

                <Th
                  label="RAM"
                  onClick={() =>
                    handleSort("ram")
                  }
                />

                <Th
                  label="Price"
                  onClick={() =>
                    handleSort("price")
                  }
                />

                <Th
                  label="Profit"
                  onClick={() =>
                    handleSort("profit")
                  }
                />

                <Th
                  label="Date"
                  onClick={() =>
                    handleSort("date")
                  }
                />

              </tr>

            </thead>

            {/* BODY */}
            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="5"
                    className="p-10 text-center text-slate-500"
                  >

                    Loading sales...

                  </td>

                </tr>

              ) : paginated.length > 0 ? (

                paginated.map((sale, i) => (

                  <motion.tr

                    key={sale.id || i}

                    whileHover={{
                      backgroundColor:
                        "rgba(255,255,255,0.04)",
                    }}

                    transition={{
                      duration: 0.2,
                    }}

                    onClick={() =>
                      setSelected(sale)
                    }

                    className="group border-t border-white/5 cursor-pointer transition-all duration-300"
                  >

                    {/* PRODUCT */}
                    <td className="p-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400 text-sm font-bold">

                          {sale.product?.brand?.charAt(0)}

                        </div>

                        <div>

                          <p className="font-medium text-white group-hover:text-blue-400 transition">

                            {sale.product?.brand}{" "}
                            {sale.product?.model}

                          </p>

                          <p className="text-xs text-slate-500 mt-1">

                            {sale.product?.category ||
                              "Electronics"}

                          </p>

                        </div>

                      </div>

                    </td>

                    {/* RAM */}
                    <td className="p-4 text-slate-300">

                      {sale.product?.ram}

                    </td>

                    {/* PRICE */}
                    <td className="p-4">

                      <span className="font-semibold text-emerald-400">

                        ₹
                        {format(
                          sale.sale?.sellingPrice
                        )}

                      </span>

                    </td>

                    {/* PROFIT */}
                    <td className="p-4">

                      <span
                        className={`font-semibold ${
                          sale.sale?.profit >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >

                        ₹
                        {format(
                          sale.sale?.profit
                        )}

                      </span>

                    </td>

                    {/* DATE */}
                    <td className="p-4 whitespace-nowrap text-xs text-slate-500">

                      {formatDate(
                        sale.sale?.date
                      )}

                    </td>

                  </motion.tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="p-12 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-500/10 border border-blue-500/20">

                        <Package
                          size={26}
                          className="text-blue-400"
                        />

                      </div>

                      <h3 className="mt-4 text-lg font-semibold">

                        No Transactions Found

                      </h3>

                      <p className="mt-2 text-sm text-slate-500">

                        No sales match your search.

                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* PAGINATION */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">

        <span>

          Page {page} of{" "}
          {totalPages || 1}

        </span>

        <div className="flex items-center gap-2">

          <button

            onClick={() =>
              setPage((p) =>
                Math.max(p - 1, 1)
              )
            }

            className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/10 transition-all duration-300"
          >

            Prev

          </button>

          <button

            onClick={() =>
              setPage((p) =>
                Math.min(
                  p + 1,
                  totalPages
                )
              )
            }

            className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/10 transition-all duration-300"
          >

            Next

          </button>

        </div>

      </div>

      {/* MODAL */}
      <AnimatePresence>

        {selected && (

          <SaleModal

            sale={selected}

            onClose={() =>
              setSelected(null)
            }
          />

        )}

      </AnimatePresence>

    </div>
  );
}

// =========================================
// TH
// =========================================

const Th = ({
  label,
  onClick,
}) => (

  <th

    onClick={onClick}

    className="p-4 cursor-pointer hover:text-white transition"
  >

    <div className="flex items-center gap-1">

      {label}

      <ArrowUpDown size={12} />

    </div>

  </th>
);

// =========================================
// SALE MODAL
// =========================================

const SaleModal = ({
  sale,
  onClose,
}) => (

  <>

    {/* BACKDROP */}
    <motion.div

      initial={{
        opacity: 0,
      }}

      animate={{
        opacity: 1,
      }}

      exit={{
        opacity: 0,
      }}

      onClick={onClose}

      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
    />

    {/* MODAL */}
    <motion.div

      initial={{
        opacity: 0,
        scale: 0.92,
        y: 20,
      }}

      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}

      exit={{
        opacity: 0,
        scale: 0.92,
        y: 20,
      }}

      transition={{
        duration: 0.25,
      }}

      className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] shadow-2xl shadow-[0_0_80px_rgba(59,130,246,0.15)] text-white"
    >

      {/* TOP ACCENT */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />

      <div className="p-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-2xl font-bold">

              Sale Details

            </h2>

            <p className="text-sm text-slate-400 mt-1">

              Transaction information

            </p>

          </div>

          <button

            onClick={onClose}

            className="p-2 rounded-xl hover:bg-white/10 transition"
          >

            <X size={18} />

          </button>

        </div>

        {/* PRODUCT CARD */}
        <div className="p-5 rounded-3xl border border-white/10 bg-white/[0.04] mb-5">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-blue-500/20 bg-blue-500/10 text-blue-400 text-lg font-bold">

              {sale.product?.brand?.charAt(0)}

            </div>

            <div>

              <h3 className="text-lg font-semibold">

                {sale.product?.brand}{" "}
                {sale.product?.model}

              </h3>

              <p className="text-sm text-slate-400 mt-1">

                {sale.product?.category}

              </p>

            </div>

          </div>

          {/* SPECS */}
          <div className="grid grid-cols-3 gap-3 mt-5">

            <Spec
              icon={<Cpu size={15} />}
              label="Processor"
              value={sale.product?.processor}
            />

            <Spec
              icon={<MemoryStick size={15} />}
              label="RAM"
              value={sale.product?.ram}
            />

            <Spec
              icon={<HardDrive size={15} />}
              label="Storage"
              value={sale.product?.storage}
            />

          </div>

        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-2 gap-4">

          <Detail
            label="Selling Price"
            value={`₹${format(
              sale.sale?.sellingPrice
            )}`}
            color="green"
          />

          <Detail
            label="Cost Price"
            value={`₹${format(
              sale.sale?.costPrice
            )}`}
          />

          <Detail
            label="Profit"
            value={`₹${format(
              sale.sale?.profit
            )}`}
            color={
              sale.sale?.profit >= 0
                ? "green"
                : "red"
            }
          />

          <Detail
            label="Serial Number"
            value={
              sale.unit?.serialNumber ||
              "-"
            }
          />

          <Detail
            label="IMEI"
            value={
              sale.unit?.imei || "-"
            }
          />

          <Detail
            label="Date"
            value={formatDate(
              sale.sale?.date
            )}
            icon={<CalendarDays size={14} />}
          />

        </div>

        {/* FOOTER */}
        <button

          onClick={onClose}

          className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 transition-all duration-300 text-sm font-semibold shadow-lg shadow-blue-500/20"
        >

          Close

        </button>

      </div>

    </motion.div>

  </>
);

// =========================================
// DETAIL
// =========================================

const Detail = ({
  label,
  value,
  color,
  icon,
}) => {

  const colors = {
    green: "text-green-400",
    red: "text-red-400",
    blue: "text-blue-400",
  };

  return (

    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">

      <div className="flex items-center gap-2 text-xs text-slate-400">

        {icon}

        <span>{label}</span>

      </div>

      <p
        className={`mt-2 text-sm font-semibold ${
          colors[color] || "text-white"
        }`}
      >

        {value}

      </p>

    </div>
  );
};

// =========================================
// SPEC
// =========================================

const Spec = ({
  icon,
  label,
  value,
}) => (

  <div className="rounded-2xl border border-white/10 bg-black/20 p-3">

    <div className="flex items-center gap-2 text-xs text-slate-400">

      {icon}

      <span>{label}</span>

    </div>

    <p className="mt-2 text-sm font-medium">

      {value || "-"}

    </p>

  </div>
);

// =========================================
// HELPERS
// =========================================

const getValue = (
  sale,
  key
) => {

  switch (key) {

    case "product":

      return `
        ${sale.product?.brand}
        ${sale.product?.model}
      `;

    case "ram":

      return sale.product?.ram || "";

    case "price":

      return sale.sale?.sellingPrice || 0;

    case "profit":

      return sale.sale?.profit || 0;

    case "date":

      return new Date(
        sale.sale?.date
      ).getTime();

    default:

      return "";
  }
};

const format = (num) =>
  new Intl.NumberFormat("en-IN")
    .format(num || 0);

const formatDate = (date) =>
  new Date(date)
    .toLocaleDateString("en-IN");