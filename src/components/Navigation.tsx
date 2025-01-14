import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"

const Navigation = () => {
  return (
    <NavigationMenu className="max-w-screen-xl mx-auto px-4 py-4">
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
    </NavigationMenu>
  )
}

export default Navigation