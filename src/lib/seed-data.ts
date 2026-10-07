import { Subject, Chapter, Lecture, Quiz, Question, Note } from './types';
import { RAW_QUESTIONS } from './raw-questions';

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'sub-math',
    name: 'Mathematics',
    hindiName: 'गणित',
    code: 'math',
    description: 'वास्तविक संख्याएं, बहुपद, दो चर वाले रैखिक समीकरण, द्विघात, समांतर श्रेणी, त्रिकोणमिति, वृत्त, रचना, सांख्यिकी, प्रायिकता',
    icon: 'Calculator',
    accentColor: '#38bdf8',
    order: 1,
  },
  {
    id: 'sub-science',
    name: 'Science',
    hindiName: 'विज्ञान',
    code: 'science',
    description: 'भौतिकी (प्रकाश, विद्युत), रसायन (अभिक्रियाएं, अम्ल-क्षार, धातु), जीव विज्ञान (जैव प्रक्रम)',
    icon: 'Atom',
    accentColor: '#a855f7',
    order: 2,
  },
  {
    id: 'sub-sst',
    name: 'Social Science',
    hindiName: 'सामाजिक विज्ञान',
    code: 'sst',
    description: 'इतिहास, भूगोल, राजनीति विज्ञान (सत्ता की साझेदारी, संघवाद), अर्थशास्त्र (विकास, मुद्रा, वैश्वीकरण)',
    icon: 'Globe',
    accentColor: '#f59e0b',
    order: 3,
  },
  {
    id: 'sub-hindi',
    name: 'Hindi',
    hindiName: 'हिंदी',
    code: 'hindi',
    description: 'गोधूलि भाग-2 (गद्य एवं पद्य खंड), वर्णिका भाग-2 (दही वाली मंगम्मा) एवं संपूर्ण हिंदी व्याकरण',
    icon: 'Languages',
    accentColor: '#ec4899',
    order: 4,
  },
  {
    id: 'sub-sanskrit',
    name: 'Sanskrit',
    hindiName: 'संस्कृत',
    code: 'sanskrit',
    description: 'पीयूषम भाग-2 (मङ्गलम्, पाटलिपुत्रवैभवम्, आलसकथा, भारतमहिमा) एवं संपूर्ण संस्कृत व्याकरण',
    icon: 'BookOpen',
    accentColor: '#8b5cf6',
    order: 5,
  },
];

