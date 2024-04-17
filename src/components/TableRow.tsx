import React from "react";
import { useNavigate } from "react-router-dom";
type rowInterface = {
  Country:string,
  City:string,
  TimeZone:string,
  lat:number,
  lon:number
}
const TableRow = (props : rowInterface ) => {
    const {Country,City,TimeZone,lat,lon} = props 
    const navigate = useNavigate();

    const handleClick = () =>{
      console.log("hii")
         navigate(`/weather-report/${lat}/${lon}`)
         
    }
  return (
    <tr onClick={handleClick} className="odd:bg-slate-200  even:bg-slate-50 hover:cursor-pointer hover:bg-slate-400/30">
      <td className=" border border-slate-300 p-3">{Country}</td>
      <td className=" border border-slate-300 p-3">{City}</td>
      <td className=" border border-slate-300 p-3">{TimeZone}</td>
    </tr>
  );
};

export default TableRow;
