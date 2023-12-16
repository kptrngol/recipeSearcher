"use strict"
//---INGREDIENTS SEARCHER---
const ingredientsPool = [
    "makaron","oliwa","tofu","cebula","czosnek","marchew","seler","bazylia","płatki drożdżowe","peperoncino","ryż","cukinia","cynamon","papryka","gorzka czekolada","sos sojowy","pieprz","sól","mięta","pietruszka","bułki do burgera","mięso wegańskie:kotlet","ser mimolette","sałata","ketchup","sos BBQ","majonez","ogórek","pomidor","chlebpita","mięso wegańskie:gyros","jogurtgrecki","ziemniaki","marchewka","groszek","masło","cukier","warzywa chińskie z biedronki","olej","serek wiejski","twaróg","ogórki konserwowe"
].sort();

const ingredientsPoolNodes = ingredientsPoolInitialize();

function ingredientsPoolInitialize (){
    const ingredientsPoolNodesInternal = []
    for (const el of ingredientsPool) {
    const newElName = `${el}-select`
    const newEl = `<div id="${`${el}-select`}" style="visibility: visible;"><input type="checkbox" if="check-${el}" value="${el}" class="indg-in"><label for="check-${el}" class="indg-lb">${el}</label></div>`
    document.querySelector("#ingredient-checkbox").insertAdjacentHTML("beforeend", newEl);
    ingredientsPoolNodesInternal.push(newElName);   
    }
    return ingredientsPoolNodesInternal;
}

document.querySelector("#indg-search").addEventListener("input",()=> {
    //we download search value 
    let ingredientSearcherValue = document.querySelector("#indg-search").value.toLowerCase();
    //we download existing elements to compare it later (ingredientsPoolNodes)

    if (ingredientSearcherValue == 0) {
        for (const el of ingredientsPoolNodes) {
            document.getElementById(`${el}`).style["visibility"] = "visible";
        }
    } else {
        for (const el of ingredientsPoolNodes) {
    //we iterate ingredients array and create the new one only with values that match
            if (el.startsWith(ingredientSearcherValue)){
                let hook = document.getElementById("ingredient-checkbox-hook")
                document.getElementById(`${el}`).style["visibility"] = "visible";
                let visibleIng = document.getElementById(`${el}`);
                hook.after(visibleIng);
            } else {
                if (document.getElementById(`${el}`).style["visibility"] === "visible") {
                    document.getElementById(`${el}`).style["visibility"] = "hidden";
                }
            }
        }
    }
}
)


// -checked ingredients list-
//* tworzymy listę która klarownie pokazuje wybrane składniki z opcją usunięcia ich co automatycznie zmienia wartość w formie powyżej - nie powinno to być trudne (sprawdizć czy będzie zmieniał się powyższy array)



//---MATCHED RECIPES---
class Recipe {
    constructor (name,preparation,ingredients,details) {
        this.name = name,
        this.elname = `${name} recipe`,
        this.preparation = preparation,
        this.ingredients = ingredients,
        this.details = details,
        this.ingredientsShowcase = ingredientsShow()
        this.ingredientsStatus = ingStatActivation ()

        function ingStatActivation () {
            const ingredientsStatusValue = {}
            for (const el of ingredients) {
                Object.assign(ingredientsStatusValue, {[el]: 0});
            }
            return ingredientsStatusValue
        }
        function ingredientsShow() {
            const ingShow = []
            for (const el of ingredients) {
                const ingWithSpace = ` ${el}`;
                ingShow.push(ingWithSpace);
            }
            return ingShow;
        }

    }
    presentIng = [];
    neededIng = [];
            
}

const GzikazZiemniakami = new Recipe(
    "Gzika z ziemniakami",
    {1: "Gotujemy wodę na makaron"},
    ["ziemniaki","serek wiejski","twaróg","oliwa","pieprz","sól","ogórki konserwowe"],
    ["Czas przygotowania: 30 min"]
    ); 

