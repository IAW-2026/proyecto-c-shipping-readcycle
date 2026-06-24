import Link from "next/link";

export default function ShipmentPagination({ currentPage, totalPages }) {
  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`?page=${page}`}
          className={
            page === currentPage
              ? "bg-brand-sage text-white px-4 py-2 rounded"
              : "border px-4 py-2 rounded"
          }
        >
          {page}
        </Link>
      ))}
    </div>
  );
}
