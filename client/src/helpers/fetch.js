const BASEURL = process.env.REACT_APP_API_URL;

const fetchNoToken = ( endpoint, data, method='GET' ) => {
    const url = `${ BASEURL }/${ endpoint }`;

    if( method === 'GET' ){
        return fetch( url );
    }else{
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}

export {
    fetchNoToken
}