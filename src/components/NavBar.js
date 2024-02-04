import { useRouter } from "next/navigation";
import React from "react";
import { FiHome, FiCalendar, FiBookOpen } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";

export default function NavBar({ active, setActive }) {
  const router = useRouter();

  const handleClick = (id) => {
    setActive(id);
    router.push(navItems[id].href);
  };

  return (
    <div className="fixed w-full bottom-0 left-0 h-16 flex gap-1 overflow-hidden bg-white z-30">
      {navItems.map((item) => (
        <NavItem
          key={item.id}
          id={item.id}
          icon={item.icon}
          label={item.label}
          active={active}
          onClick={handleClick}
        />
      ))}
    </div>
  );
}

const navItems = [
  { id: 0, icon: <FiHome />, label: "Dashboard", href: "/dashboard" },
  { id: 1, icon: <FiCalendar />, label: "Period Tracker", href: "/tracker" },
  { id: 2, icon: <FiBookOpen />, label: "Jornal", href: "/journal" },
  { id: 3, icon: <HiOutlineUserGroup />, label: "Social", href: "/social" },
];

const NavItem = ({ id, icon, label, active, onClick }) => (
  <div
    className={`flex-1 border-t-2 flex justify-center items-center relative transition-all ease-in-out ${
      active === id && "border-pink-400"
    } `}
    onClick={() => onClick(id)}
  >
    {React.cloneElement(icon, {
      className: `h-7 w-7 transition-all ease-in-out ${
        active === id ? "stroke-pink-400 scale-110" : "stroke-slate-700"
      }`,
    })}
    <span
      className={`absolute bottom-0 h-8 w-full bg-pink-400 rounded-t-full -mb-2 transition-all ease-in-out duration-300 ${
        active === id ? "-mb-6 opacity-100" : "-mb-8 opacity-0"
      }`}
    />
  </div>
);
