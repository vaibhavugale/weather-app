import { useEffect, useRef, useState } from "react"
import { apiConnector } from "../utils/apiConnector"
import {getCityApiUrl, getallCountries } from "../constant"
import { BiSolidUpArrow } from "react-icons/bi";
import TableRow from "./TableRow";


const Table = () => {
    const [cities,setCities] = useState<any []>([]);
    const [isSticky , setIsSticky] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [offset,SetOffset] = useState<number>(0);
    const [filterData,setFilterData] = useState<any []>([]);
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [allCountries ,setAllCountries] = useState<any []> ([]);
    const [reduceData, setReduceData] = useState< any []>([]);
    const [sValue,setSValue] = useState<any>("")
    useEffect(()=>{
        const getCities =  async () =>{
          const citesUrl = getCityApiUrl(offset);
          const res = await apiConnector("GET",citesUrl);
          if(res){
            setCities(res?.data?.results)
            setFilterData(res?.data?.results)
          }
        }
        const AL = getallCountries();
        setAllCountries(AL);
        getCities();

        const handleScroll = async () => {
          const container = containerRef.current;
          
          if (!container) return;
    
          const scrollTop = container.scrollTop;
          const scrollHeight = container.scrollHeight;
          const totalHeight = container.clientHeight;
          const atBottom = (scrollTop+totalHeight) === scrollHeight;
          
          if(atBottom){
            setLoading(true);
            SetOffset((prv)=>prv + 20);
            const urlWithOffset = getCityApiUrl(offset)
            const res =  await apiConnector("GET",urlWithOffset);
         
            setCities((prv)=>[...prv,...res?.data?.results])
            setFilterData((prv)=>[...prv,...res?.data?.results])
            setLoading(false)
            
          }else{
            setLoading(false)
          }
        
        };
        const tableElement = containerRef.current;
        if(tableElement){
          tableElement.addEventListener('scroll', handleScroll);
        }
 

        return () =>{
          if(tableElement){
            tableElement.removeEventListener('scroll', handleScroll);
          }
        }

      },[])

  
  const handleClick = () =>{

      const container = containerRef.current;
      if(container){
        container.scrollTop = 0;
      }
       
    
  }
  const handleChange = (e?:any) =>{
    const searchValue = e?.target?.value;
    setSValue(searchValue);

    if(searchValue || sValue) {
       const dataWithFilter = cities.filter((city)=> city?.ascii_name.toLowerCase().includes(searchValue?.toLowerCase() || sValue.toLowerCase()))
       const countryFilterData = allCountries?.filter((con)=>con?.name?.toLowerCase().includes(searchValue?.toLowerCase() || sValue.toLowerCase()));
       setReduceData(countryFilterData);
       setFilterData(dataWithFilter);
       setIsOpen(true);
    }else{
      setReduceData(allCountries);
      setFilterData(cities)
      setIsOpen(false)
    }
  }
  return (
   <>
   
    <div ref={containerRef} className=" box-border flex-col items-center  w-[100vw] max-h-[100vh] overflow-scroll scroll-smooth  p-2 flex "> 
    <input onChange={handleChange} value={sValue} type="text"  className=" m-1 sticky top-0  outline-none shadow-blue-200 shadow-inner p-2 rounded  text-slate-600 w-[20%] mx-auto " placeholder=" search your city"/>

      {
        isOpen &&  <div className="  bg-white p-2 border overflow-scroll border-slate-500 absolute w-[20%] h-[20%] rounded-md top-[100px]">
         <button className=" cursor-pointer  bg-red-500 rounded-md text-white text-left  px-2" onClick={()=>setIsOpen(false)}>Close</button>
          <ul>
            {
              reduceData.map((con,index)=><li onClick={()=>{
                handleChange()
                setSValue(con.name)
              }} className=" hover:cursor-pointer hover:bg-slate-200/30" key={index}>{con.name}</li>)
            }

          </ul>
         
      </div>
      }
        <table  className={` w-[70%] font-sans  table-auto  border-collapse border shadow-lg `}>
        <thead >
            <tr>
                <th className=" border border-slate-300 p-3">Country</th>
                <th className=" border border-slate-300 p-3 ">City</th>
                <th className=" border border-slate-300 p-3">Time Zone</th>
            </tr>
        </thead>
        <tbody className=" h-[50vh] ">
            {
               filterData ?   filterData.map((city)=> <TableRow  key={city?.geoname_id} lat={city?.coordinates?.lat} lon={city?.coordinates?.lon}  Country={city?.cou_name_en} City={city?.ascii_name} TimeZone={city?.timezone}/>) : (<td>No results</td>)
            }
        </tbody>

        

    </table>

   <button onClick={handleClick} className=" fixed  p-2 bg-slate-400/35 shadow-xl  rounded-full right-[100px]   bottom-9"><BiSolidUpArrow  size={30}/></button>
    </div></>
  )
}

export default Table