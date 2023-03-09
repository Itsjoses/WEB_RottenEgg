import { THEME, ThemeContext } from "Context/Theme";
import { ReactNode, useState } from "react";
import Footer from "../Utilites/Footer";
import Header from "../Utilites/Header";
interface LayoutProps{
    content:ReactNode
}
const Layout = (props: LayoutProps) => {
    const {content} = props


    
    const [theme, setTheme] = useState(THEME.light);
    const handleTheme = () => {
        if (theme == THEME.light) {
      setTheme(THEME.dark);
      sessionStorage.setItem("theme", "dark");
    } else {
      setTheme(THEME.light);
      sessionStorage.setItem("theme", "light");
    }
  };
    return ( 
        <ThemeContext.Provider value={theme}>
            <Header handleTheme={handleTheme} />
                {content}
            <Footer />
        </ThemeContext.Provider>
     );
}
 
export default Layout;