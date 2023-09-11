// panggil fungsi readline 
const readline = require('./readline');
//  panggil fungsi untuk menyimpan database sementara
const databaseKontak = require('./storage');

// buat object kosong untuk menampung inputan 
let objectKontak = {
    nama : '',
    nomorHp : ''
}


function viewMenu() { //fungsi untuk menampilkan halaman menu
    console.log("Selamat Datang Di Aplikasi Kontak !");
    console.log("====================================\n");
    console.log("Main Menu :\n");
    console.log("1.Tambah Data \n");
    console.log("2.Lihat Data \n");
    console.log("3.Hapus Data \n");
    console.log("4.Pencarian Data \n");
    console.log("5.Reset Data \n");
    readline.question(`Silahkan Masukan Pilihan Anda  :`, input => {
        mainMenu(Number(input))
    });
}



function mainMenu(pilihan) { // fungsi untuk mengatur pilihan menu
    switch (pilihan) {
        case 1:
            simpan()
            break;
        case 2:
            lihatData() 
            break;
        case 3:
            hapusData()
            break;
        case 4:
            pencarianData()
            break;
        case 5:
            resetData();
            break
        default:
            console.log("Pilihan Tidak Valid !");
            readline.close()
            break;
    }
}



function simpan() { // fungsi untuk menyimpan data
    console.log("Silahkan Masukan Data ! : ");
        readline.question("Nama : ", (nama) => {
            let nonNumberRegex = /^[^\d]+$/;
            if(nonNumberRegex.test(nama)){
                objectKontak.nama = nama;
                console.log(`Hallo ${nama}, namamu berhasil di input`)
                ambilInputanNomor();
            }else{
                console.log("Masukan nama yang valid");
                kembali();
            }
        })
    }

const ambilInputanNomor = () => { // fungsi untuk mengambil inputan nomor
    readline.question("Nomor :", (nomor) => {
       const nomorHP = parseInt(nomor);
       if(isNaN(nomorHP) || objectKontak.nomorHp == nomorHP){
        console.log("Masukan Nomer HP Anda dengan Angka");
        kembali();
        }
        else {
        objectKontak.nomorHp = nomorHP;
       };

        console.log("Nomer Hp Berhasil di masukan")
        databaseKontak.push({...objectKontak});
     

        kembali()
    })
}
const kembali = () => { // fungsi untuk navigasi kembali
    readline.question("Apakah Anda Ingin Kembali ? (y/n) :", (pilihan) => {
        if(pilihan === "y"){
            viewMenu()
        }else {
            readline.close()
        }
        
    })
}

function lihatData () { // fungsi untuk melihat list data
    console.table(databaseKontak);
    kembali()
}

function resetData () {
    databaseKontak.splice(0, databaseKontak.length);
    console.log("Data berhasil di reset")
    kembali()
}

function pencarianData () {
    readline.question("Masukan Nama Atau inisial untuk mendapatkan data :" , (i) => {
        const inisial = i;

        const searchByInisial = databaseKontak.filter((data) => {
           return data.nama.includes(inisial);
        })

        console.table(searchByInisial);
        kembali();
    })
}
function hapusData () {
    readline.question("Masukan Index : ",  (index) => {
        const hpsData = databaseKontak.splice(index, 1);
        console.log(`Data dengan index ke ${index} sudah terhapus`);
        console.log(hpsData);
        kembali();
    })
}


viewMenu() // panggil fungsi view menu untuk pertama kali
