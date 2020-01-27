import * as React from "react";
import HostCertListController from "../controllers/HostCertListController";
import { HostCertList, HostCertInfo } from '../types/HostCertList';

export interface HelloProps {
    compiler: string;
    framework: string;
}

// The main component as a React.FunctionComponent
export const Hello: React.FunctionComponent<HelloProps> = (props) => {

    const [ jsonValue, setJsonValue ] = React.useState<any>(undefined);

    const loadFromServer = () : void => {
        HostCertListController.loadAllFromServer()
            .then( (list:HostCertList)=>{
                console.log("Loaded list", list );
                setJsonValue(list);
            } )
            .catch( error => {
                console.log("Failed to load list from server.", error);
            } );
    };

    interface ListEntryProps {
        info: HostCertInfo;
    };

    const ListEntry = ( props:ListEntryProps ) : JSX.Element => { console.log('props',props);
        const { info } = props;
        // SSL_PROTOCOL : string; 
        // SSL_COMMON_NAME : string; 
        // SSL_PUBLIC_KEY_TYPE : string;
        // SSL_CERT_VERSION :string; 
        // SSL_START_DATE : string;
        // SSL_EXPIRE_DATE : string; 
        // SSL_ISSUE_COUNTRY : string;
        // SSL_ISSUER_ORGANISATION : string;
        // SSL_ISSUER_ORGANISATIONAL_UNIT : string; 
        // SSL_ISSUER_COMMON_NAME : string; 
        // SSL_ISSUER_LOCALITY : string; 
        // SSL_ISSUER_STATE : string; 
        // SSL_NAME_MATCH : boolean; 
        return (
            <div>
                <span>Name: {info.name}</span>
                <span>Common name: {info.SSL_COMMON_NAME}</span>
                <span>Expiration date: {info.SSL_EXPIRE_DATE}</span>
            </div>
        );  
    };
    
    return (
        <>
            <h1>Hello from {props.compiler} and {props.framework}!</h1>
            <input type="button" onClick={loadFromServer} value="Load from server" />
            {/* {JSON.stringify(jsonValue)} */}
            <>
                {jsonValue && jsonValue.map( (info:HostCertInfo, index:number) => {
                    console.log('re-render', index, info);
                    return (<ListEntry key={`listentry_${info.name}`} info={info} ></ListEntry>);
                })}
            </>
        </>
    );
    
}