import React from "react";
import {
  NavigationMenu as NM,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export default function NavigationMenu({ mobile = false }) {
  const menuItems = [
    "آن  لائین  داخلہ",
    "دعائیں",
    "کتابیں",
    "بینات",
    "دارالافتاء",
    "سرورق",
  ];
  // Mobile menu implementation
  if (mobile) {
    return (
      <div className="w-full">
        <ul className="flex flex-col space-y-3 w-full">
          {menuItems.map((item) => (
            <li key={item} className="text-white w-full">
              <Button className="flex justify-between w-full py-2 px-3 rounded bg-primary-dark hover:bg-primary-dark/80 transition-colors text-right">
                <span className="ml-2">▾</span>
                <span>{item}</span>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Desktop menu implementation
  return (
    <NM className="hidden xl:flex items-center  ">
      <NavigationMenuList className=" gap-1">
        {menuItems.map((item) => (
          <NavigationMenuItem className="text-white " key={item}>
            <NavigationMenuTrigger className="flex justify-between w-full py-1 rounded bg-primary-dark hover:bg-primary-dark/80 transition-colors text-right">
              <span className="text-2xl">{item}</span>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NM>
  );
}
