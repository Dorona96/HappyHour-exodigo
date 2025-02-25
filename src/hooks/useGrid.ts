import {useState, useEffect} from "react";
import { useMediaQuery } from "react-responsive";

export const useGrid = (cocktailsLength: number) =>{
    const [gridHeight, setGridHeight] = useState(window.innerHeight - 220);
    const isSmallScreen = useMediaQuery({ maxWidth: 600 });
    const isMediumScreen = useMediaQuery({ minWidth: 601, maxWidth: 1024 });
    const isLargeScreen = useMediaQuery({ minWidth: 1300 });
    const itemWidth = 300;
    const itemHeight = 300;
    const columns =  isSmallScreen ? 1 : isMediumScreen ? 2 : isLargeScreen ? 4 : 3;
    const rows = Math.ceil(cocktailsLength / columns);
  
    useEffect(() => {
        const handleResize = () => setGridHeight(window.innerHeight - 220);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);

      
    
      return {gridHeight, columns, rows, itemWidth, itemHeight};
}