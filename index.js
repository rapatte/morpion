const listCase = Array.from(document.querySelectorAll('button'));
const statuMsg = document.getElementById('game_status');
const tabWins  = [//lignes
                 [listCase[0], listCase[1], listCase[2]],
                 [listCase[3], listCase[4], listCase[5]],
                 [listCase[6], listCase[7], listCase[8]],
                 //colonnes
                 [listCase[0], listCase[3], listCase[6]],
                 [listCase[1], listCase[4], listCase[7]],
                 [listCase[2], listCase[5], listCase[8]],
                 //diagonales
                 [listCase[0], listCase[4], listCase[8]],
                 [listCase[2], listCase[4], listCase[6]]
                                                        ];
//variable qui vérifie si le vainqueur est le joueur X --> pX ou le joueur O --> pO
let pX = false,pO=false;
//variable qui vérifie si on a recommencé pour empêcher d'effacer le contenu des cases dans une partie en cours
let nouvelle_partie = false;
//tableau qui récupère la combinaison gagnante afin de changer la couleur des cases
let recupCaseVictoire = [];
//permet de switch les joueur si paire tour de X sinon tour de 0
let countClick = 0;

//le jeu débute au premier click
listCase.forEach(element => element.addEventListener('click', jouer))
//callBack à chaque appelée à chaque tour
function jouer(e){
    if(nouvelle_partie) statuMsg.removeEventListener('click', recommencer_partie)
    //si une case n'a pas encore été jouée ou si aucun joueur n'a gagné on peut (continuer à) jouer
    if (!e.target.textContent && !pX && !pO) {
        //si le nombre de de click est pair on écrit un X sinon on écrit un 0
        e.target.textContent = countClick % 2 === 0 ? 'X' : 'O';
        //si le nombre de click est pair alors le prochain à jouer est O sinon le prochain est X
        statuMsg.textContent = "c'est au tour du joueur " + (countClick % 2 === 0 ? 'O' : 'X');
        //on incrémente pour passer au joueur suivant
        countClick++;
    }
    victoire();
    matchNul();
    //si il y un vaiqueur on met en vert les cases de la combianaison gagnante
    if (pX || pO)
        {
            //win change le bg-color
            msgWinner();
            recupCaseVictoire.forEach(el => el.classList.add('win'))
            statuMsg.addEventListener('click', recommencer_partie);
        }
    console.log(nouvelle_partie)
}
//si on a une victoire ou un match nul on vide le contenu des cases pour recommencer.
function recommencer_partie(){
    listCase.forEach(el => el.textContent = '')
    pO = false;
    pX = false;
    nouvelle_partie = true;
    recupCaseVictoire.forEach(el => el.classList.remove('win'))
    listCase.forEach(el => el.classList.remove('null'))
    statuMsg.textContent ="Le jeu peut commencer c'est au tour du jour "+ (!(countClick%2) ? 'X' : 'O')
}
//le message de la status barre s'adapte au gagnant
function msgWinner() {
    //on change le message de la status barre en cours de jeu
    statuMsg.textContent = (pX ? 'X' : 'O') + ' a gagné ! Cliquez ici pour rejouer.';    
}
//vérifie si un joueur à gagné
function victoire() {
    tabWins.forEach((combinaison,i) => {        
        if (pX || pO){
//on la remet à false pour éviter de vider le contenu des cases dans une partie en cours
            nouvelle_partie = false;
            return;
        }
//on regarde si les cases contiennent toutes X ou si elle contiennent toutes O 
        //si c'est x qui a gagné
        pX = combinaison.every((contenu) => {
            if(contenu.textContent === 'X'){
                //s'il y a un gagnant recupCasevictoire prendra la dernière combianaison
                //donc qui est gagnante
                recupCaseVictoire = combinaison;
                //si pX vaut true alors le joueur X gagne
                return true;
            }
        })
        //si c'est O lee gagnant
        pO = combinaison.every((contenu) =>{
            if(contenu.textContent === 'O'){
                recupCaseVictoire = combinaison;
                return true;
            }
        })
    })
}
//en cas de match nul
function matchNul() {
    //si toutes les case ont été jouée et pas de victoire
    if (listCase.every(el => el.textContent !== '') && !pX && !pO){
        nouvelle_partie = false;
        listCase.forEach(el=>el.classList.add('null'))
        statuMsg.textContent = `Match nul. Cliquez ici pour rejouer.`;
        //le joueur click sur la status barre pour recommencer idem en cas de victoire
        statuMsg.addEventListener('click',recommencer_partie)
    }
}


