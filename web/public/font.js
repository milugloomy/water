import fontList from 'font-list'

console.log(process.platform);

fontList.getFonts().then(fonts => {
  for (let i = 0; i < fonts.length; i++) {
    console.log(fonts[i]);
  }
})
/*
"Academy Engraved LET"
"Al Bayan"
"Al Nile"
"Al Tarikh"
"American Typewriter"
"Andale Mono"
"Apple Braille"
"Apple Chancery"
"Apple Color Emoji"
"Apple LiGothic"
"Apple LiSung"
"Apple SD Gothic Neo"
"Apple Symbols"
AppleGothic
AppleMyungjo
Arial
"Arial Black"
"Arial Hebrew Scholar"
"Arial Hebrew"
"Arial Narrow"
"Arial Rounded MT Bold"
"Arial Unicode MS"
Avenir
"Avenir Next Condensed"
"Avenir Next"
Ayuthaya
Baghdad
"Bangla MN"
"Bangla Sangam MN"
"Baoli SC"
"Baoli TC"
Baskerville
Beirut
BiauKai
"Big Caslon"
"BM Dohyeon"
"BM Hanna 11yrs Old"
"BM Hanna Air"
"BM Hanna Pro"
"BM Jua"
"BM Kirang Haerang"
"BM Yeonsung"
"Bodoni 72 Oldstyle"
"Bodoni 72 Smallcaps"
"Bodoni 72"
"Bodoni Ornaments"
"Bradley Hand"
"Brush Script MT"
Chalkboard
"Chalkboard SE"
Chalkduster
Charter
Cochin
"Comic Sans MS"
Copperplate
"Corsiva Hebrew"
"Courier New"
Damascus
"DecoType Naskh"
"Devanagari MT"
"Devanagari Sangam MN"
Didot
"DIN Alternate"
"DIN Condensed"
"Diwan Kufi"
"Diwan Thuluth"
"Euphemia UCAS"
Farah
Farisi
Futura
Galvji
"GB18030 Bitmap"
"Geeza Pro"
Geneva
Georgia
"Gill Sans"
"Grantha Sangam MN"
"Gujarati MT"
"Gujarati Sangam MN"
GungSeo
"Gurmukhi MN"
"Gurmukhi MT"
"Gurmukhi Sangam MN"
"Hannotate SC"
"Hannotate TC"
"HanziPen SC"
"HanziPen TC"
HeadLineA
Hei
"Heiti SC"
"Heiti TC"
Helvetica
"Helvetica Neue"
Herculanum
"Hiragino Maru Gothic ProN"
"Hiragino Mincho ProN"
"Hiragino Sans CNS"
"Hiragino Sans GB"
"Hiragino Sans"
"Hoefler Text"
Impact
InaiMathi
"ITF Devanagari Marathi"
"ITF Devanagari"
Kai
Kailasa
"Kaiti SC"
"Kaiti TC"
"Kannada MN"
"Kannada Sangam MN"
Kefa
"Khmer MN"
"Khmer Sangam MN"
Klee
"Kohinoor Bangla"
"Kohinoor Devanagari"
"Kohinoor Gujarati"
"Kohinoor Telugu"
Kokonor
Krungthep
KufiStandardGK
"Lantinghei SC"
"Lantinghei TC"
"Lao MN"
"Lao Sangam MN"
"Libian SC"
"Libian TC"
"LiHei Pro"
"LingWai SC"
"LingWai TC"
"LiSong Pro"
"Lucida Grande"
Luminari
"Malayalam MN"
"Malayalam Sangam MN"
"Marker Felt"
Menlo
"Microsoft Sans Serif"
Mishafi
"Mishafi Gold"
Monaco
Mshtakan
"Mukta Mahee"
Muna
"Myanmar MN"
"Myanmar Sangam MN"
Nadeem
"Nanum Brush Script"
"Nanum Gothic"
"Nanum Myeongjo"
"Nanum Pen Script"
"New Peninim MT"
Noteworthy
"Noto Nastaliq Urdu"
"Noto Sans Kannada"
"Noto Sans Myanmar"
"Noto Sans Oriya"
"Noto Serif Myanmar"
Optima
"Oriya MN"
"Oriya Sangam MN"
Osaka
Palatino
Papyrus
"Party LET"
PCMyungjo
Phosphate
PilGi
"PingFang HK"
"PingFang SC"
"PingFang TC"
"Plantagenet Cherokee"
"PSL Ornanong Pro"
"PT Mono"
"PT Sans Caption"
"PT Sans Narrow"
"PT Sans"
"PT Serif Caption"
"PT Serif"
Raanana
Rockwell
Sana
Sathu
"Savoye LET"
"Shree Devanagari 714"
SignPainter
Silom
SimSong
"Sinhala MN"
"Sinhala Sangam MN"
Skia
"Snell Roundhand"
"Songti SC"
"Songti TC"
STFangsong
STHeiti
STIXGeneral
STIXIntegralsD
STIXIntegralsSm
STIXIntegralsUp
STIXIntegralsUpD
STIXIntegralsUpSm
STIXNonUnicode
STIXSizeFiveSym
STIXSizeFourSym
STIXSizeOneSym
STIXSizeThreeSym
STIXSizeTwoSym
STIXVariants
STKaiti
STSong
"Sukhumvit Set"
Symbol
Tahoma
"Tamil MN"
"Tamil Sangam MN"
"Telugu MN"
"Telugu Sangam MN"
Thonburi
"Times New Roman"
"Toppan Bunkyu Gothic"
"Toppan Bunkyu Midashi Gothic"
"Toppan Bunkyu Midashi Mincho"
"Toppan Bunkyu Mincho"
Trattatello
"Trebuchet MS"
"Tsukushi A Round Gothic"
"Tsukushi B Round Gothic"
Verdana
Waseem
"Wawati SC"
"Wawati TC"
Webdings
"Weibei SC"
"Weibei TC"
Wingdings
"Wingdings 2"
"Wingdings 3"
"Xingkai SC"
"Xingkai TC"
"Yuanti SC"
"Yuanti TC"
YuGothic
YuKyokasho
"YuKyokasho Yoko"
YuMincho
"YuMincho +36p Kana"
"Yuppy SC"
"Yuppy TC"
"Zapf Dingbats"
Zapfino
*/
