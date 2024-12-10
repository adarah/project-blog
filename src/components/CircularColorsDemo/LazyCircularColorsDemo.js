import dynamic from "next/dynamic";
const LazyCircularColorsDemo = dynamic(() => import("./CircularColorsDemo"));

export default LazyCircularColorsDemo;
