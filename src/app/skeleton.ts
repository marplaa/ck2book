import {Recipe, RecipesNode} from './recipes-node';
import {chapterImages} from './chapter-images';
import {standardOptions} from './options';

const recipe: Recipe = {
  url: 'https://www.chefkoch.de/rezepte/2455511386627445/Quinoa-Powersalat-mit-Tomaten-und-Avocado.html',
  title: 'Quinoa Powersalat mit Tomaten und Avocado',
  ingredients: [
    [
      ''
    ],
    [
      '1 Tasse',
      'Quinoa'
    ],
    [
      'n. B.',
      'Wasser'
    ],
    [
      '1',
      'Salatgurke(n)'
    ],
    [
      '1',
      'Avocado(s)'
    ],
    [
      '10',
      'Cocktailtomaten'
    ],
    [
      '1 ½ Bund',
      'Petersilie'
    ],
    [
      '1 TL',
      'Salz'
    ],
    [
      '1 Schuss',
      'Olivenöl'
    ],
    [
      '',
      'Chili aus der Mühle'
    ],
    [
      '',
      'Pfeffer aus der Mühle'
    ]
  ],
  recipeInfo: [
    [
      'Arbeitszeit',
      'ca. 30 Minuten'
    ],
    [
      'Koch-/Backzeit',
      'ca. 20 Minuten'
    ],
    [
      'Gesamtzeit',
      'ca. 50 Minuten'
    ],
    [
      'Schwierigkeitsgrad',
      'simpel'
    ],
    [
      'Kalorien p. P.',
      'ca. 211'
    ]
  ],
  text: 'Die Quinoa im Sieb waschen, im Topf mit Wasser bedecken, 20 min. kochen. In der Zwischenzeit Tomaten, Avocado und Gurke würfeln, die Petersilie hacken.</br>Die Quinoa sollte dann eine Konsistenz von weichem Reis haben, dann kann man sie unter Wasser abbrausen. Ich stelle das Sieb danach immer auf Küchenkrepp, damit die Quinoa etwas trockener und lockerer wird.</br>Mit den Gemüsewürfeln und der Petersilie vermischen, salzen und nach Geschmack noch etwas pfeffern. Etwas Olivenöl und Chili dazugeben. Aus der Mühle ist Chili ganz besonders frisch und bringt die Verdauung in Schwung. Die leichte Schärfe ist ein guter Gegensatz zur etwas laschen Gurke.</br>Alles schön vermengen und servieren.',
  images: [
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/964744/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/940533/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/828321/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/944681/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/926886/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/895765/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/1030360/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/1307167/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/844781/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/928111/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/1028038/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/927346/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/986814/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/1088396/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/904683/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/1177555/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/1297608/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/739271/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/691374/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/891140/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/891371/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/1192574/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/911762/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/826023/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/788499/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/1221776/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/1156901/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/1181465/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/926624/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/1138463/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/1313835/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
    'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/1041025/crop-276x276/quinoa-powersalat-mit-tomaten-und-avocado.jpg'
  ],
  image: 'https://img.chefkoch-cdn.de/rezepte/2455511386627445/bilder/964744/crop-360x240/quinoa-powersalat-mit-tomaten-und-avocado.jpg',
  id: '000-002-f75',
  options: standardOptions
};

export const Recipes: RecipesNode =


  {
    id: '000',
    title: 'Mein Kochbuch',
    text: '',
    isBottomChapter: false,
    children: [
      {
        id: '000-001',
        title: 'Kochen',
        images: chapterImages.cooking,
        image: 'https://marplaa.github.io/ck2bookPage/assets/img/chapter-images/cooking_1.jpg',
        text: '',
        isBottomChapter: false,
        children: [
          {
            id: '000-001-001',
            text: '',
            title: 'Suppen',
            images: chapterImages.cooking,
            image: 'https://marplaa.github.io/ck2bookPage/assets/img/chapter-images/cooking_1.jpg',
            isBottomChapter: false,
            children: [

            ],
            options: standardOptions
          },
          {
            id: '000-001-002',
            text: '',
            title: 'Eintöpfe',
            images: chapterImages.cooking,
            image: 'https://marplaa.github.io/ck2bookPage/assets/img/chapter-images/cooking_1.jpg',
            isBottomChapter: false,
            children: [

            ],
            options: standardOptions
          },
        ],
        options: standardOptions
      },
      {
        id: '000-002',
        title: 'Backen',
        text: '',
        images: chapterImages.cooking,
        image: 'https://marplaa.github.io/ck2bookPage/assets/img/chapter-images/cooking_1.jpg',
        isBottomChapter: true,
        children: [
          recipe

        ],
        options: standardOptions
      },
      {
        id: '000-003',
        title: 'Trinken',
        text: '',
        images: chapterImages.cooking,
        image: 'https://marplaa.github.io/ck2bookPage/assets/img/chapter-images/cooking_1.jpg',
        isBottomChapter: false,
        children: [

        ],
        options: standardOptions
      }
    ],
    options: standardOptions
  }

;
