// File: src/components/ui/navigation-menu.tsx
"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ... (Sisa kode sama persis dengan yang Anda kirimkan)
// Saya tidak mengubah logic styling Anda agar desain tetap sesuai keinginan.

const NavigationMenu = React.forwardRef<
   React.ElementRef<typeof NavigationMenuPrimitive.Root>,
   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> & {
      viewport?: boolean;
   }
>(({ className, children, viewport = false, ...props }, ref) => (
   <NavigationMenuPrimitive.Root
      ref={ref}
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
         "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
         className
      )}
      {...props}
   >
      {children}
   </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
   React.ElementRef<typeof NavigationMenuPrimitive.List>,
   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
   <NavigationMenuPrimitive.List
      ref={ref}
      data-slot="navigation-menu-list"
      className={cn(
         "group flex flex-1 list-none items-center justify-center gap-1",
         className
      )}
      {...props}
   />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
   "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1"
);

const NavigationMenuTrigger = React.forwardRef<
   React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
   <NavigationMenuPrimitive.Trigger
      ref={ref}
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
   >
      {children}{" "}
      <ChevronDownIcon
         className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
         aria-hidden="true"
      />
   </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
   React.ElementRef<typeof NavigationMenuPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
   <NavigationMenuPrimitive.Content
      ref={ref}
      data-slot="navigation-menu-content"
      className={cn(
         "absolute left-0 top-full z-50 mt-1.5 w-auto min-w-[12rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg",
         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
         className
      )}
      {...props}
   />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

export {
   NavigationMenu,
   NavigationMenuList,
   NavigationMenuItem,
   NavigationMenuContent,
   NavigationMenuTrigger,
   NavigationMenuLink,
   navigationMenuTriggerStyle,
};