export const INITIAL_CHAPTERS: Chapter[] = [
  // Mathematics (12 Complete Chapters)
  { id: 'math-ch1', subjectId: 'sub-math', chapterNum: 1, title: 'Real Numbers', hindiTitle: 'वास्तविक संख्याएं', description: 'यूक्लिड विभाजन, अपरिमेय संख्याएं, HCF/LCM' },
  { id: 'math-ch2', subjectId: 'sub-math', chapterNum: 2, title: 'Polynomials', hindiTitle: 'बहुपद', description: 'शून्यक, गुणांक एवं ज्यामितीय अर्थ' },
  { id: 'math-ch3', subjectId: 'sub-math', chapterNum: 3, title: 'Pair of Linear Equations', hindiTitle: 'दो चर वाले रैखिक समीकरणों का युग्म', description: 'प्रतिस्थापन, विलोपन एवं वज्र गुणन विधि' },
  { id: 'math-ch4', subjectId: 'sub-math', chapterNum: 4, title: 'Quadratic Equations', hindiTitle: 'द्विघात समीकरण', description: 'विविक्तकर, मूल एवं द्विघाती सूत्र' },
  { id: 'math-ch5', subjectId: 'sub-math', chapterNum: 5, title: 'Arithmetic Progressions', hindiTitle: 'समांतर श्रेणी', description: 'सार्व अंतर, n वाँ पद एवं n पदों का योग' },
  { id: 'math-ch6', subjectId: 'sub-math', chapterNum: 6, title: 'Trigonometry', hindiTitle: 'त्रिकोणमिति', description: 'मान सारणी, सर्वसमिकाएं एवं कोण' },
  { id: 'math-ch7', subjectId: 'sub-math', chapterNum: 7, title: 'Circles', hindiTitle: 'वृत्त', description: 'स्पर्श रेखा, त्रिज्या, प्रमेय एवं कोण' },
  { id: 'math-ch8', subjectId: 'sub-math', chapterNum: 8, title: 'Constructions', hindiTitle: 'निर्माण', description: 'रेखाखंड विभाजन, स्पर्श रेखा खींचना एवं त्रिभुज रचना' },
  { id: 'math-ch9', subjectId: 'sub-math', chapterNum: 9, title: 'Areas Related to Circles', hindiTitle: 'क्षेत्रफल से संबंधित प्रश्न', description: 'त्रिज्यखंड, वृत्तखंड एवं छायांकित भाग का क्षेत्रफल' },
  { id: 'math-ch10', subjectId: 'sub-math', chapterNum: 10, title: 'Surface Areas & Volumes', hindiTitle: 'पृष्ठीय क्षेत्रफल और आयतन', description: 'शंकु, गोला, बेलन, छिन्नक का आयतन व वक्रपृष्ठ' },
  { id: 'math-ch11', subjectId: 'sub-math', chapterNum: 11, title: 'Statistics', hindiTitle: 'सांख्यिकी', description: 'माध्य, माध्यिका (माध्यक), बहुलक एवं तोरण' },
  { id: 'math-ch12', subjectId: 'sub-math', chapterNum: 12, title: 'Probability', hindiTitle: 'प्रायिकता', description: 'सिक्का, पासा, ताश एवं निश्चित/असंभव घटना' },

  // Science (9 Complete Chapters)
  { id: 'sci-ch1', subjectId: 'sub-science', chapterNum: 1, title: 'Light - Reflection & Refraction', hindiTitle: 'प्रकाश – परावर्तन और अपवर्तन', description: 'दर्पण, लेंस, अपवर्तनांक, स्नेल का नियम' },
  { id: 'sci-ch2', subjectId: 'sub-science', chapterNum: 2, title: 'Human Eye & Colorful World', hindiTitle: 'मानव नेत्र और रंगीन संसार', description: 'मायोपिया, हाइपरमेट्रोपिया, प्रिज्म, प्रकीर्णन' },
  { id: 'sci-ch3', subjectId: 'sub-science', chapterNum: 3, title: 'Electricity', hindiTitle: 'विद्युत', description: 'ओम का नियम, प्रतिरोध, विभवांतर, शक्ति' },
  { id: 'sci-ch4', subjectId: 'sub-science', chapterNum: 4, title: 'Chemical Reactions & Equations', hindiTitle: 'रासायनिक अभिक्रियाएँ एवं समीकरण', description: 'ऊष्माक्षेपी, संयोजन, विस्थापन, ऑक्सीकरण' },
  { id: 'sci-ch5', subjectId: 'sub-science', chapterNum: 5, title: 'Acids, Bases & Salts', hindiTitle: 'अम्ल, क्षार और लवण', description: 'pH मान, बेकिंग सोडा, विरंजक चूर्ण, POP' },
  { id: 'sci-ch6', subjectId: 'sub-science', chapterNum: 6, title: 'Metals & Non-metals', hindiTitle: 'धातु एवं अधातु', description: 'तन्यता, आघातवर्ध्यता, सुचालक, संक्षारण' },
  { id: 'sci-ch7', subjectId: 'sub-science', chapterNum: 7, title: 'Carbon & Its Compounds', hindiTitle: 'कार्बन और उसके यौगिक', description: 'हीरा, ग्रेफाइट, हाइड्रोकार्बन, साबुनीकरण' },
  { id: 'sci-ch8', subjectId: 'sub-science', chapterNum: 8, title: 'Life Processes', hindiTitle: 'जीवन की प्रक्रियाएँ', description: 'पोषण, श्वसन, उत्सर्जन, रक्त परिसंचरण' },
  { id: 'sci-ch9', subjectId: 'sub-science', chapterNum: 9, title: 'Control & Coordination', hindiTitle: 'नियंत्रण एवं समन्वय', description: 'तंत्रिका तंत्र, मस्तिष्क, हार्मोन, न्यूरॉन' },

  // Social Science (20 Complete Chapters)
  { id: 'sst-ch1', subjectId: 'sub-sst', chapterNum: 1, title: 'Power Sharing', hindiTitle: 'सत्ता की साझेदारी', description: 'शासन के अंग, बेल्जियम और श्रीलंका का मॉडल' },
  { id: 'sst-ch2', subjectId: 'sub-sst', chapterNum: 2, title: 'Federalism', hindiTitle: 'संघवाद', description: 'केंद्र-राज्य संबंध, संघ सूची, राज्य सूची, समवर्ती सूची' },
  { id: 'sst-ch3', subjectId: 'sub-sst', chapterNum: 3, title: 'Democracy & Diversity', hindiTitle: 'लोकतंत्र और विविधता', description: 'सामाजिक विभाजन, समानता एवं नागरिक अधिकार' },
  { id: 'sst-ch4', subjectId: 'sub-sst', chapterNum: 4, title: 'Gender, Religion & Caste', hindiTitle: 'लिंग, धर्म और जाति', description: 'लैंगिक असमानता, धर्मनिरपेक्षता और जातिगत राजनीति' },
  { id: 'sst-ch5', subjectId: 'sub-sst', chapterNum: 5, title: 'Popular Struggles & Movements', hindiTitle: 'लोकप्रिय संघर्ष और आंदोलन', description: 'दबाव समूह, जन आंदोलन एवं लोकतंत्र' },
  { id: 'sst-ch6', subjectId: 'sub-sst', chapterNum: 6, title: 'Political Parties', hindiTitle: 'राजनीतिक दल', description: 'राष्ट्रीय व क्षेत्रीय दल, चुनाव आयोग, कार्य' },
  { id: 'sst-ch7', subjectId: 'sub-sst', chapterNum: 7, title: 'Outcomes of Democracy', hindiTitle: 'परिणामस्वरूप लोकतंत्र', description: 'जवाबदेह शासन, आर्थिक समृद्धि एवं समानता' },
  { id: 'sst-ch8', subjectId: 'sub-sst', chapterNum: 8, title: 'Challenges to Democracy', hindiTitle: 'लोकतंत्र की चुनौतियाँ', description: 'विस्तार, निष्पक्षता एवं लोकतांत्रिक सुधार' },
  { id: 'sst-ch9', subjectId: 'sub-sst', chapterNum: 9, title: 'Nationalism in Europe', hindiTitle: 'यूरोप में राष्ट्रवाद', description: 'मेजिनी, काबूर, बिस्मार्क एवं 1848 की क्रांति' },
  { id: 'sst-ch10', subjectId: 'sub-sst', chapterNum: 10, title: 'Nationalism in India', hindiTitle: 'भारत में राष्ट्रवाद', description: 'असहयोग आंदोलन, दांडी यात्रा, जलियांवाला बाग' },
  { id: 'sst-ch11', subjectId: 'sub-sst', chapterNum: 11, title: 'Minerals & Energy Resources', hindiTitle: 'खनिज और ऊर्जा संसाधन', description: 'लोहा, कोयला, पेट्रोलियम, सौर ऊर्जा' },
  { id: 'sst-ch12', subjectId: 'sub-sst', chapterNum: 12, title: 'Water Resources', hindiTitle: 'जल संसाधन', description: 'बहुउद्देशीय परियोजनाएं, जल संरक्षण एवं वर्षा जल संचयन' },
  { id: 'sst-ch13', subjectId: 'sub-sst', chapterNum: 13, title: 'Agriculture', hindiTitle: 'कृषि', description: 'रबी, खरीफ, जायद फसलें, हरित क्रांति' },
  { id: 'sst-ch14', subjectId: 'sub-sst', chapterNum: 14, title: 'Manufacturing Industries', hindiTitle: 'विनिर्माण उद्योग', description: 'सूती वस्त्र, चीनी, लोहा-इस्पात उद्योग' },
  { id: 'sst-ch15', subjectId: 'sub-sst', chapterNum: 15, title: 'Industries for National Economy', hindiTitle: 'राष्ट्रीय अर्थव्यवस्था के लिए उद्योग', description: 'औद्योगिक विकास एवं सकल घरेलू उत्पाद में योगदान' },
  { id: 'sst-ch16', subjectId: 'sub-sst', chapterNum: 16, title: 'Transport, Communication & Trade', hindiTitle: 'परिवहन, संचार और व्यापार', description: 'रेलवे, राजमार्ग, बंदरगाह, विदेशी व्यापार' },
  { id: 'sst-ch17', subjectId: 'sub-sst', chapterNum: 17, title: 'Development', hindiTitle: 'विकास', description: 'प्रति व्यक्ति आय, मानव विकास सूचकांक, राष्ट्रीय आय' },
  { id: 'sst-ch18', subjectId: 'sub-sst', chapterNum: 18, title: 'Sectors of Indian Economy', hindiTitle: 'भारतीय अर्थव्यवस्था के क्षेत्र', description: 'प्राथमिक, द्वितीयक और तृतीयक क्षेत्र' },
  { id: 'sst-ch19', subjectId: 'sub-sst', chapterNum: 19, title: 'Money & Credit', hindiTitle: 'मुद्रा और साख', description: 'बैंक, ऋण, स्वयं सहायता समूह एवं मुद्रा का विकास' },
  { id: 'sst-ch20', subjectId: 'sub-sst', chapterNum: 20, title: 'Globalization & Indian Economy', hindiTitle: 'वैश्वीकरण और भारतीय अर्थव्यवस्था', description: 'MNCs, विश्व व्यापार संगठन (WTO), उदारीकरण' },

  // Hindi (35 Complete Chapters & Topics)
  { id: 'hin-ch1', subjectId: 'sub-hindi', chapterNum: 1, title: "गद्य खंड", hindiTitle: "गद्य खंड", description: 'बिहार बोर्ड कक्षा 10 हिंदी: गद्य खंड के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch2', subjectId: 'sub-hindi', chapterNum: 2, title: "श्रम विभाजन और जाति प्रथा", hindiTitle: "श्रम विभाजन और जाति प्रथा", description: 'बिहार बोर्ड कक्षा 10 हिंदी: श्रम विभाजन और जाति प्रथा के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch3', subjectId: 'sub-hindi', chapterNum: 3, title: "विष के दाँत", hindiTitle: "विष के दाँत", description: 'बिहार बोर्ड कक्षा 10 हिंदी: विष के दाँत के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch4', subjectId: 'sub-hindi', chapterNum: 4, title: "भारत से हम क्या सीखें", hindiTitle: "भारत से हम क्या सीखें", description: 'बिहार बोर्ड कक्षा 10 हिंदी: भारत से हम क्या सीखें के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch5', subjectId: 'sub-hindi', chapterNum: 5, title: "नाखून क्यों बढ़ते हैं", hindiTitle: "नाखून क्यों बढ़ते हैं", description: 'बिहार बोर्ड कक्षा 10 हिंदी: नाखून क्यों बढ़ते हैं के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch6', subjectId: 'sub-hindi', chapterNum: 6, title: "नागरी लिपि", hindiTitle: "नागरी लिपि", description: 'बिहार बोर्ड कक्षा 10 हिंदी: नागरी लिपि के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch7', subjectId: 'sub-hindi', chapterNum: 7, title: "बहादुर", hindiTitle: "बहादुर", description: 'बिहार बोर्ड कक्षा 10 हिंदी: बहादुर के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch8', subjectId: 'sub-hindi', chapterNum: 8, title: "परंपरा का मूल्यांकन", hindiTitle: "परंपरा का मूल्यांकन", description: 'बिहार बोर्ड कक्षा 10 हिंदी: परंपरा का मूल्यांकन के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch9', subjectId: 'sub-hindi', chapterNum: 9, title: "जित-जित मैं निरखत हूँ", hindiTitle: "जित-जित मैं निरखत हूँ", description: 'बिहार बोर्ड कक्षा 10 हिंदी: जित-जित मैं निरखत हूँ के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch10', subjectId: 'sub-hindi', chapterNum: 10, title: "आविन्यों", hindiTitle: "आविन्यों", description: 'बिहार बोर्ड कक्षा 10 हिंदी: आविन्यों के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch11', subjectId: 'sub-hindi', chapterNum: 11, title: "मछली", hindiTitle: "मछली", description: 'बिहार बोर्ड कक्षा 10 हिंदी: मछली के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch12', subjectId: 'sub-hindi', chapterNum: 12, title: "नौबतखाने में इबादत", hindiTitle: "नौबतखाने में इबादत", description: 'बिहार बोर्ड कक्षा 10 हिंदी: नौबतखाने में इबादत के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch13', subjectId: 'sub-hindi', chapterNum: 13, title: "शिक्षा और संस्कृति", hindiTitle: "शिक्षा और संस्कृति", description: 'बिहार बोर्ड कक्षा 10 हिंदी: शिक्षा और संस्कृति के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch14', subjectId: 'sub-hindi', chapterNum: 14, title: "पद्य खंड", hindiTitle: "पद्य खंड", description: 'बिहार बोर्ड कक्षा 10 हिंदी: पद्य खंड के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch15', subjectId: 'sub-hindi', chapterNum: 15, title: "राम बिनु बिरथे जगि जनमा", hindiTitle: "राम बिनु बिरथे जगि जनमा", description: 'बिहार बोर्ड कक्षा 10 हिंदी: राम बिनु बिरथे जगि जनमा के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch16', subjectId: 'sub-hindi', chapterNum: 16, title: "जो नर दुख में दुख", hindiTitle: "जो नर दुख में दुख", description: 'बिहार बोर्ड कक्षा 10 हिंदी: जो नर दुख में दुख के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch17', subjectId: 'sub-hindi', chapterNum: 17, title: "प्रेम-अयनि श्री राधिका", hindiTitle: "प्रेम-अयनि श्री राधिका", description: 'बिहार बोर्ड कक्षा 10 हिंदी: प्रेम-अयनि श्री राधिका के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch18', subjectId: 'sub-hindi', chapterNum: 18, title: "करील के कुंजन ऊपर वारौ", hindiTitle: "करील के कुंजन ऊपर वारौ", description: 'बिहार बोर्ड कक्षा 10 हिंदी: करील के कुंजन ऊपर वारौ के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch19', subjectId: 'sub-hindi', chapterNum: 19, title: "जनतंत्र का जन्म", hindiTitle: "जनतंत्र का जन्म", description: 'बिहार बोर्ड कक्षा 10 हिंदी: जनतंत्र का जन्म के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch20', subjectId: 'sub-hindi', chapterNum: 20, title: "हिरोशिमा", hindiTitle: "हिरोशिमा", description: 'बिहार बोर्ड कक्षा 10 हिंदी: हिरोशिमा के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch21', subjectId: 'sub-hindi', chapterNum: 21, title: "एक वृक्ष की हत्या", hindiTitle: "एक वृक्ष की हत्या", description: 'बिहार बोर्ड कक्षा 10 हिंदी: एक वृक्ष की हत्या के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch22', subjectId: 'sub-hindi', chapterNum: 22, title: "हमारी नींद", hindiTitle: "हमारी नींद", description: 'बिहार बोर्ड कक्षा 10 हिंदी: हमारी नींद के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch23', subjectId: 'sub-hindi', chapterNum: 23, title: "अक्षर-ज्ञान", hindiTitle: "अक्षर-ज्ञान", description: 'बिहार बोर्ड कक्षा 10 हिंदी: अक्षर-ज्ञान के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch24', subjectId: 'sub-hindi', chapterNum: 24, title: "लौटकर आऊँगा फिर", hindiTitle: "लौटकर आऊँगा फिर", description: 'बिहार बोर्ड कक्षा 10 हिंदी: लौटकर आऊँगा फिर के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch25', subjectId: 'sub-hindi', chapterNum: 25, title: "मेरे बिना तुम प्रभु", hindiTitle: "मेरे बिना तुम प्रभु", description: 'बिहार बोर्ड कक्षा 10 हिंदी: मेरे बिना तुम प्रभु के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch26', subjectId: 'sub-hindi', chapterNum: 26, title: "दही वाली मंगम्मा", hindiTitle: "दही वाली मंगम्मा", description: 'बिहार बोर्ड कक्षा 10 हिंदी: दही वाली मंगम्मा के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch27', subjectId: 'sub-hindi', chapterNum: 27, title: "ढहते विश्वास", hindiTitle: "ढहते विश्वास", description: 'बिहार बोर्ड कक्षा 10 हिंदी: ढहते विश्वास के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch28', subjectId: 'sub-hindi', chapterNum: 28, title: "माँ", hindiTitle: "माँ", description: 'बिहार बोर्ड कक्षा 10 हिंदी: माँ के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch29', subjectId: 'sub-hindi', chapterNum: 29, title: "नगर", hindiTitle: "नगर", description: 'बिहार बोर्ड कक्षा 10 हिंदी: नगर के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch30', subjectId: 'sub-hindi', chapterNum: 30, title: "धरती कब तक घूमेगी", hindiTitle: "धरती कब तक घूमेगी", description: 'बिहार बोर्ड कक्षा 10 हिंदी: धरती कब तक घूमेगी के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch31', subjectId: 'sub-hindi', chapterNum: 31, title: "क्रमशः (पूरक पाठ्यपुस्तक BTC)", hindiTitle: "क्रमशः (पूरक पाठ्यपुस्तक BTC)", description: 'बिहार बोर्ड कक्षा 10 हिंदी: क्रमशः (पूरक पाठ्यपुस्तक BTC) के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch32', subjectId: 'sub-hindi', chapterNum: 32, title: "संधि और समास", hindiTitle: "संधि और समास", description: 'बिहार बोर्ड कक्षा 10 हिंदी: संधि और समास के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch33', subjectId: 'sub-hindi', chapterNum: 33, title: "अलंकार", hindiTitle: "अलंकार", description: 'बिहार बोर्ड कक्षा 10 हिंदी: अलंकार के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch34', subjectId: 'sub-hindi', chapterNum: 34, title: "रस और छंद", hindiTitle: "रस और छंद", description: 'बिहार बोर्ड कक्षा 10 हिंदी: रस और छंद के महत्वपूर्ण प्रश्न एवं नोट्स' },
  { id: 'hin-ch35', subjectId: 'sub-hindi', chapterNum: 35, title: "मुहावरे और लोकोक्तियाँ", hindiTitle: "मुहावरे और लोकोक्तियाँ", description: 'बिहार बोर्ड कक्षा 10 हिंदी: मुहावरे और लोकोक्तियाँ के महत्वपूर्ण प्रश्न एवं नोट्स' },

  // Sanskrit (20 Complete Chapters & Grammar)
  { id: 'san-ch1', subjectId: 'sub-sanskrit', chapterNum: 1, title: "मङ्गलम् (पाठ 1)", hindiTitle: "मङ्गलम् (पाठ 1)", description: 'बिहार बोर्ड कक्षा 10 संस्कृत: मङ्गलम् (पाठ 1) के महत्वपूर्ण प्रश्न एवं व्याकरण' },
  { id: 'san-ch2', subjectId: 'sub-sanskrit', chapterNum: 2, title: "पाटलिपुत्रवैभवम् (पाठ 2)", hindiTitle: "पाटलिपुत्रवैभवम् (पाठ 2)", description: 'बिहार बोर्ड कक्षा 10 संस्कृत: पाटलिपुत्रवैभवम् (पाठ 2) के महत्वपूर्ण प्रश्न एवं व्याकरण' },
  { id: 'san-ch3', subjectId: 'sub-sanskrit', chapterNum: 3, title: "आलसकथा (पाठ 3)", hindiTitle: "आलसकथा (पाठ 3)", description: 'बिहार बोर्ड कक्षा 10 संस्कृत: आलसकथा (पाठ 3) के महत्वपूर्ण प्रश्न एवं व्याकरण' },
  { id: 'san-ch4', subjectId: 'sub-sanskrit', chapterNum: 4, title: "संस्कृतसाहित्ये लेखिकाः (पाठ 4)", hindiTitle: "संस्कृतसाहित्ये लेखिकाः (पाठ 4)", description: 'बिहार बोर्ड कक्षा 10 संस्कृत: संस्कृतसाहित्ये लेखिकाः (पाठ 4) के महत्वपूर्ण प्रश्न एवं व्याकरण' },
  { id: 'san-ch5', subjectId: 'sub-sanskrit', chapterNum: 5, title: "भारतमहिमा (पाठ 5)", hindiTitle: "भारतमहिमा (पाठ 5)", description: 'बिहार बोर्ड कक्षा 10 संस्कृत: भारतमहिमा (पाठ 5) के महत्वपूर्ण प्रश्न एवं व्याकरण' },
  { id: 'san-ch6', subjectId: 'sub-sanskrit', chapterNum: 6, title: "भारतीयसंस्काराः (पाठ 6)", hindiTitle: "भारतीयसंस्काराः (पाठ 6)", description: 'बिहार बोर्ड कक्षा 10 संस्कृत: भारतीयसंस्काराः (पाठ 6) के महत्वपूर्ण प्रश्न एवं व्याकरण' },
  { id: 'san-ch7', subjectId: 'sub-sanskrit', chapterNum: 7, title: "नीतिश्लोकाः (पाठ 7)", hindiTitle: "नीतिश्लोकाः (पाठ 7)", description: 'बिहार बोर्ड कक्षा 10 संस्कृत: नीतिश्लोकाः (पाठ 7) के महत्वपूर्ण प्रश्न एवं व्याकरण' },
  { id: 'san-ch8', subjectId: 'sub-sanskrit', chapterNum: 8, title: "कर्मवीर कथा (पाठ 8)", hindiTitle: "कर्मवीर कथा (पाठ 8)", description: 'बिहार बोर्ड कक्षा 10 संस्कृत: कर्मवीर कथा (पाठ 8) के महत्वपूर्ण प्रश्न एवं व्याकरण' },
  { id: 'san-ch9', subjectId: 'sub-sanskrit', chapterNum: 9, title: "स्वामी दयानन्दः (पाठ 9)", hindiTitle: "स्वामी दयानन्दः (पाठ 9)", description: 'बिहार बोर्ड कक्षा 10 संस्कृत: स्वामी दयानन्दः (पाठ 9) के महत्वपूर्ण प्रश्न एवं व्याकरण' },
  { id: 'san-ch10', subjectId: 'sub-sanskrit', chapterNum: 10, title: "मन्दाकिनीवर्णनम् (पाठ 10)", hindiTitle: "मन्दाकिनीवर्णनम् (पाठ 10)", description: 'बिहार बोर्ड कक्षा 10 संस्कृत: मन्दाकिनीवर्णनम् (पाठ 10) के महत्वपूर्ण प्रश्न एवं व्याकरण' },
  { id: 'san-ch11', subjectId: 'sub-sanskrit', chapterNum: 11, title: "व्याघ्रपथिक-कथा (पाठ 11)", hindiTitle: "व्याघ्रपथिक-कथा (पाठ 11)", description: 'बिहार बोर्ड कक्षा 10 संस्कृत: व्याघ्रपथिक-कथा (पाठ 11) के महत्वपूर्ण प्रश्न एवं व्याकरण' },
  { id: 'san-ch12', subjectId: 'sub-sanskrit', chapterNum: 12, title: "कर्णस्य दानवीरता (पाठ 12)", hindiTitle: "कर्णस्य दानवीरता (पाठ 12)", description: 'बिहार बोर्ड कक्षा 10 संस्कृत: कर्णस्य दानवीरता (पाठ 12) के महत्वपूर्ण प्रश्न एवं व्याकरण' },
  { id: 'san-ch13', subjectId: 'sub-sanskrit', chapterNum: 13, title: "विश्वशान्तिः (पाठ 13)", hindiTitle: "विश्वशान्तिः (पाठ 13)", description: 'बिहार बोर्ड कक्षा 10 संस्कृत: विश्वशान्तिः (पाठ 13) के महत्वपूर्ण प्रश्न एवं व्याकरण' },
  { id: 'san-ch14', subjectId: 'sub-sanskrit', chapterNum: 14, title: "शास्त्रकाराः (पाठ 14)", hindiTitle: "शास्त्रकाराः (पाठ 14)", description: 'बिहार बोर्ड कक्षा 10 संस्कृत: शास्त्रकाराः (पाठ 14) के महत्वपूर्ण प्रश्न एवं व्याकरण' },
  { id: 'san-ch15', subjectId: 'sub-sanskrit', chapterNum: 15, title: "संधि", hindiTitle: "संधि", description: 'बिहार बोर्ड कक्षा 10 संस्कृत: संधि के महत्वपूर्ण प्रश्न एवं व्याकरण' },
  { id: 'san-ch16', subjectId: 'sub-sanskrit', chapterNum: 16, title: "शब्द रूप", hindiTitle: "शब्द रूप", description: 'बिहार बोर्ड कक्षा 10 संस्कृत: शब्द रूप के महत्वपूर्ण प्रश्न एवं व्याकरण' },
  { id: 'san-ch17', subjectId: 'sub-sanskrit', chapterNum: 17, title: "धातु रूप", hindiTitle: "धातु रूप", description: 'बिहार बोर्ड कक्षा 10 संस्कृत: धातु रूप के महत्वपूर्ण प्रश्न एवं व्याकरण' },
  { id: 'san-ch18', subjectId: 'sub-sanskrit', chapterNum: 18, title: "कारक और विभक्ति", hindiTitle: "कारक और विभक्ति", description: 'बिहार बोर्ड कक्षा 10 संस्कृत: कारक और विभक्ति के महत्वपूर्ण प्रश्न एवं व्याकरण' },
  { id: 'san-ch19', subjectId: 'sub-sanskrit', chapterNum: 19, title: "समास", hindiTitle: "समास", description: 'बिहार बोर्ड कक्षा 10 संस्कृत: समास के महत्वपूर्ण प्रश्न एवं व्याकरण' },
  { id: 'san-ch20', subjectId: 'sub-sanskrit', chapterNum: 20, title: "प्रत्यय एवं उपसर्ग", hindiTitle: "प्रत्यय एवं उपसर्ग", description: 'बिहार बोर्ड कक्षा 10 संस्कृत: प्रत्यय एवं उपसर्ग के महत्वपूर्ण प्रश्न एवं व्याकरण' },
];

