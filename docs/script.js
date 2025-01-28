function openModal() {
    var modal = new bootstrap.Modal(document.getElementById('customModal'));
    modal.show();
}

function closeModal() {
    var modalEl = document.getElementById('customModal');
    var modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
}
