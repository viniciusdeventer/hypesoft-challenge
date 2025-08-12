import { useState, useRef, useEffect } from "react";
import { User, ChevronDown } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fecha o menu se clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full h-14 bg-white shadow flex items-center px-4">
      <div
        ref={ref}
        className="ml-auto flex items-center gap-2 cursor-pointer relative select-none"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
          <User className="w-5 h-5 text-gray-600" />
        </div>

        <div className="flex flex-col items-start leading-tight">
          <span className="text-sm font-medium text-gray-700">Vinicius</span>
          <span className="text-xs text-gray-500">Admin</span>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />

        {open && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            <button className="w-full text-left px-4 py-2 text-sm text-indigo-600 bg-white border hover:bg-indigo-100 border-transparent hover:border-transparent outline-none focus:outline-none focus:ring-0">
              Perfil
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-indigo-600  bg-white border hover:bg-indigo-100 border-transparent hover:border-transparent outline-none focus:outline-none focus:ring-0">
              Configurações
            </button>
            <div className="my-1" />
            <button className="w-full text-left px-4 py-2 text-sm bg-white text-red-600 border hover:bg-indigo-100 border-transparent hover:border-transparent outline-none focus:outline-none focus:ring-0">
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