export const INITIAL_LECTURES: Lecture[] = [
  {
    id: 'lec-math-1',
    chapterId: 'math-ch1',
    title: 'Real Numbers - Lecture 01: Euclid Division Algorithm',
    hindiTitle: 'वास्तविक संख्याएँ - यूक्लिड विभाजन प्रमेयिका एवं HCF',
    description: 'यूक्लिड विभाजन प्रमेयिका का पूरा कॉन्सेप्ट और बिहार बोर्ड के महत्वपूर्ण प्रश्न',
    youtubeUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
    youtubeId: '5qap5aO4i9A',
    durationSec: 2450,
    order: 1,
    thumbnailUrl: 'https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault.jpg',
  },
  {
    id: 'lec-math-2',
    chapterId: 'math-ch5',
    title: 'Trigonometry - Magic Table & Formulas',
    hindiTitle: 'त्रिकोणमिति - मान सारणी एवं सर्वसमिकाएं (0° to 90°)',
    description: 'sin, cos, tan के सभी फॉर्मूले और बिहार बोर्ड परीक्षा के सवाल',
    youtubeUrl: 'https://www.youtube.com/watch?v=PUB0TaZ7bhA',
    youtubeId: 'PUB0TaZ7bhA',
    durationSec: 2600,
    order: 1,
    thumbnailUrl: 'https://i.ytimg.com/vi/PUB0TaZ7bhA/hqdefault.jpg',
  },
  {
    id: 'lec-sci-1',
    chapterId: 'sci-ch1',
    title: 'Light Reflection & Refraction Class',
    hindiTitle: 'प्रकाश परावर्तन एवं अपवर्तन - गोलीय दर्पण और लेंस',
    description: 'दर्पण सूत्र, आवर्धन और किरण आरेख का सचित्र अध्ययन',
    youtubeUrl: 'https://www.youtube.com/watch?v=f7vW1v5oK54',
    youtubeId: 'f7vW1v5oK54',
    durationSec: 2890,
    order: 1,
    thumbnailUrl: 'https://i.ytimg.com/vi/f7vW1v5oK54/hqdefault.jpg',
  },
];

