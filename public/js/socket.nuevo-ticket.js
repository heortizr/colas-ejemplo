// establecer conexion
const socket = io();
const lbl = $('#lblNuevoTicket');

socket.on('connect', () => {});

socket.on('disconnect', () => {});

socket.on('estadoActual', (data) => {
    lbl.text(data.actual);
});

$('button').on('click', () => {
    socket.emit('siguienteTicket', null, (siguienteTiket) => {
        lbl.text(siguienteTiket);
    });
});