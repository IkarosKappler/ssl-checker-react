import * as React from 'react';

import { Button, Typography } from '@material-ui/core';
import AutorenewIcon from '@material-ui/icons/Autorenew';

// import HostCertListController from '../controllers/HostCertListController';
import { useCertListProvider } from '../providers/CertListProvider/provider';
import { HostCertInfo, HostCertList } from '../types/HostCertList';

export interface IMainAppContainerProps {
  compiler: string;
  framework: string;
}

// The main component as a React.FunctionComponent
export const MainAppContainer: React.FunctionComponent<IMainAppContainerProps> = props => {

  const { loadFromServer, reloadCertInfo, getCertList } = useCertListProvider();

  interface ListEntryProps {
    info: HostCertInfo;
  }

  const certList:HostCertList = getCertList();

  const ListEntry = (props: ListEntryProps): JSX.Element => {
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
      <tr>
        <td>{info.name}</td>
        <td>{info.SSL_COMMON_NAME}</td>
        <td>{info.date}</td>
        <td>{info.SSL_EXPIRE_DATE}</td>
        <td>
          <Button onClick={e=>reloadCertInfo(info.name)}>
            <Typography>
              <AutorenewIcon />
            </Typography>
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <>
      <h1>
        SSL Cert List made with {props.compiler} and {props.framework}!
      </h1>
      <Button onClick={loadFromServer}>
        <Typography>
          <AutorenewIcon />
        </Typography>
      </Button>
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Common Name</th>
                <th>Request date</th>
                <th>Expiration date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
          {certList &&
            certList.hosts.map((info: HostCertInfo, index: number) => {
              console.log("re-render", index, info);
              return (
                <ListEntry
                  key={`listentry_${info.name}`}
                  info={info}
                ></ListEntry>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
