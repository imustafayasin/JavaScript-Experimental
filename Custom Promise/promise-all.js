
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.customAll = async (promises, cal) => {
    let results = [];
    let isRejected = false;
    for await (const promise of promises) {
        if (isRejected) break;
        Promise.resolve(promise).then(p => results.push(p)).catch(e => {
            isRejected = true;
            results = e;
        });
    }

    return Promise.resolve(results).catch(e => results);
}

Promise.customAll([]).then(res => console.log({ res })).catch(err => console.log({ err }));
