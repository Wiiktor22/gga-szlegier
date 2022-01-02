const arrayShuffle = require('./utils');
const { plot } = require("nodeplotlib");

class KCenterProblemAlgorithm {

    hospitals = [];
    cities = [];

    paramsToDraw = [];
    colors = ['rgb(184, 46, 28)', 'rgb(28, 119, 184)', 'rgb(130, 196, 124)', 'rgb(217, 140, 39)', 'rgb(235,223,5)', 'rgb(52,87,49)', 'rgb(135,5,235)', 'rgb(235,5,212)'];

    // Metoda odpowiedzialna za walidację wprowadzonych danych
    validateData(numberOfHospitals, numberOfCities) {
        if (numberOfHospitals === 0) {
            throw new Error('Liczba szpitali musi być większa od 0!');
        } else if (numberOfHospitals > numberOfCities) {
            throw new Error('Liczba szpitali nie może być większa od liczby miast!')
        }
    }

    // Metoda licząca dystans dla jednego miasta
    calculateDistanceForOneCity(city, hospital, index) {
        const distanceFromHospital = city.distanceFrom(hospital);

        if (city.distance) {
            const oldDistance = city.distance;
            city.distance = Math.min(distanceFromHospital, city.distance);
            if (distanceFromHospital < oldDistance) city.hospitalIndex = index
        } else {
            city.distance = distanceFromHospital
            city.hospitalIndex = index;
        }

        return city
    }

    // Metoda wywoływana w sytuacji gdy liczba miast jest większa niż liczba szpitali
    performAlgorithmForNormalConditions(numberOfHospitals) {
        const firstHospital = this.cities[0];
        this.hospitals.push(firstHospital);
        const indexOfCityToRemove = [...this.cities].findIndex(city => city.x === firstHospital.x && city.y === firstHospital.y);
        this.cities = [...this.cities].filter((c, i) => i !== indexOfCityToRemove)

        for (let i = 0; i < numberOfHospitals; i++) {
            let furthestCity;
            let furthestDistance = 0;

            this.cities.map(city => {
                const newCityObject = this.calculateDistanceForOneCity(city, this.hospitals[i], i)

                if (newCityObject.distance > furthestDistance) {
                    furthestDistance = newCityObject.distance;
                    furthestCity = newCityObject;
                }

                return newCityObject
            })

            if (i !== numberOfHospitals - 1) {
                this.hospitals = [...this.hospitals, furthestCity];
                const indexOfCityToRemove = [...this.cities].findIndex(city => city.x === furthestCity.x && city.y === furthestCity.y);
                this.cities = [...this.cities].filter((c, i) => i !== indexOfCityToRemove)
            }
        }
    }

    execute(numberOfHospitals, cities) {
        this.validateData(numberOfHospitals, cities.length);

        if (numberOfHospitals === cities.length) {
            this.hospitals = cities;
        } else {
            this.cities = arrayShuffle(cities);
            this.performAlgorithmForNormalConditions(numberOfHospitals);
            this.draw();
        }
    }

    draw() {
        this.drawHospitals();
        this.drawCities();
        plot(
            this.paramsToDraw, {
            title: 'Problem lokalizacji szpitali',
        }
        );
    }

    drawCities() {
        this.cities.forEach(({ x, y, hospitalIndex }) => {
            this.paramsToDraw.push({
                x: [x],
                y: [y],
                mode: 'markers',
                marker: {
                    color: this.colors[hospitalIndex],
                    size: 8
                },
                name: 'Miasto'
            })
        })
    }

    drawHospitals() {
        this.hospitals.forEach(({ x, y }, index) => {
            this.paramsToDraw.push({
                x: [x],
                y: [y],
                mode: 'markers',
                marker: {
                    color: this.colors[index],
                    size: 18
                },
                name: 'Szpital'
            })
        })
    }

}

module.exports = KCenterProblemAlgorithm;