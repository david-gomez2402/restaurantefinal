document.addEventListener('DOMContentLoaded', () => {
    let carrito = [];
    const listaPedido = document.getElementById('listaPedido');
    const totalPedido = document.getElementById('totalPedido');
    const btnGenerarTicket = document.getElementById('btnGenerarTicket');
    const numMesa = document.getElementById('numMesa');

    // Función para agregar al pedido
    document.querySelectorAll('.btn-agregar').forEach(boton => {
        boton.addEventListener('click', () => {
            const nombre = boton.getAttribute('data-nombre');
            const precio = parseFloat(boton.getAttribute('data-precio'));

            carrito.push({ nombre, precio });
            actualizarInterfaz();
        });
    });

    function actualizarInterfaz() {
        if (carrito.length === 0) {
            listaPedido.innerHTML = '<li class="list-group-item text-center text-muted">No hay productos</li>';
            btnGenerarTicket.disabled = true;
        } else {
            listaPedido.innerHTML = '';
            let subtotal = 0;

            carrito.forEach((item, index) => {
                subtotal += item.precio;
                listaPedido.innerHTML += `
                    <li class="list-group-item">
                        ${item.nombre} 
                        <span>$${item.precio.toFixed(2)} 
                        <i class="bi bi-trash text-danger ms-2" style="cursor:pointer" onclick="eliminarItem(${index})"></i></span>
                    </li>`;
            });

            totalPedido.innerText = `$${subtotal.toFixed(2)}`;
            btnGenerarTicket.disabled = false;
        }
    }

    // Función global para eliminar (necesaria para el onclick)
    window.eliminarItem = (index) => {
        carrito.splice(index, 1);
        actualizarInterfaz();
    };

    // Generar el Ticket Final
    btnGenerarTicket.addEventListener('click', () => {
        if (!numMesa.value) {
            alert("Por favor, ingresa el número de mesa.");
            return;
        }

        // Llenar datos en el Modal
        document.getElementById('tMesa').innerText = numMesa.value;
        const tItems = document.getElementById('tItems');
        tItems.innerHTML = '';
        
        let total = 0;
        carrito.forEach(item => {
            total += item.precio;
            tItems.innerHTML += `<div class="d-flex justify-content-between"><span>${item.nombre}</span> <span>$${item.precio.toFixed(2)}</span></div>`;
        });

        document.getElementById('tTotal').innerText = `$${total.toFixed(2)}`;

        // Mostrar Modal
        const myModal = new bootstrap.Modal(document.getElementById('ticketModal'));
        myModal.show();
    });
});