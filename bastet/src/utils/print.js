const chalk = require('chalk')
const figlet = require('figlet')


const bastet = () => {
    console.log(chalk.blue('\n                : i              ,     G          \n            tGGGGjLGGfG           ,     .         \n          LGGG       .:,j         j    GG         \n        jGG             GG        ;fGftGf         \n       LGt               tG       GGGGG G         \n      GG                  GL      GiG, G,         \n     ,G              Gt   ,G   ijtGGGGGGf i       \n     G.             f ;G   G   G..GGGGGG .        \n    GG            if    G  G i     GGGGt          \n    G             G  G  t  G        it;L          \n   iG             G .j  G .G         :ft:         \n   GG             G  ttG  Gf         ,:ij         \n   G:              t     tG          fGGj         \n   G      tGGGG,   ,GGGtG:           LGGj         \n   f.   ,GGGGGGGGG    .:            GjGGi         \n   j.  ,GGGGGGGjtG:t               GjfGG          \n   ,   GGGGGGGGGG   G             fffGtG          \n    G :GGL.iGGfGGiL t,Gj      ;GGGGfGtjG          \n    GG GGf:;G G  LLGfGfGGGG ,LiGG..G  G           \n     GGGGtfGfG.Gt., G ifGGGGLGi:j,fGiG.           \n      LjijGGtGG,iLj GGtiGG. ,iG:ffGGft.           \n       i:tG:Lf  fGfGfGL.GLGLtfGiGjGjGi            \n       GGGG:Gfft     ff;fGLG,GG;:tjLfLLGGGGGL:    \n       GGGGGG;tG fGtj, .jGGiftf GjGjGGGGGGGGGGGG  \n        GGGGGGf;fi;        tGtL;tGGGGGGGGGGG;fGG  \n         :GGGGGG                 .        GGG     \n'))
}

const cool = () => {
    console.log(
        chalk.blue(
            figlet.textSync('cooL', {
                font: 'Slant',
                horizontalLayout: 'full',
                verticalLayout: 'full'
            })
        )
    )
}


module.exports = {
    bastet,
    cool
}