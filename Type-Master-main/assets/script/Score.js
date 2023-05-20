'use strict';

class Score {
    #date;
    #hits;
    #percentage;

    constructor(date, hits, percentage) {
        this.#date= date;
        this.#hits = hits;
        this.#percentage = percentage;
    }

    get hits() {
        return this.#hits;
    }

    get date() {
        return this.#date;
    }

    get percentage() {
        return this.#percentage;
    }
}

export default Score;