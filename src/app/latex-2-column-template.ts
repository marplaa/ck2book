
export const twoColTemplate = {
  chapterImageRes: '2480x3508',
  recipeImageRes: '900x675',
  recipeBgImageRes: '2480x3508',
  frame: '\\documentclass[11pt, a4paper, openany]{book}\n' +
    // '\\usepackage[utf8]{inputenc}\n' +
    '\\usepackage[german]{babel}\n' +
    '\\usepackage[top=1.5cm, bottom=1.5cm, left=1cm, right=1cm]{geometry}\n' +
    '\\usepackage{multicol}\n' +
    '\\setlength{\\columnsep}{0.6cm}\n' +
    '\\usepackage{tabulary}\n' +
    '\\tymin=60pt\n' +
    '\\usepackage{graphicx}\n' +
    '\\usepackage{ulem}\n' +
    '\\usepackage{wrapfig}\n' +
    '\\usepackage{titlesec}\n' +
    '\\usepackage{wallpaper}\n' +
    '\\usepackage[breakable]{tcolorbox}\n' +
    '\\graphicspath{{images/}} %Setting the graphicspath\n' +
    '\n' +
    '\\titleformat{\\chapter}[display]\n' +
    '{}\n' +
    '{}\n' +
    '{1ex}\n' +
    '{\\bfseries\\Huge\\begin{mytextbox}\\vspace{0.5ex}}\n' +
    '[\\end{mytextbox}]\n' +
    '\n' +
    '\\titleformat{\\section}[display]\n' +
    '{}\n' +
    '{}\n' +
    '{-2ex}\n' +
    '{\\bfseries\\Large}\n' +
    '[]' +
    '\n' +
    '\\newtcolorbox{mytextbox}[1][]{%\n' +
    '\tstandard jigsaw,\n' +
    '\tcolframe=red,\n' +
    '\topacityframe=0, \n' +
    '\topacityback=0.7,\n' +
    '\tbreakable\n' +
    '}\n' +
    '\n' +
    '\\begin{document}\n' +

    '\\tableofcontents{}\n' +

    '\n' +
    '\t\t{{content}}\n' +
    '\n' +

    '\\end{document}',

  recipe:
   // 'RECIPE RECIPE RECIPE RECIPE RECIPE RECIPE RECIPE RECIPE RECIPE' +
    '\\begin{mytextbox}\n' +

    '  \\section{{{title}}}\n' +

    '\n' +
   /* '  \\begin{center}\n' +
    '    \\includegraphics[width=7.8cm]{{{image}}}\n' +
    '  \\end{center}\n' +*/
    '{{image}}' +

    '\n' +
    '\n' +
    '  \\begin{center}\n' +
    '    {{ingredients}}\n' +
    '  \\end{center}\n' +
    '\n' +
    '  {{text}}\n' +
    '\n' +
    '\\end{mytextbox}\n \\hfill \n' +
  // '  \\ThisCenterWallPaper{1}{{{bg-image}}}\n',
    '{{bg-image}}',

  chapter:

    '  \\chapter{{{title}}}\n' +
    //'  \\ThisCenterWallPaper{1}{{{bg-image}}}\n' +
    '{{bg-image}}' +
   // '\\begin{mytextbox}\n' +
    '{{text}}' +
  //  '\\end{mytextbox}\n' +
    '\\newpage\n' +
    '' +
    '' +
    '' +
    '\t\\begin{multicols}{2}\n' +
    '{{children}}' +
    '\t\\end{multicols}\n',

  chapter_w_subchapters:
   // '\\newpage\n' +
   // 'CHAPTER CHAPTER CHAPTER CHAPTER CHAPTER CHAPTER CHAPTER CHAPTER' +


    '  \\chapter{{{title}}}\n' +
  //  '  \\ThisCenterWallPaper{1}{{{bg-image}}}\n' +
    '{{bg-image}}' +
 //   '\\begin{mytextbox}\n' +
    '{{text}}' +
  //  '\\end{mytextbox}\n' +

    '{{children}}',

  background:
    '  \\ThisCenterWallPaper{1}{{{bg-image}}}\n',

};

