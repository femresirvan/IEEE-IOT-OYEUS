var request = new XMLHttpRequest();

request.open('GET', 'https://localhost:3000/api/data', true);

request.onload = function () {
    var data = JSON.parse(this.response);
    //dom eventleri bunun altında gerçekleştirebiliriz.
    if (request.status >= 200 && request.status < 400) {
        console.log(data);
      } else {
        console.log('error');
    }
};

request.send();