const WarzywaPoChińskuzBiedry = new Recipe(
    "Warzywa po Chińsku",
    {1: "Gotujemy wodę na makaron"},
    ["ryż","sos sojowy","warzywa chińskie z biedronki","olej"],
    ["Czas przygotowania: 30 min"]
    ); 
    
const KotletiMarchewkazGroszkiem = new Recipe(
    "Kotlet i marchewka z groszkiem",
    {1: "Gotujemy wodę na makaron"},
    ["mięso wegańskie:kotlet","ziemniaki","marchewka","groszek","masło","cukier","pieprz","sól"],
    ["Czas przygotowania: 30 min"]
    ); 

const Gyros = new Recipe(
    "Gyros",
    {1: "Gotujemy wodę na makaron"},
    ["chleb pita","mięso wegańskie:gyros","sałata","jogurt grecki","pomidor","sałata","ogórek","czosnek","pieprz","sól"],
    ["Czas przygotowania: 30 min"]
    ); 

const Burgery = new Recipe(
    "Burgery",
    {1: "Gotujemy wodę na makaron"},
    ["bułki do burgera","mięso wegańskie: kotlet","ser mimolette","sałata","cebula","ketchup","sos BBQ","majonez","ogórek","pomidor","pieprz","sól"],
    ["Czas przygotowania: 30 min"]
    ); 

const PastazCukinią = new Recipe(
    "Pasta z cukinią",
    {1: "Gotujemy wodę na makaron"},
    ["makaron","makaron","oliwa","czosnek","peperoncino","cukinia","mięta","pietruszka","sos sojowy","pieprz","sól"],
    ["Czas przygotowania: 30 min"]
    ); 

const Leczo = new Recipe(
    "Leczo",
    {1: "Gotujemy wodę na makaron"},
    ["ryż","oliwa","czosnek","cukinia","marchew","cynamon","peperoncino","papryka","gorzka czekolada","sos sojowy","pieprz","sól"],
    ["Czas przygotowania: 50 min"]
    ); 

const Tofunese = new Recipe(
    "Tofunese",
    {1: "Gotujemy wodę na makaron", 2:"Rogrzewamy oliwę na patelni.", 3:"Rozdrabniamy tofu w palcach tak, żeby przypominało w wyglądzie mięso mielone.",4:"Siekamy cebulę i czosnek, kroimy marchewkę na plasterki, a następnie na ćwiartki. Jeśli dodajemy selera, kroimy go w cieniutkie plasterki.",5:"Gotujemy makaron zgodnie z instrukcją na opakowaniu.",6:"Na oliwie podsmażamy cebulę (ok. 3-4 minuty), następnie dodajemy czosnek i smażymy jeszcze ok. 2 minuty mieszając. Dodajemy marchewkę i selera. Smażymy następne 2 minuty.",7:"Dorzucamy tofu i smażymy przez ok. 5 minut.",8:"Dodajemy pomidory i przyprawiamy do smaku (jeśli używamy świeżej bazylii siekamy ją i dodajemy na sam koniec gotowania). Smażymy do uzyskania odpowiedniej konsystencji, czyli gdy woda wyparuje i sos zgęstnieje (ok. 10-15 minut w zależności od rodzaju passaty).",9:"Mieszamy sos z makaronem w garnku lub bezpośrednio na talerzu. Możemy posypać wegańskim parmezanem lub płatkami drożdżowymi."},
    ["makaron","sos sojowy","oliwa","tofu","cebula","czosnek","marchew","seler","bazylia","płatki drożdżowe","pieprz","sól"],
    ["Czas przygotowania: 25 min"]
    ); 


