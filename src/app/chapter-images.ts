export class ChapterImages {
  static n = 33; // amount of images


  static getImages(): string[] {
    const list: string[] = [];
    for (let i = 0; i < ChapterImages.n; i++) {
      list.push('https://marplaa.github.io/ck2book/assets/img/chapter-images/image-' + i + '.jpg');
    }
    return list;
  }
}

/*
export const chapterImages = {
  cooking: [
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/cooking_1.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/cooking_2.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/cooking_3.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/cooking_4.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/cooking_5.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/cooking_6.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/cooking_7.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/cooking_8.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/cooking_9.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/cooking_10.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/cooking_11.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/cooking_12.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/cooking_13.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/cooking_14.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/cooking_15.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/cooking_16.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/cooking_17.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/cooking_18.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/cooking_19.jpg',

    'https://marplaa.github.io/ck2book/assets/img/chapter-images/baking_1.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/baking_2.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/baking_3.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/baking_4.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/baking_5.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/baking_6.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/baking_7.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/baking_8.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/baking_9.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/baking_10.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/baking_11.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/baking_12.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/baking_13.jpg',
    'https://marplaa.github.io/ck2book/assets/img/chapter-images/baking_14.jpg',

  ]
};
*/
