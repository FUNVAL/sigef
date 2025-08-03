import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import LanguageSwitcher from "../globals/lang-switcher";


export function Header() {

  return (
    <header className="w-full border-b border-border/40 bg-white shadow">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-35 h-10">

            <img src="/Sinfondo.png" alt="imagenFunval" />

          </div>
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  )
}