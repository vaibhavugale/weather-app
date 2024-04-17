import React, { useEffect, useState } from "react";
import { getApiWeatherUrl } from "../constant";
import { useParams } from "react-router-dom";
import { LuWind } from "react-icons/lu";
import { WiHumidity } from "react-icons/wi";
import { MdVisibility } from "react-icons/md";
import { PiSunBold } from "react-icons/pi";
import { WiSunrise } from "react-icons/wi";
import { WiSunset } from "react-icons/wi";
import { apiConnector } from "../utils/apiConnector";
import { dateFormatter } from "../utils/FormatDate";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaCloudRain } from "react-icons/fa6";
import rainImage from "../assets/rain.jpeg"
import cloudImage from "../assets/cloud.jpeg"
import clearImage from "../assets/clear.jpeg"
const Weather = () => {
  const { lat, lon } = useParams();
  const [weatherData,setWeatherData] = useState<any >(null)
  const [weather,setWeather] = useState<string>("")
  useEffect(() => {
     const getData = async () =>{
        if (lat && lon) {
            const url =  getApiWeatherUrl(lat, lon);
            const res = await apiConnector("GET",url);
             if(res){
                setWeatherData(res);
                 setWeather(res?.data?.weather[0]?.main)
                                
             }         
          }
     }
     getData();
  }, [lat, lon]);

  
 console.log("weather",weather)
  
  return (
    <div className={` relative  w-full flex  justify-center items-center h-[100vh] bg-cover bg-center`}>
     
     {weather==="Clouds" && <img  src={cloudImage} className=" absolute top-0 right-0 bottom-0 left-0 h-full w-full -z-30"/>}
     {weather==="Rain" && <img  src={rainImage} className=" absolute top-0 right-0 bottom-0 left-0 h-full w-full -z-30"/>}
     {weather==="Clear" && <img  src={clearImage} className=" absolute top-0 right-0 bottom-0 left-0 h-full w-full -z-30"/>}
      <div className=" md:flex-row flex-col flex gap-3 bg-slate-400/70 justify-center  items-center w-[100vw] h-[100vh]">
        <div className=" bg-white h-[50vh] lg:w-[20vw] w-[40vw] mt-4 lg:mt-0 flex flex-col rounded-xl shadow-xl">
          <div className=" text-center mt-4 text-4xl"> {weatherData?.data?.weather[0]?.main}</div>
          <p className=" text-center text-sm">{weatherData?.data?.weather[0]?.description}</p>
          <div className=" flex items-center justify-between m-6 ">
            <p>
              {(weatherData?.data?.main?.temp - 273.15 ).toFixed(2)}<sup>o</sup>C
            </p>
             { weatherData?.data?.weather[0]?.main==="Clear" &&  <PiSunBold size={50} color="orange" />}
             { weatherData?.data?.weather[0]?.main==="Clouds" &&  <TiWeatherPartlySunny size={50} color="skyblue" />}
             { weatherData?.data?.weather[0]?.main==="Rain" &&  <FaCloudRain size={50} color="grey" />}

          </div>
          <div className=" flex justify-between items-center m-6">
            <WiSunrise size={50} color="" />
            <p>{dateFormatter(weatherData?.data?.sys?.sunrise)}</p>
          </div>

           <div  className=" flex justify-between items-center m-6">
          <WiSunset size={50} />
          <p>{dateFormatter(weatherData?.data?.sys?.sunset)}</p>
           </div>
        </div>
        <div className=" h-[50vh] w-[50vw]  grid lg:grid-cols-4  lg:grid-rows-2 gap-3 grid-cols-1 grid-rows-4 ">
          <div className=" flex items-center justify-around  flex-col bg-white rounded-md">
            <LuWind size={50} />
            <p className="  text-5xl">{weatherData?.data?.wind?.speed} <span className=" text-sm"> M/s</span></p>
          </div>
          <div className=" flex items-center justify-around flex-col bg-white rounded-md">
            <WiHumidity size={50} />
            <p className="  text-5xl">{weatherData?.data?.main?.humidity} <span className=" text-sm"> %</span></p>
          </div>
          
          <div className=" flex items-center justify-around flex-col bg-white rounded-md">
            <MdVisibility size={50} />
            <p className="  text-5xl">{weatherData?.data?.visibility}<span className=" text-sm"> M</span></p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Weather;
