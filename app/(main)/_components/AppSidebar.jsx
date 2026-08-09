"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image"
import { Plus } from "lucide-react"
import Link from "next/link";
import { SideBarOptions } from "@/services/Constants";
export function AppSidebar() {
    const path=usePathname();
    console.log(path);
  return (
    <Sidebar>
        <SidebarHeader className="flex items-center mt-5">
            <Image src="/logo2.png" alt="Logo" 
            width={200} 
            height={100} 
            className= "w-[180px]"/>
        <Button className="mt-5 w-full rounded-lg justify-center" > 
            <Plus/> Create New Interview</Button> 
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarContent>
                <SidebarMenu>
                    {SideBarOptions.map((option, index) => (
                        <SidebarMenuItem key={index} className="p-1">
                             <SidebarMenuButton
                             className={`w-full justify-start gap-2 rounded-md ${path==option.path&&'bg-blue-100 text-primary'}`}
                             render={
                             <Link href={option.path}>
                            <option.icon className={`text-[16px] ${path==option.path&&'text-primary'}`}/>
                             <span className={`text-[16px] font-medium ${path==option.path&&'text-primary'}`}>{option.name}</span>
                             </Link>
                             }
                             />
                        </SidebarMenuItem>
            ))}
                </SidebarMenu>
            </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}