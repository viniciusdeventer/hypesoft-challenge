import { Home, Package } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import HypesoftLogo from "../../assets/Hypesoft.png"; 

export function Sidebar() {
  const { pathname } = useLocation();

  const menu = [
    {
      title: "G E R A L",
      items: [
        { label: "Dashboard", icon: Home, path: "/", badge: null },
      ],
    },
    {
      title: "V E N D A S",
      items: [
        { label: "Products", icon: Package, path: "/products", badge: 3 },
        { label: "Categories", icon: Package, path: "/categories", badge: null },
      ],
    },    
  ];

  return (
    <aside className="w-64 bg-white h-full border-r p-4 flex flex-col">
      <img src={HypesoftLogo} className="mb-2" alt="Logo da Hypesoft" />
      <nav className="flex-1 space-y-6">
        {menu.map((section) => (
          <div key={section.title}>
            <p className="text-xs font-semibold text-gray-400 mb-2">{section.title}</p>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className={`group flex items-center justify-between p-2 rounded-lg  ${
                        isActive
                          ? "bg-indigo-50 text-indigo-600"
                          : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon
                          className={`w-5 h-5 mr-3 ${
                            isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-indigo-600"
                          }`}
                        />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
