
const avatarInput = formRegistration.querySelector('.input-avatar');
const viewImage = formRegistration.querySelector('.form-user-avatar');

avatarInput.addEventListener('change', saveAvatar);

function saveAvatar() {
    let file = this.files[0];
    if (file) {
        viewImage.src = URL.createObjectURL(file);
        localStorage.setItem('myImage', viewImage.src);
    }
    viewImage.src = localStorage.getItem('myImage')
}