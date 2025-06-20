// const coba = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("promise selesai");
//   }, 5000);
// });
// console.log(coba);
// coba.then((hasil) => {
//   console.log(hasil);
// });

function cobaPromise() {
  return new Promise((resolve, reject) => {
    let waktu = 4000;
    if (waktu <= 5000) {
      setTimeout(() => {
        resolve("promise selesai");
      }, waktu);
    } else {
      reject("waktu melebihi 5 detik");
    }
  });
}
// console.log(cobaPromise());
// cobaPromise()
//   .then((hasil) => {
//     console.log(hasil);
//   })
//   .catch((hasil) => console.log(hasil));

// pake async function
async function cobaAsync() {
  // pake try catch
  try {
    const coba = await cobaPromise();
    console.log(coba);
  } catch (error) {
    console.log(error);
  }
}

cobaAsync();
