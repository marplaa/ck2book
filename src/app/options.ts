export const background = {
  NONE: 'NONE',
  CHAPTER: 'CHAPTER',
  RECIPE: 'RECIPE'
};

export interface Options {
  recipeBackgrounds: string;
  background: string;
}

export const standardOptions: Options = {
  recipeBackgrounds: 'RECIPE',
  background: 'IMAGE'

};
