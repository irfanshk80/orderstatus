import axios from 'axios'

const url = "http://134.136.244.245:8080"
// const url = "http://192.168.1.15:8080"

export const fetchPrinters = async (filter) => {
    let changeableUrl = url + '/getPrinters';

    try {
        const printers = await axios.get(changeableUrl);
    
        return printers;
      } catch (error) {
        return error;
      }
}

export const fetchPrinterOrders = async (categs) => {
    let changeableUrl = url + '/filterPrinters/'+[categs]

    try {
        const orders = await axios.get(changeableUrl);
        return orders;
    } catch (error) {
        return error;
    }
}

export const fetchKitchenOrders = async () => {
    let changeableUrl = url + '/kitchenOrders';

    try {
        let kitchenorders = await axios.get(changeableUrl);
        return kitchenorders;
    } catch (error) {
        return error
    }
}

export const doneOrder = async (id) => {
    let changeableUrl = url + '/saveDone/'+id

    try {
        const res = await axios.get(changeableUrl);
        console.log('result = ', res);
        return res;
    } catch (error) {
        return error;
    }
}
 
