function perkenalan(nama, umur, pekerjaan){
  return `halo nama saya ${nama}, saya ${umur} tahun, dan saya sebagai ${pekerjaan}`;
}

const My = {
  nama: 'Haikal Firansyah',
  umur: 18,
  pekerjaan: 'web developer',
}

const waifus = ['Yoroizuka Mizore', 'Shirakami Fubuki', 'Vestia Zeta', 'Nanashi Mumei', 'Takanashi Izumi', 'Kato Megumi']


module.exports = {
  perkenalan,
  My,
  waifus,
}