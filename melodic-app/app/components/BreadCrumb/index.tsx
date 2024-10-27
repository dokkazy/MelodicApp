import {
  Breadcrumb,
  // BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { links } from "@/configs/routes";

export default function BreadcrumbComp({
  pathname,
  title,
}: {
  pathname: string;
  title: string;
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-xl">
        <BreadcrumbItem>
          <BreadcrumbLink href={links.home.href}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {/* <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Themes</DropdownMenuItem>
              <DropdownMenuItem>GitHub</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator /> */}
        {/* <BreadcrumbItem>
          <BreadcrumbLink href={pathname}>{title}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator /> */}
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
