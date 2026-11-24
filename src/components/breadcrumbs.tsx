import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/structured-data";

export function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return <nav aria-label="Jejak navigasi" className={className}>
    <ol className="flex flex-wrap gap-x-2 gap-y-1">
      <li><Link href="/">Beranda</Link></li>
      {items.map((item, index) => <li key={item.pathname} className="flex gap-2">
        <span aria-hidden="true">/</span>
        {index === items.length - 1 ? <span aria-current="page">{item.name}</span> : <Link href={item.pathname}>{item.name}</Link>}
      </li>)}
    </ol>
  </nav>;
}
