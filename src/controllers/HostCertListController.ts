/**
 * A controller wrapper for retrieving host certificate lists from the server.
 * 
 * @author  Ikaros Kappler
 * @date    2020-01-24
 * @version 1.0.0
 */
import axios from "axios";
import { HostCertInfo, HostCertList } from "../types/HostCertList";

const HostListController = {
    loadAllFromServer : () : Promise<HostCertList> => {
        return new Promise<HostCertList>( (resolve,reject) => {
            axios.get('/data/list.php', {})
            .then(function (response) {
              console.log('Response loaded:', response );
              resolve((response.data as unknown) as HostCertList);
            })
            .catch(function (error) {
              reject(error);
            });
        });
    }
};

export default HostListController;