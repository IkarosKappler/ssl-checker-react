/**
 * @author  Ikaros Kappler
 * @date    2020-01-24
 * @version 1.0.0
 */

 export type HostCertInfo = {
    SSL_PROTOCOL : string; 
    SSL_COMMON_NAME : string; 
    SSL_PUBLIC_KEY_TYPE : string;
    SSL_CERT_VERSION :string; 
    SSL_START_DATE : string;
    SSL_EXPIRE_DATE : string; 
    SSL_ISSUE_COUNTRY : string;
    SSL_ISSUER_ORGANISATION : string;
    SSL_ISSUER_ORGANISATIONAL_UNIT : string; 
    SSL_ISSUER_COMMON_NAME : string; 
    SSL_ISSUER_LOCALITY : string; 
    SSL_ISSUER_STATE : string; 
    SSL_NAME_MATCH : boolean; 
 };

 export type HostCertList = {
     hosts : HostCertInfo[];
 }