// Helper to generate Question from RAW tuple
function buildQuestion(
  id: string,
  quizId: string,
  tuple: [string, string, string, string, string],
  index: number
): Question {
  const [qText, correct, o1, o2, o3] = tuple;
  const correctIdx = index % 4;
  const incorrect = [o1, o2, o3];
  const options: string[] = [];
  let incIdx = 0;
  for (let i = 0; i < 4; i++) {
    if (i === correctIdx) {
      options.push(correct);
    } else {
      options.push(incorrect[incIdx++] || 'कोई नहीं');
    }
  }

  return {
    id,
    quizId,
    questionText: qText,
    hindiText: qText,
    type: 'SINGLE_CHOICE',
    options,
    correctOption: correctIdx,
    explanation: `सही उत्तर: ${correct}`,
    hindiExpl: `सही उत्तर: ${correct}`,
  };
}

// Generate Quizzes and Questions from RAW_QUESTIONS
const generatedQuizzes: Quiz[] = [];
const generatedQuestions: Question[] = [];

// 1. Science Chapters from RAW
const scienceRaw = RAW_QUESTIONS['विज्ञान'] || {};
Object.entries(scienceRaw).forEach(([chapterName, questionsList], chIdx) => {
  const quizId = `quiz-sci-${chIdx + 1}`;
  const targetChapter = INITIAL_CHAPTERS.find((c) => c.hindiTitle === chapterName);

  generatedQuizzes.push({
    id: quizId,
    subjectId: 'sub-science',
    chapterId: targetChapter?.id,
    title: `${chapterName} - Objective Quiz`,
    hindiTitle: `${chapterName} - वस्तुनिष्ठ टेस्ट`,
    description: `बिहार बोर्ड कक्षा 10 विज्ञान: ${chapterName} के 100% बोर्ड मॉडल प्रश्न`,
    durationMins: 12,
    passScore: 60,
  });

  questionsList.forEach((tuple, qIdx) => {
    generatedQuestions.push(
      buildQuestion(`q-sci-${chIdx + 1}-${qIdx + 1}`, quizId, tuple, qIdx)
    );
  });
});

