function index(){
    let app = document.getElementById('app');
    let h3 = document.createElement('h3');
    h3.innerHTML= 'Prayer Times';
    app.appendChild(h3);
}
index();
function prayerTimes(latitude,longitude){
    fetch('https://api.aladhan.com/v1/calendar?latitude='+ latitude + '&longitude='+ longitude +'&method=4')
    // menjadikan data json
    .then(Response => Response.json())
    .then(function(Response){
        // mengambil tanggal user ketika melihat prayer times
        let date = new Date();
        let today = date.getDate() - 1;
        let data = Response.data[today].timings;
        console.log(data);

        let table = document.createElement('table');
        let tableBody = document.createElement('tbody');

        for(i in data){
            let row = tableBody.insertRow();
            let name = row.insertCell(0);
            let time = row.insertCell(1);
            name.innerHTML =  i;
            time.innerHTML = data[i];
            tableBody.appendChild(row);
            table.appendChild(tableBody);
        }
        app.appendChild(table);

    });
}
function success(position){
    // position coordinat diambil dari navigator geolocations
    prayerTimes(position.coords.latitude, position.coords.longitude);
}
function error(){
    // default ktika user tidak mengizinkan akses lokasi, maka akan berpatok pada wilayah tangerang
    prayerTimes('-6.178306', '106.631889');
}
function UserLocations(){
    if(!navigator.geolocation){
        alert("Lokasi anda tidak didukung didalam browser anda, silahkan gunakan browser lain");
    }else{
        // ini fungsi untuk mendapatkan posisi si user dan meminta izin
        navigator.geolocation.getCurrentPosition(success, error);
    }
}
UserLocations();