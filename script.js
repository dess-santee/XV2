// Definición de la función de animación (disponible globalmente para el onclick)
function abrirInvitacion() {
    const wrapper = document.querySelector('.envelope-wrapper');
    if (wrapper) {
        wrapper.classList.add('open');
    }
    
    // Reproduce la música de fondo
    const musica = document.getElementById('musica');
    if (musica) {
        musica.play().catch(e => console.log("El navegador bloqueó la reproducción automática hasta interactuar."));
    }
    
    // Espera a que termine la animación del sobre para ocultar la portada
    setTimeout(() => {
        const pantallaInicio = document.getElementById('pantalla-inicio');
        if (pantallaInicio) {
            pantallaInicio.classList.add('oculto');
        }
    }, 1800);
}

document.addEventListener('DOMContentLoaded', () => {

    // 📱 Número de WhatsApp configurado
    const NUMERO_WHATSAPP = "522212008319";

    // 📅 Configuración de fecha para los XV Años (Año, Mes - 1, Día, Hora, Minuto)
    const fechaEvento = new Date(2026, 8, 18, 19, 0, 0).getTime();

    // 1. BOTÓN DE MÚSICA (Play / Pausa manual)
    const btnMusica = document.getElementById('btn-musica');
    const musica = document.getElementById('musica');

    if (btnMusica && musica) {
        btnMusica.addEventListener('click', () => {
            if (musica.paused) {
                musica.play();
                btnMusica.textContent = '🎵';
            } else {
                musica.pause();
                btnMusica.textContent = '🔇';
            }
        });
    }

    // 2. CUENTA REGRESIVA
    const interval = setInterval(() => {
        const ahora = new Date().getTime();
        const diferencia = fechaEvento - ahora;

        if (diferencia < 0) {
            clearInterval(interval);
            const countdownEl = document.getElementById('cuenta-regresiva');
            if (countdownEl) {
                countdownEl.innerHTML = "<h3 style='color:#d4af37;'>¡Llegó el gran día!</h3>";
            }
            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        const elDias = document.getElementById('dias');
        const elHoras = document.getElementById('horas');
        const elMinutos = document.getElementById('minutos');
        const elSegundos = document.getElementById('segundos');

        if (elDias) elDias.textContent = dias < 10 ? '0' + dias : dias;
        if (elHoras) elHoras.textContent = horas < 10 ? '0' + horas : horas;
        if (elMinutos) elMinutos.textContent = minutos < 10 ? '0' + minutos : minutos;
        if (elSegundos) elSegundos.textContent = segundos < 10 ? '0' + segundos : segundos;
    }, 1000);

    // 3. ENVÍO A WHATSAPP (Corregido)
    const form = document.getElementById('form-confirmacion');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const asistencia = document.getElementById('asistencia').value;

            const mensaje = `¡Hola! Soy *${nombre}*.\n\n` +
                            `*Asistencia:* ${asistencia}\n` +
                            `¡Muchas gracias por la invitación! ✨`;

            const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
            window.open(url, '_blank');
        });
    }
});
