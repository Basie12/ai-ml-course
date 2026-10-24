import Link from "next/link";

export function AdminTabs({ active }: { active: "materials" | "masterclasses" }) {
  return (
    <nav className="mca-tabs" aria-label="Admin sections">
      <Link href="/admin" aria-current={active === "materials" ? "page" : undefined}>
        Course materials
      </Link>
      <Link href="/admin/masterclasses" aria-current={active === "masterclasses" ? "page" : undefined}>
        Masterclasses
      </Link>
    </nav>
  );
}
