import { useState } from "react";
import { doneOrder } from "../api";

const Cards = ({data, categs}) => {
    console.log(data)
    const [done, setDone] = useState([])

    const handleDone = async (id) => {
        console.log('Done', id);
        const res = await doneOrder(id);
        console.log(res);
        if(res.data){
            setDone([...done, id])
        }
    }

    const getCategs = () => {
        let categs = []
        categs = Array.isArray(data) && data ? data.map(d => {
            if(Object.entries(d.products).length > 0){
                return Object.entries(d.products).map((object, i) => {
                    return object[1][0].pos_categ.pos_categ_id[0];
                })
            }
        }) : null;
        console.log(categs);
        return categs
    }

    // getCategs();
    let categ_check = []
    return ( 
        <div className="grid gap-4 grid-cols-3">
            {Array.isArray(data) && data? data.map((d,i) => {
                if(Object.entries(d.products).length > 0 && !done.includes(d.order_details.id)) {
                    console.log(categs)
                    var categ_check = Object.entries(d.products).reduce((object, i) => { if(!categs.includes(object[1][0].pos_categ.pos_categ_id[0])) {object.push(i);} return object; })
                    console.log(categ_check)
                    if(categ_check) {
                        console.log(Object.entries(d.products));
                        return (
                        <div key={d.order_details.id} className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <div className="text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">{d.order_details.date_order}</div>
                            <div className="p-3">
                                <div className="grid gap-4 grid-cols-2">
                                    <div>
                                        <h1 className="text-left justify-content mb-2 text-2sm tracking-tight text-gray-900 dark:text-white">{d.order_details.name}</h1>
                                        <h1 className="text-left mb-2 text-2sm tracking-tight text-gray-900 dark:text-white">{d.order_details.table}</h1>
                                    </div>
                                    <div>
                                        <a href="#" onClick={() => handleDone(d.order_details.id)} className="inline-flex items-center py-1 px-1 text-sm font-medium text-center text-white bg-red-900 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Done
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="26px" height="16px"><path fill="#fff" d="M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z"/></svg>
                                        </a>
                                    </div>
                                </div>
                                {Object.entries(d.products).map((object, i) => { //categ_check = true;
                                    return (
                                    <p key={i} className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        <h5 className="bg-red-900 mb-2 text-2sm font-bold tracking-tight text-white dark:text-white">{object[1][0].pos_categ.pos_categ[1]}</h5>
                                        {categs.includes(object[1][0].pos_categ.pos_categ_id[0]) ? object[1]
                                            .map(p2 => 
                                            <p key={i} className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                {p2.product_id[1]} -- {p2.qty}
                                            </p>)
                                        
                                        : null }
                                    </p>)
                                }) }
                                
                                
                            </div>

                            <div></div>
                            
                        </div>)
                    }
                } else { <span>No Orders</span>}
            }) : 
            <span>Loading Orders</span>
            }
        </div>
    );
}
 
export default Cards;