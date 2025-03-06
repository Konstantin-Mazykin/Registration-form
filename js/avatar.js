
const avatarInput = formRegistration.querySelector('.input-avatar');
const viewImage = formRegistration.querySelector('.form-user-avatar');

avatarInput.addEventListener('change', saveAvatar);

function saveAvatar() {
    let f = this.files[0];
    if (f) {
        viewImage.src = URL.createObjectURL(f);
        localStorage.setItem('myImage', viewImage.src);
    }
    viewImage.src = localStorage.getItem('myImage')
}