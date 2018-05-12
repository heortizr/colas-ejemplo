const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        let data = require('../data/data.json');

        this.ultimo = 0;
        this.hoy = new Date().getDay();
        this.tickets = [];
        this.ultimos4 = [];

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            tickets: this.tickets,
            ultimos4: this.ultimos4,
            hoy: this.hoy
        };

        fs.writeFileSync(
            './server/data/data.json',
            JSON.stringify(jsonData)
        );
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
    }

    siguinte() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            console.log('llego');
            return 'no hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.lenght > 4) {
            // borrar el ultimo
            this.ultimos4.splice(-1, 1);
        }

        this.grabarArchivo();

        return atenderTicket;
    }

}

module.exports = {
    TicketControl
};