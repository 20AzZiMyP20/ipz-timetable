window.Region = {};

class RequestService {
    async get(src) {
        let elem = document.createElement("script");

        elem.src = src + `&callback=window.Region.req`;
        document.head.appendChild(elem);

        return new Promise((res, rej) => {
            window.Region.req = res;
        });
    }
}

export const requestService = new RequestService();

