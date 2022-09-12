localStorage.setItem = (key, value, date) => {
    localStorage[key] = !!date ? JSON.stringify({ value, date }) : value
}

localStorage.getItem = (key) => {
    if (!localStorage[key]) {
        console.error(`${key} is not found.`);
        return
    }

    if (isConvertableToJson(localStorage[key])) {
        if ('date' in JSON.parse(localStorage[key])) {
            if (new Date > new Date(JSON.parse(localStorage[key]).date)) {
                console.warn(`${key} expiration is end`)
                delete localStorage[key];
                return;
            }
        }
        return JSON.parse(localStorage[key])
    }
    else {
        return localStorage[key]
    }
}

const isConvertableToJson = string => {
    try {
        return JSON.parse(string);
    }
    catch (ex) {
        return false
    }
}


localStorage.setItem("name", "tim", new Date('2022-09-12 22:22:00'));
console.log(localStorage.getItem("name"))