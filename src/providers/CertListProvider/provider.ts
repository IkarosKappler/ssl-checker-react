

import HostCertListController from '../../controllers/HostCertListController';
import { HostCertInfo, HostCertList } from '../../types/HostCertList';

import React = require('react');

export interface CertListState {
    list: HostCertList;
}

const initialState:CertListState = {
    list : ({ hosts: [] } as unknown) as HostCertList
};

export const useCertListProvider = () => {

    const [state, dispatch] = React.useState<CertListState>(initialState);
    

    const loadFromServer = (): void => {
        HostCertListController.loadAllFromServer()
        .then((list: HostCertList) => {
            dispatch({...state, list: list} );
        })
        .catch(error => {
            console.log("Failed to load list from server.", error);
        });
    };


    const reloadCertInfo = (name:string): void => {
        // ...
    };

    const getCertList = () : HostCertList => {
        return state.list;
    }

    return {
        loadFromServer,
        reloadCertInfo,
        getCertList
    }
}