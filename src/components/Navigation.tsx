import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"
import { ThemeToggle } from "./ThemeToggle"

const Navigation = () => {
  return (
    <NavigationMenu className="max-w-screen-xl mx-auto px-4 py-4 w-full flex justify-between items-center">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className="text-sm font-medium hover:text-gray-600 transition-colors">
            Home
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="ml-4">
          <Link to="/articles" className="text-sm font-medium hover:text-gray-600 transition-colors">
            Articles
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="ml-4">
          <Link to="/career-insights" className="text-sm font-medium hover:text-gray-600 transition-colors">
            Career Insights
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <ThemeToggle />
    </NavigationMenu>
  )
}

export default Navigation