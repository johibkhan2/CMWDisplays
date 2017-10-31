/** root url and sub urls of back end app*/
const rootUrl='http://localhost:3001/'
export var urls={
authUrl:rootUrl+'login',
getFilesUrl:rootUrl+'1', 
getFileTypesUrl:rootUrl+'2', 
getControllerTypesUrl:rootUrl+'3',
getGroupsUrl : 'http://localhost:8080/data/groups.json',
getSupportFilesUrl:rootUrl+'4',
getFirmwareFilesUrl:rootUrl+'5',
downloadFileFromDBUrl:rootUrl,
downloadFileFromSystemUrl:rootUrl,
deleteSessionUrl:rootUrl+'api/Session/Delete',
getDealerIdUrl:rootUrl+'api/DealerID/'
};
