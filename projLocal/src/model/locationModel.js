const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');

const fileName = 'dbLocation.json';
const filePath = path.join(__dirname, '..', 'database', fileName);

class LocationModel {
    static async getLocation() {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        this.writeLocationToFile([]).then(resolve).catch(reject);
                    } else {
                        reject(err);
                    }
                } else {
                    resolve(JSON.parse(data));
                }
            });
        });
    }

    static async writeLocationToFile(location) {
        return new Promise((resolve, reject) => {
            fs.appendFileSync(filePath, JSON.stringify(location), (err) => {
                if (err) reject(err);
                console.log(`Data written to file: ${filePath}`);
                resolve(this.getAllLocation());
            });
        });
    }

    static async getAllLocation() {
        const locations = await this.getLocation();
        console.log(locations);
        return locations;
    }

    static async createLocation(location){
        const locations = []
        locations.push(location)

        fs.appendFileSync(filePath, JSON.stringify(locations), (err) => {
            if (err) reject(err);
            console.log(`Data written to file: ${filePath}`);
            resolve(this.getAllLocation());
        });
        console.log(locations)
        
    }


}

module.exports = LocationModel;