const AglioOlioPeperoncino = new Recipe(
    "Aglio Olio Peperoncino",
    {1: "Gotujemy wodę na makaron", 2:"Rogrzewamy oliwę na patelni.", 3:"Rozdrabniamy tofu w palcach tak, żeby przypominało w wyglądzie mięso mielone.",4:"Siekamy cebulę i czosnek, kroimy marchewkę na plasterki, a następnie na ćwiartki. Jeśli dodajemy selera, kroimy go w cieniutkie plasterki.",5:"Gotujemy makaron zgodnie z instrukcją na opakowaniu.",6:"Na oliwie podsmażamy cebulę (ok. 3-4 minuty), następnie dodajemy czosnek i smażymy jeszcze ok. 2 minuty mieszając. Dodajemy marchewkę i selera. Smażymy następne 2 minuty.",7:"Dorzucamy tofu i smażymy przez ok. 5 minut.",8:"Dodajemy pomidory i przyprawiamy do smaku (jeśli używamy świeżej bazylii siekamy ją i dodajemy na sam koniec gotowania). Smażymy do uzyskania odpowiedniej konsystencji, czyli gdy woda wyparuje i sos zgęstnieje (ok. 10-15 minut w zależności od rodzaju passaty).",9:"Mieszamy sos z makaronem w garnku lub bezpośrednio na talerzu. Możemy posypać wegańskim parmezanem lub płatkami drożdżowymi."},
    ["makaron","oliwa","czosnek","peperoncino","pieprz","sól"],
    ["Czas przygotowania: 15 min"]
    );    //jeżeli wpisuję prompt to sprawdza wszystkie słowa - jeżeli litery się zgadzają to pokazuje je do dodania

const recipeList = [Tofunese,AglioOlioPeperoncino,Leczo,PastazCukinią,GzikazZiemniakami,WarzywaPoChińskuzBiedry,KotletiMarchewkazGroszkiem,Gyros,Burgery
];

this.addEventListener("load", () => {
    const recipeHook = document.querySelector("#recipes-checkbox-hook");
    const recipeHookSecond = document.querySelector("#recipes-selected-hook");
    
    for (const el of recipeList) {
        const newEl = 
        `<div id="${el.elname}-select" style="visibility: hidden;" class="recipe-card">
        <input type="checkbox" if="check-${el.elname}" value="${el.elname}" id="${el.elname}-input" class="recipe-in">
        <label for="check-${el.elname}" class="recipe-lb">${el.name}</label> 
        </div>`;

        const newElSecond = 
        `<div id="${el.elname}-input-choosen" style="visibility: hidden;" class="selected-recipe-card">
        <p>${el.name}</p> 
        <div class="inner-recipe-card-content>
        <p class="recipe-ingredients" style="color: green;">Ingredients you have: ${el.presentIng}</p>
        <p class="recipe-ingredients" style="color: red;">Missing ingredients: ${el.neededIng}</p>
        </div>
        </div>`;

        recipeHook.insertAdjacentHTML("beforeend",newEl)
        recipeHookSecond.insertAdjacentHTML("afterend",newElSecond)

        const recipeListInnerHook = document.getElementById(`${el.elname}-select`);

        const recipeListInner = 
        `<div class="inner-recipe-card-content><p class="recipe-ingredients">${el.details}</p></div>`;

        recipeListInnerHook.insertAdjacentHTML("beforeend",recipeListInner)
    }
    const recipeCards = document.querySelectorAll(".recipe-in");
    for (const el of recipeCards) {
        el.addEventListener("change", () => {
            if (el.checked) {
                document.getElementById(`${el.id}-choosen`).style["visibility"] = "visible";
                const newRS = document.getElementById(`${el.id}-choosen`);
                recipeHookSecond.after(newRS);
                } else if (!el.checked) {
                document.getElementById(`${el.id}-choosen`).style["visibility"] = "hidden";
            }


        })


    }

})


