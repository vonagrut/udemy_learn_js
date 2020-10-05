const newPost = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok){
        throw new Error(`Can not get resource from ${url}. Request status is ${res.status}`);
    }
    return await res.json();
};

export {newPost};
export {getResource};