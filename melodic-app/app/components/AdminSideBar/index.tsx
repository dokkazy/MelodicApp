// components/AdminSidebar.tsx
import Link from "next/link";
import { adminLinks } from "@/configs/routes";

const AdminSidebar = () => {
  const navLink = [adminLinks.product, adminLinks.brand, adminLinks.order];

  return (
    <div className="h-screen w-64 bg-orange-500 text-white">
      <div className="p-5">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      <nav className="mt-10">
        <ul>
          {navLink.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="block px-4 py-2 font-bold hover:bg-gray-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
