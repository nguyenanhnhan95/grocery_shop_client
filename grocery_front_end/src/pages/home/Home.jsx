import React, { memo } from "react"
import Header from "../../components/header/Header";
import "../../assets/css/home/home.css"
import HomeSlider from "../../components/composite/slider/HomeSlider";
function Home() {
    return (
        <div className="container-home">
            <Header />
            <HomeSlider />
        </div>
    )
}
export default memo(Home);
