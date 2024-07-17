// Event listener untuk tombol submit
document.querySelector('.submit-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Mencegah perilaku default form ketika tombol diklik
    handleSubmit();
  });
  
  // Event listener untuk tombol reset
  document.querySelector('.reset-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Mencegah perilaku default form ketika tombol diklik
    resetForm();
  });
  
  // Fungsi untuk menangani submit form
  function handleSubmit() {
    // Mengambil nilai input, diubah ke tipe data float
    var beratBadan = parseFloat(document.getElementById('inputBB').value);
    var tinggiBadan = parseFloat(document.getElementById('inputTB').value) / 100; // Konversi cm ke meter
    var usia = parseInt(document.getElementById('inputUsia').value);
    var jenisKelamin = document.querySelector('input[name="gridRadios"]:checked');
  
    // Memvalidasi input
    if (!validateInput(beratBadan, tinggiBadan, usia, jenisKelamin)) {
      alert('Silakan isi semua kolom dengan benar.');
      return;
    }
  
    // Menghitung BMI
    var bmi = calculateBMI(beratBadan, tinggiBadan);
    var kategori = determineBMICategory(bmi);
    var minIdealWeight = calculateIdealWeight(18.5, tinggiBadan);
    var maxIdealWeight = calculateIdealWeight(24.9, tinggiBadan);
  
    // Menentukan kategori dan saran
    var category = determineCategory(bmi);
    var way = determineWay(bmi);
    var how = determineHow(bmi);
    var keep = determineKeep(bmi);
  
    // Menampilkan hasil
    displayResults(bmi, kategori, minIdealWeight, maxIdealWeight, category, way, how, keep);
  }
  
  // Fungsi untuk validasi input
  function validateInput(beratBadan, tinggiBadan, usia, jenisKelamin) {
    return !(isNaN(beratBadan) || isNaN(tinggiBadan) || tinggiBadan <= 0 || isNaN(usia) || usia <= 0 || !jenisKelamin);
  }
  
  // Fungsi untuk menghitung BMI
  function calculateBMI(beratBadan, tinggiBadan) {
    return (beratBadan / (tinggiBadan * tinggiBadan)).toFixed(1);
  }
  
  // Fungsi untuk menentukan kategori BMI
  function determineBMICategory(bmi) {
    if (bmi < 18.5) {
      return 'Kekurangan Berat Badan';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return 'Berat Badan Normal (Ideal)';
    } else if (bmi >= 25 && bmi <= 29.9) {
      return 'Kelebihan Berat Badan';
    } else {
      return 'Kegemukan (Obesitas)';
    }
  }
  
  // Fungsi untuk menghitung berat badan ideal
  function calculateIdealWeight(bmi, tinggiBadan) {
    return (bmi * tinggiBadan * tinggiBadan).toFixed(1);
  }
  
  // Fungsi untuk menentukan kategori berat badan
  function determineCategory(bmi) {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return 'Ideal';
    } else if (bmi >= 25 && bmi <= 29.9) {
      return 'Overweight';
    } else {
      return 'Obesity';
    }
  }
  
  // Fungsi untuk menentukan cara yang harus dilakukan
  function determineWay(bmi) {
    if (bmi < 18.5) {
      return 'menaikkan';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return 'menjaga';
    } else {
      return 'menurunkan';
    }
  }
  
  // Fungsi untuk menentukan kegiatan yang harus dilakukan
  function determineHow(bmi) {
    if (bmi < 18.5) {
      return 'menambah kalor makanan yang dikonsumsi dan olahraga angkat beban';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return 'menjaga pola makan dan olahraga teratur';
    } else {
      return 'mengatur kalor makanan yang dikonsumsi dan berolahraga';
    }
  }
  
  // Fungsi untuk menentukan batas perubahan berat badan
  function determineKeep(bmi) {
    if (bmi < 18.5 || bmi > 24.9) {
      return 'hingga';
    } else {
      return 'tetap dalam';
    }
  }
  
  // Fungsi untuk menampilkan hasil
  function displayResults(bmi, kategori, minIdealWeight, maxIdealWeight, category, way, how, keep) {
    document.getElementById('calcBMI').textContent = bmi; // Hasil perhitungan BMI
    document.querySelector('.result-content p:nth-child(3)').innerHTML = 'Anda memiliki <b>' + kategori + '</b>'; // Hasil kategori BMI
    document.querySelector('.result p:nth-child(1)').innerHTML = 'Berat badan ideal Anda adalah di antara <b>' + minIdealWeight + '</b> kg dan <b>' + maxIdealWeight + '</b> kg.'; // Hasil berat badan ideal
    document.querySelector('.result p:nth-child(2)').innerHTML = 'Anda berada dalam kategori <b>' + category + '</b>.';
    document.querySelector('.result p:nth-child(3)').innerHTML = 'Cara terbaik untuk ' + way + ' berat badan adalah dengan ' + how + '.';
    document.querySelector('.result p:nth-child(4)').innerHTML = 'Jika BMI Anda berada dalam kategori ini, maka Anda dianjurkan untuk ' + way + ' berat badan ' + keep + ' batas normal.';
  }
  
  // Fungsi untuk mereset form
  function resetForm() {
    document.getElementById('calcBMI').textContent = '00.0';
    document.getElementById('inputBB').value = '';
    document.getElementById('inputUsia').value = '';
    document.getElementById('inputTB').value = '';
    var checkedRadio = document.querySelector('input[name="gridRadios"]:checked');
    if (checkedRadio) {
      checkedRadio.checked = false;
    }
    document.querySelector('.result-content p:nth-child(3)').innerHTML = '';
    document.querySelector('.result p:nth-child(1)').innerHTML = '';
    document.querySelector('.result p:nth-child(2)').innerHTML = '';
    document.querySelector('.result p:nth-child(3)').innerHTML = '';
    document.querySelector('.result p:nth-child(4)').innerHTML = '';
  }
  