// 2. Math Chapters from RAW
const mathRaw = RAW_QUESTIONS['गणित'] || {};
Object.entries(mathRaw).forEach(([chapterName, questionsList], chIdx) => {
  const quizId = `quiz-math-${chIdx + 1}`;
  const targetChapter = INITIAL_CHAPTERS.find((c) => c.hindiTitle === chapterName);

  generatedQuizzes.push({
    id: quizId,
    subjectId: 'sub-math',
    chapterId: targetChapter?.id,
    title: `${chapterName} - Objective Quiz`,
    hindiTitle: `${chapterName} - वस्तुनिष्ठ टेस्ट`,
    description: `बिहार बोर्ड कक्षा 10 गणित: ${chapterName} के महत्वपूर्ण प्रश्न`,
    durationMins: 12,
    passScore: 60,
  });

  questionsList.forEach((tuple, qIdx) => {
    generatedQuestions.push(
      buildQuestion(`q-math-${chIdx + 1}-${qIdx + 1}`, quizId, tuple, qIdx)
    );
  });
});

// 3. Social Science (SST) from RAW
const sstRaw = RAW_QUESTIONS['सामाजिक विज्ञान'] || {};
Object.entries(sstRaw).forEach(([chapterName, questionsList], chIdx) => {
  const quizId = `quiz-sst-${chIdx + 1}`;
  const targetChapter = INITIAL_CHAPTERS.find((c) => c.hindiTitle === chapterName);

  generatedQuizzes.push({
    id: quizId,
    subjectId: 'sub-sst',
    chapterId: targetChapter?.id,
    title: `${chapterName} - Objective Quiz`,
    hindiTitle: `${chapterName} - वस्तुनिष्ठ टेस्ट`,
    description: `बिहार बोर्ड कक्षा 10 सामाजिक विज्ञान: ${chapterName} के 100% बोर्ड मॉडल प्रश्न`,
    durationMins: 10,
    passScore: 60,
  });

  questionsList.forEach((tuple, qIdx) => {
    generatedQuestions.push(
      buildQuestion(`q-sst-${chIdx + 1}-${qIdx + 1}`, quizId, tuple, qIdx)
    );
  });
});

