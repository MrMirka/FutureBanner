function getJSON(url){
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'json';
    request.send();
    return request;
}

export {getJSON};