//listening to selected inputs
const selectedIngredients = []
this.addEventListener("load", () => {
    const group = document.querySelector("#ingredient-checkbox");
    const groupElement = group.querySelectorAll(".indg-in");
    for (const el of groupElement) {
        el.addEventListener("click", () => {
            

            if (el.checked) {
                selectedIngredients.push(el.value);
            } else if (!el.checked) {
                const elInd = selectedIngredients.indexOf(el)
                selectedIngredients.splice(elInd,1);
            } else {
            }
            // if el is changed we should check if ingredients are present in recipe ing properties


            for (const el of recipeList) {
                document.getElementById(`${el.elname}-select`).style["visibility"] = "hidden"
            }

            //iterate through recipes to set up the begining state 

            for (const ele of recipeList) {
                resetStatus ()
                function resetStatus () {
                    for (const el of ele.ingredients) {
                        ele.ingredientsStatus[el] = 0;
                    }
                }

            }



            for (const ing of selectedIngredients) {

                for (const el of recipeList) {
                    const recIng = el.ingredients
                    if (recIng.includes(ing)) {
                        el.ingredientsStatus[ing] = 1;
                        document.getElementById(`${el.elname}-select`).style["visibility"] = "visible";
                        const visibleRecipe = document.getElementById(`${el.elname}-select`);
                        const hook = document.getElementById("recipes-checkbox-hook")
                        hook.after(visibleRecipe);
                    } 

    
                }

            }
            for (const el of recipeList) {
                el.presentIng = [];
                el.neededIng = [];
            }


            for (const ele of recipeList) {
                resetStatus ()
                function resetStatus () {
                    for (const el of ele.ingredients) {
                        if (ele.ingredientsStatus[el] === 1) {
                            ele.presentIng.push(el);
                        } else {
                            ele.neededIng.push(el);
                        }
                        
                    }
                }

            }

            // el.presentIng = [];
            // el.neededIng = [];

            // // we check which ings we have  
            // for (const ing of selectedIngredients) {
            //     for (const el of recipeList) {
            //         console.log("hej")
            //         check()
            //         function check () {
            //                 if (el.ingredientsStatus[ing]) {
            //                     el.presentIng.push(ing);
            //                 }
            //         }
            //     }

            // }

            // // we update list of ings we do not have
            // for (const el of recipeList) {
            //     for (const recIng of el.ingredientsStatus) {
            //         if (!el.ingredientsStatus[recIng]){
            //             el.neededIng.push(recIng)
            //         }
            //     }
            // }



            
            

            for (const el of recipeList) {
                console.log("in");
                const cardContent = document.getElementById(`${el.elname}-input-choosen`).querySelector("div")
                cardContent.innerHTML =""
                cardContent.innerHTML = `<p class="recipe-ingredients" style="color: green;">Ingredients you have: ${el.presentIng}</p>
                <p class="recipe-ingredients" style="color: red;">Missing ingredients: ${el.neededIng}</p>`
                
            }
        })
    }
})
let newURL = ""


document.querySelector("#generate-csv").addEventListener("click",()=>{

    const data = []
    let datastr = ""
    for (const el of recipeList) {
        if (document.getElementById(`${el.elname}-input`).checked == 1) {
            data.push(`Recipe name: ${el.name} |\n Recipe ingredients: ${el.ingredients} |\n Recipe ingredients you already have at home: \b${el.presentIng}\b |\n Recipe ingredients you have to buy to prepare this meal: ${el.neededIng}\n`)
        }
    } 

    datastr += data.join("");

    const blobExport = new Blob([datastr], {type: "text/csv; charset=utf-8"})
    console.log(blobExport);
    const newlist = URL.createObjectURL(blobExport)
    const anchorFL = document.querySelector("#generate-csv-anchor")
    anchorFL.href = newlist;

}
)



// document.querySelector("#CSV-generator").addEventListener("click",()=>{
//     console.log("click");
//     const CsvArray = []

//     const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
//     const weekDayIds = ["#mon-activ","#tue-activ","#wed-activ","#thu-activ", "#fri-activ", "#sat-activ", "#sun-activ"]
    
//     generateCsvArray (0, 7);

//     let csvContent = "";

//     CsvArray.forEach(row => {
//         csvContent += row.join(",") + "\n";
//     })

//     const blob = new Blob ([csvContent], {type: "text/csv;charset=utf-8," })
//     const objUrl = URL.createObjectURL(blob);
//     document.querySelector("#CSV-anchor").setAttribute("href", objUrl)

//     function generateCsvArray (n, i) {
//         if (n === i) {
//             return;
//         } else {
//             CsvArray.push([weekDays[n], document.querySelector(weekDayIds[n]).innerText])
//             generateCsvArray(n+1, i);
//             return CsvArray;
//         }
//     }


// })