// 4. Hindi from RAW
const hindiRaw = RAW_QUESTIONS['हिंदी'] || {};
Object.entries(hindiRaw).forEach(([chapterName, questionsList], chIdx) => {
  const quizId = `quiz-hin-${chIdx + 1}`;
  const targetChapter = INITIAL_CHAPTERS.find((c) => c.hindiTitle === chapterName);

  generatedQuizzes.push({
    id: quizId,
    subjectId: 'sub-hindi',
    chapterId: targetChapter?.id,
    title: `${chapterName} - Objective Quiz`,
    hindiTitle: `${chapterName} - वस्तुनिष्ठ टेस्ट`,
    description: `बिहार बोर्ड कक्षा 10 हिंदी: ${chapterName} के VVI प्रश्न`,
    durationMins: 10,
    passScore: 60,
  });

  questionsList.forEach((tuple, qIdx) => {
    generatedQuestions.push(
      buildQuestion(`q-hin-${chIdx + 1}-${qIdx + 1}`, quizId, tuple, qIdx)
    );
  });
});

// 5. Sanskrit from RAW
const sanskritRaw = RAW_QUESTIONS['संस्कृत'] || {};
Object.entries(sanskritRaw).forEach(([chapterName, questionsList], chIdx) => {
  const quizId = `quiz-san-${chIdx + 1}`;
  const targetChapter = INITIAL_CHAPTERS.find((c) => c.hindiTitle === chapterName);

  generatedQuizzes.push({
    id: quizId,
    subjectId: 'sub-sanskrit',
    chapterId: targetChapter?.id,
    title: `${chapterName} - Objective Quiz`,
    hindiTitle: `${chapterName} - वस्तुनिष्ठ टेस्ट`,
    description: `बिहार बोर्ड कक्षा 10 संस्कृत: ${chapterName} के 100% बोर्ड मॉडल प्रश्न`,
    durationMins: 10,
    passScore: 60,
  });

  questionsList.forEach((tuple, qIdx) => {
    generatedQuestions.push(
      buildQuestion(`q-san-${chIdx + 1}-${qIdx + 1}`, quizId, tuple, qIdx)
    );
  });
});

