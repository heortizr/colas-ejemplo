const socket = io();

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es necesario');
}

const escritorio = searchParams.get('escritorio');

$('h1').text('Escritorio: ' + escritorio);

$('button').on('click', () => {
    socket.emit('atenderTicket', { escritorio }, (resp) => {
        if (resp === 'no hay tickets') {
            $('small').text(resp);
            alert(resp);
            return;
        }
        $('small').text(resp.numero);
    });
});