import * as React from "react";
import HostCertListController from "../controllers/HostCertListController";
import { HostCertList } from '../types/HostCertList';

export interface HelloProps {
    compiler: string;
    framework: string;
}

// The main component as a React.FunctionComponent
export const Hello: React.FunctionComponent<HelloProps> = (props) => {

    const [ jsonValue, setJsonValue] = React.useState<any>(undefined);

    const loadFromServer = () : void => {
        HostCertListController.loadAllFromServer()
            .then( (list:HostCertList)=>{
                console.log("Loaded list", list );
                setJsonValue(list);
            } )
            .catch( error=>{
                console.log("Failed to load list from server.", error);
            });
    };

    
        return (
            <>
                <h1>Hello from {props.compiler} and {props.framework}!</h1>
                <input type="button" onClick={loadFromServer} value="Load from server" />
                {JSON.stringify(jsonValue)}
            </>
        );
    
}