export const INITIAL_QUIZZES: Quiz[] = generatedQuizzes;
export const INITIAL_QUESTIONS: Question[] = generatedQuestions;

export const INITIAL_NOTES: Note[] = [
  {
    id: 'note-math-1',
    subjectId: 'sub-math',
    chapterId: 'math-ch1',
    title: 'कक्षा 10 गणित अध्याय 1 - फॉर्मूला शीट एवं महत्वपूर्ण प्रमेय',
    fileUrl: '/notes/sample-math-ch1.pdf',
    fileType: 'PDF',
    fileSizeKb: 2450,
    downloads: 342,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'note-math-2',
    subjectId: 'sub-math',
    chapterId: 'math-ch5',
    title: 'त्रिकोणमिति मान सारणी चार्ट एवं सर्वसमिकाएं रिवीज़न गाइड',
    fileUrl: '/notes/sample-trigonometry.pdf',
    fileType: 'PDF',
    fileSizeKb: 1820,
    downloads: 512,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'note-sci-1',
    subjectId: 'sub-science',
    chapterId: 'sci-ch1',
    title: 'भौतिकी - प्रकाश किरण आरेख एवं दर्पण/लेंस सूत्र हैंडबुक',
    fileUrl: '/notes/sample-physics.pdf',
    fileType: 'PDF',
    fileSizeKb: 3100,
    downloads: 289,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'note-sst-1',
    subjectId: 'sub-sst',
    chapterId: 'sst-ch1',
    title: 'इतिहास - भारत एवं यूरोप में राष्ट्रवाद की समय-रेखा (Timeline)',
    fileUrl: '/notes/sample-history.pdf',
    fileType: 'PDF',
    fileSizeKb: 1540,
    downloads: 198,
    createdAt: new Date().toISOString(),
  },
];
