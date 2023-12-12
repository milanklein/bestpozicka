module.exports.checkData = (formData) => {
    if (formData.job === "employee"){
        formData.job = "Zamestnanec"
    }
    if (formData.job === "state-employee"){
        formData.job = "Štátny zamestnanec"
    }
    if (formData.job === "foreign-employee"){
        formData.job = "Zamestnanec v zahraničí"
    }
    if (formData.job === "self-employed"){
        formData.job = "Živnostník / S.R.O."
    }
    if (formData.job === "without-ico"){
        formData.job = "Živnostník bez IČO"
    }
    if (formData.job === "tender-self"){
        formData.job = "Opatrovateľ/ka - živnostník - v členskej krajine EÚ"
    }
    if (formData.job === "tender"){
        formData.job = "Opatrovateľka"
    }
    if (formData.job === "senior"){
        formData.job = "Starobný dôchodca"
    }
    if (formData.job === "retired-senior"){
        formData.job = "Výsluhový dôchodca"
    }
    if (formData.job === "invalid-senior"){
        formData.job = "Invalidný dôchodca"
    }
    if (formData.education === "elementary") {
      formData.education = "Základné vzdelanie";
    }
    if (formData.education === "without-maturita") {
      formData.education = "Sredoškolské bez maturity";
    }
    if (formData.education === "high-school") {
      formData.education = "Sredoškolské s maturitou";
    }
    if (formData.education === "bachelor") {
      formData.education = "Vysokoškolské bakalárske";
    }
    if (formData.education === "uni") {
      formData.education = "Vysokoškolské";
    }
    if (formData.education === "postgraduate") {
      formData.education = "Postgraduálne";
    }
    if (formData.education === "unspecified") {
      formData.education = "Neuvedené";
    }
}

module.exports.checkHousing = (formData) => {
    if (formData.housing === 'other'){
        formData.housing = "Ostatné"
    }
    if (formData.housing === "house"){
        formData.housing = "Vlastný byt/dom"
    }
    if (formData.housing === "cooperative-house"){
        formData.housing = "Družstvený byt"
    }
    if (formData.housing === "rent"){
        formData.housing = "Nájomné bývanie"
    }
    if (formData.housing === "parents"){
        formData.housing = "Bývanie u rodičov/u detí"
    }
}
