const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');
const { stringify, parse } = require('querystring');

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
                    console.log(data)
                    resolve(JSON.parse(data));
                }
            });
        });
    }

    static async writeLocationToFile(location) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, JSON.stringify(location), (err) => {
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
        
        fs.readFile(filePath, 'utf-8', (err,data) => {
            if (err) {
                console.error('Erro ao ler o arquivo:', err);
                return;
            }
            let database = []
            database = JSON.parse(data)

            database.push(location)

            this.writeLocationToFile(database)
            this.getLocation
        })
      
    }


}

module.exports = LocationModel;