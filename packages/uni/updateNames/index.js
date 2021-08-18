// import fs from 'fs';
import got from 'got';
class Character {
    codepoint;
    name;
    // When new DBs are available, will need to update this URL
    static DATABASE_URL = 'https://www.unicode.org/Public/13.0.0/ucd/UnicodeData.txt';
    constructor(codepoint, name) {
        this.codepoint = codepoint;
        this.name = name;
    }
    static getFromLine(line) {
        const fields = line.trim().split(';');
        const codepoint = parseInt(fields[0], 16);
        const name = fields[1];
        return new Character(codepoint, name);
    }
    static async getAllFromDatabase() {
        return await got(this.DATABASE_URL)
            .then((response) => {
            return response.body.split('\n').map((line) => this.getFromLine(line));
        });
    }
}
Character.getAllFromDatabase().then((c) => { console.log(c); });
// console.log(await Character.getAllFromDatabase());
