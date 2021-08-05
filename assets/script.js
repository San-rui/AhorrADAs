var goOnStorage = function () {
    var fullLocalStorage = JSON.parse(localStorage.getItem('full-storage'));
    if (!fullLocalStorage) {
        fullLocalStorage = {
            categories: [{ name: "comida", slug: "comida" }, { name: "Servicios", slug: "servicios" },
                { name: "Salidas", slug: "salidas" },
                { name: "Educación", slug: "educación" }, { name: "Transporte", slug: "transporte" },
                { name: "Trabajo", slug: "trabajo" }],
            newoperation: []
        };
    }
    ;
    return fullLocalStorage;
};
