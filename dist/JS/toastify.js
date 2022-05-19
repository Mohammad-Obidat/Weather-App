class ToastifyManager {
  constructor() {}

  alertToastify(text) {
    Toastify({
      text: text,
      duration: 2000,
      newWindow: true,
      className: 'cityNotFound',
      onClick: function () {},
    }).showToast();
  }
}
