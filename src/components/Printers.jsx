import { useEffect, useState } from "react";
import { fetchPrinters } from "../api";

const Printers = ({handlePrinter}) => {
    const [printers, setPrinters] = useState([])
    useEffect(()=>{
        const fetchApi = async () => {
            const printers = await fetchPrinters();
            setPrinters({...printers})
        };
        fetchApi();
    }, [])

    var checkProps = {
        checked: false
    }

    // console.log(printers)
    return (
        <div className="printers flex">
            {printers.data ? printers.data.map((d)=> {
                // (d.name.indexOf('Kitchen')>=0) ? checkProps.checked = true : checkProps.checked = false;
                return(<div key={d.id} onClick={(e) => handlePrinter(e, d.product_categories_ids)} className="flex-initial w-32">
                    {/* <label className="text-sm underline">{d.name}</label> */}
                    <input name="printers" type="radio" id={d.product_categories_ids} value={d.product_categories_ids} />
                    <button className="btn hover:bg-red-800 text-white" id={d.product_categories_ids} >{d.name}</button>                        
                </div>)
                // }
            }) : <div>Loading Printers ... </div>}
        </div>
     );
};

export default Printers;