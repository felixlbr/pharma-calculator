// Sélection des éléments
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');


// Inputs avancés
const coefA = document.getElementById('coefA');
const coefB = document.getElementById('coefB');
const coefC = document.getElementById('coefC');
const coefD = document.getElementById('coefD');
const coefE = document.getElementById('coefE');
const resultAdvanced = document.getElementById('resultAdvanced');


const toggleAdvanced = document.getElementById('toggleAdvanced');
const advancedSection = document.getElementById('advancedSection');


// ---- Fourchettes par défaut ----
const defaultRangeA = { min: 15, max: 25 };
const defaultRangeB = { min: 45, max: 50 };
const defaultRangeC = { min: 30, max: 30 };
const defaultRangeD = { min: 15, max: 15 };
const defaultRangeE = { min: 312, max: 312 };

// Vérification des valeurs
const nombre = { min: 0 };
const pourcentage = { min: 0, max: 100 };


function updateAdvanced() {
    const val1 = Number(input1.value) || 0;
    const val2 = Number(input2.value) || 0;

    const hasCustomA = coefA.value.trim() !== '';
    const hasCustomB = coefB.value.trim() !== '';
    const hasCustomC = coefC.value.trim() !== '';
    const hasCustomD = coefD.value.trim() !== '';
    const hasCustomE = coefE.value.trim() !== '';

    const rangeA = hasCustomA
        ? { min: Number(coefA.value), max: Number(coefA.value) }
        : defaultRangeA;

    const rangeB = hasCustomB
        ? { min: Number(coefB.value), max: Number(coefB.value) }
        : defaultRangeB;

    const rangeC = hasCustomC
        ? { min: Number(coefC.value), max: Number(coefC.value) }
        : defaultRangeC;
    
    const rangeD = hasCustomD
        ? { min: Number(coefD.value), max: Number(coefD.value) }
        : defaultRangeD;
    
    const rangeE = hasCustomE
        ? { min: Number(coefE.value), max: Number(coefE.value) }
        : defaultRangeE;

    // Vérification des valeurs
    if (
        (val1 <= 0) ||
        (val2 < 0 || val2 > 100) ||
        (hasCustomA && (Number(coefA.value) < nombre.min || Number(coefA.value) > pourcentage.max)) ||
        (hasCustomB && (Number(coefB.value) < nombre.min || Number(coefB.value) > pourcentage.max)) ||
        (hasCustomC && (Number(coefC.value) < nombre.min || Number(coefC.value) > pourcentage.max)) ||
        (hasCustomD && Number(coefD.value) < nombre.min) ||
        (hasCustomE && (Number(coefE.value) < nombre.min || Number(coefE.value) > 365))
    ) {
        resultAdvanced.textContent = "Bénéfices estimés : —";
        return;
    }

    // Calculs intermédiaires
    const min_nb_achat_generes = val1 * rangeA.min/100 * rangeB.min/100;
    const max_nb_achat_generes = val1 * rangeA.max/100 * rangeB.max/100;
    const min_panier_moy_final = rangeD.min * (1 + rangeC.min/100)
    const max_panier_moy_final = rangeD.max * (1 + rangeC.max/100)

    const minResult = Math.round(min_nb_achat_generes * min_panier_moy_final * rangeE.min * val2/100);
    const maxResult = Math.round(max_nb_achat_generes * max_panier_moy_final * rangeE.max * val2/100);

    if (isNaN(minResult) || isNaN(maxResult)) {
        resultAdvanced.textContent = "Bénéfices estimés : —";
        return;
    }
    else{
        if (minResult.valueOf() === 0){
            resultAdvanced.textContent = "Bénéfices estimés : —";
        }
        else {
            resultAdvanced.textContent =
                minResult === maxResult
                ? `Bénéfices estimés : ${minResult}`
                : `Bénéfices estimés : ${minResult} à ${maxResult}`;
        }
        return;
    }


}

input1.addEventListener('input', updateAdvanced);
input2.addEventListener('input', updateAdvanced);
coefA.addEventListener('input', updateAdvanced);
coefB.addEventListener('input', updateAdvanced);
coefC.addEventListener('input', updateAdvanced);
coefD.addEventListener('input', updateAdvanced);
coefE.addEventListener('input', updateAdvanced);


document.getElementById("toggleAdvanced").addEventListener("click", function () {
    const section = document.getElementById("advancedSection");

    const isOpen = !section.classList.contains("hidden");

    if (isOpen) {
        section.classList.add("hidden");
        this.textContent = "➕";
    } else {
        section.classList.remove("hidden");
        this.textContent = "➖";
    }
});

document.querySelectorAll('.info-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        icon.classList.toggle('active');
    });
});