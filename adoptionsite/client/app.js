
var getAnimalsFromServer = function () {
    return fetch("https://damp-plateau-78510.herokuapp.com/animals");
};

var deleteAnimalFromServer = function (id) {
    var data = `id=${encodeURIComponent(id)}`;
    console.log("delete ID: ", id);
    return fetch("https://damp-plateau-78510.herokuapp.com/animals/:id", {
        body: data,
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
}

var updateAnimalReservedOnServer = function (name, breed, age, gender, color, description, updateScheduled, id) {
    var data = `name=${encodeURIComponent(name)}`;
    data += `&breed=${encodeURIComponent(breed)}`;
    data += `&age=${encodeURIComponent(age)}`;
    data += `&gender=${encodeURIComponent(gender)}`;
    data += `&color=${encodeURIComponent(color)}`;
    data += `&description=${encodeURIComponent(description)}`;
    data += `&scheduled=${encodeURIComponent(updateScheduled)}`;
    data += `&id=${encodeURIComponent(id)}`;
    console.log("update ID: ", id);
    return fetch("https://damp-plateau-78510.herokuapp.com/animals/:id", {
        body: data,
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
};

var updateAnimalOnServer = function (name, breed, age, gender, color, description, updateScheduled, id) {
    var data = `name=${encodeURIComponent(name)}`;
    data += `&breed=${encodeURIComponent(breed)}`;
    data += `&age=${encodeURIComponent(age)}`;
    data += `&gender=${encodeURIComponent(gender)}`;
    data += `&color=${encodeURIComponent(color)}`;
    data += `&description=${encodeURIComponent(description)}`;
    data += `&scheduled=${encodeURIComponent(updateScheduled)}`;
    data += `&id=${encodeURIComponent(id)}`;
    console.log("update ID: ", id);
    return fetch("https://damp-plateau-78510.herokuapp.com/animals/:id", {
        body: data,
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
};

var createAnimalOnServer = function (newAnimal, newName, newBreed, newAge, newGender, newColor, newDescription, newScheduled) {
    var data = `animal=${encodeURIComponent(newAnimal)}`;
    data += `&name=${encodeURIComponent(newName)}`;
    data += `&breed=${encodeURIComponent(newBreed)}`;
    data += `&age=${encodeURIComponent(newAge)}`;
    data += `&gender=${encodeURIComponent(newGender)}`;
    data += `&color=${encodeURIComponent(newColor)}`;
    data += `&description=${encodeURIComponent(newDescription)}`;
    data += `&scheduled=${encodeURIComponent(newScheduled)}`;
    return fetch("https://damp-plateau-78510.herokuapp.com/animals", {
        body: data,
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"

        }
    });
};

var app = new Vue ({
    el: "#app",
    data: {
        newAnimal: "",
        newName: "",
        newBreed: "",
        newAge: "",
        newGender: "",
        newColor: "",
        newDescription: "",
        newScheduled: "",
        animals: [],
        reservedanimals: [],
        nonreservedanimals: [],
        cardvisible: true,
        animalcards: false,
        relistcard: false,
        images: [
            'images/dog.jpg',
            'images/grasspattern.jpg'
        ],
        selectedImage: 'images/dogcat.jpg',
        sImage: 'images/grasspattern.jpg',
        updateName: "",
        updateBreed: "",
        updateAge: "",
        updateGender: "",
        updateColor: "",
        updateDescription: "",
        updateId: "",
        errors: []
    },
    methods: {
        getImg: function(animal) {
            if(animal.animal == "cat") {
                this.selectedImage = 'images/cat.jpg';
                return this.selectedImage;
            } else if(animal.animal == "dog") {
                this.sImage = 'images/dog1.jpg'
                return this.sImage;
            }
        },
        getreservedImg: function(animal) {
            if(animal.animal == "cat") {
                this.selectedImage = 'images/cat.jpg';
                return this.selectedImage;
            } else if(animal.animal == "dog") {
                this.sImage = 'images/dog1.jpg'
                return this.sImage;
            }
        },
        validateNew: function () {
            this.errors = [];
            if (this.newAnimal == "") {
                this.errors.push("Please select an animal from the dropown.")
            }
            if (this.newBreed == "") {
                this.errors.push("Please enter a breed.")
            }
            if (this.newName == "") {
                this.errors.push("Please enter a name.")
            }
            if (this.newAge == "") {
                this.errors.push("Please enter an age")
            } else if (parseInt(this.newAge) < 1) {
                this.errors.push("The minimum age is 1.");
            } else if (parseInt(this.newAge) > 20) {
                this.errors.push("The maximum age is 20.");
            }
            if (this.newGender == "") {
                this.errors.push("Please enter a gender")
            }
            if (this.newColor == "") {
                this.errors.push("Please enter a color")
            }
            if (this.newDescription == "") {
                this.errors.push("Please enter a description")
            }
            if (this.errors.length > 0) {
                return false;
            } else {
                return true;
            }
        },
        validateUpdate: function () {
            this.errors = [];


            if (this.updateName == "") {
                this.errors.push("Please enter a name.")
            }
            if (this.updateAge == "") {
                this.errors.push("Please enter an age")
            } else if (parseInt(this.updateAge) < 1) {
                this.errors.push("The minimum age is 1.");
            } else if (parseInt(this.updateAge) > 20) {
                this.errors.push("The maximum age is 20.");
            }
            if (this.updateColor == "") {
                this.errors.push("Please enter a color")
            }
            if (this.updateDescription == "") {
                this.errors.push("Please enter a description")
            }

            if (this.errors.length > 0) {
                return false;
            } else {
                return true;
            }
        
        },
        goButtonClicked: function () {
            console.log("AGE: ", this.newAge)
            if (this.validateNew()) {
                createAnimalOnServer(this.newAnimal, this.newName, this.newBreed, this.newAge, this.newGender, this.newColor, this.newDescription, false).then((response) => {
                    if (response.status == 201) {
                        this.showAnimals();
                        this.newAnimal = "";
                        this.newBreed = "";
                        this.newName = "";
                        this.newAge = "";
                        this.newGender = "";
                        this.newColor = "";
                        this.newDescription = "";
                    } else if (response.status == 422) {
                        //server validation error
                        this.errors.push("validation error");
                    } else {
                        //unexpected server error
                        this.errors.push("something terrible has happened!");
                    }     
                });
            }
        },
        submitButtonClicked: function () {
            if (this.validateUpdate()) {
                updateAnimalOnServer(this.updateName, this.updateBreed, this.updateAge, this.updateGender, this.updateColor, this.updateDescription, false, this.updateId).then((response) => { 
                    console.log("RESERVED")
                    if (response.status == 200) {
                        this.showAnimals();
                        this.updateAnimal = "";
                        this.updateBreed = "";
                        this.updateName = "";
                        this.updateAge = "";
                        this.updateGender = "";
                        this.updateColor = "";
                        this.updateDescription = "";
                        
                    } else if (response.status == 422) {
                        //server validation error
                        this.errors.push("validation error");
                    } else {
                        //unexpected server error
                        this.errors.push("something terrible has happened!");
                    } 
                })
            }
        },
        showAnimals: function () {
            this.reservedanimals = [];
            this.nonreservedanimals = [];
            getAnimalsFromServer().then((response) => {
                response.json().then((animals) => {
                    animals.forEach(animal => {
                        if (animal.scheduled) {
                            this.reservedanimals.push(animal)
                        } else {
                            this.nonreservedanimals.push(animal)
                        }
                    });
                    this.animals = animals;
                    console.log("here be the animals:", this.animals);
                    console.log("here be the reservedanimals:", this.reservedanimals);
                    console.log("here be the nonreservedanimals:", this.nonreservedanimals);
                    
       
                });
            });
        },
        impoundclick: function  () {
            this.errors = "";
            this.newAnimal = "";
            this.newBreed = "";
            this.newName = "";
            this.newAge = "";
            this.newGender = "";
            this.newColor = "";
            this.newDescription = "";
            this.updateAnimal = "";
            this.updateBreed = "";
            this.updateName = "";
            this.updateAge = "";
            this.updateGender = "";
            this.updateColor = "";
            this.updateDescription = "";
            this.cardvisible = true;
            this.animalcards = false;
            this.relistcard = false;
            console.log("impoound click");
        },
        adoptionclick: function  () {
            this.errors = "";
            this.newAnimal = "";
            this.newBreed = "";
            this.newName = "";
            this.newAge = "";
            this.newGender = "";
            this.newColor = "";
            this.newDescription = "";
            this.updateAnimal = "";
            this.updateBreed = "";
            this.updateName = "";
            this.updateAge = "";
            this.updateGender = "";
            this.updateColor = "";
            this.updateDescription = "";
            this.cardvisible = false;
            this.animalcards  = true;
            this.relistcard = false;
            console.log("adopt click");
        },
        relistclick: function  () {
            this.errors = "";
            this.newAnimal = "";
            this.newBreed = "";
            this.newName = "";
            this.newAge = "";
            this.newGender = "";
            this.newColor = "";
            this.newDescription = "";
            this.updateAnimal = "";
            this.updateBreed = "";
            this.updateName = "";
            this.updateAge = "";
            this.updateGender = "";
            this.updateColor = "";
            this.updateDescription = "";
            this.cardvisible = false;
            this.animalcards = false;
            this.relistcard = true;
            console.log("relist click");
        },
        markScheduled: function (index) {
            var id = this.nonreservedanimals[index]._id
            var name = this.nonreservedanimals[index].name;
            var breed = this.nonreservedanimals[index].breed;
            var age = this.nonreservedanimals[index].age;
            var gender = this.nonreservedanimals[index].gender;
            var color = this.nonreservedanimals[index].color;
            var description = this.nonreservedanimals[index].description;
            console.log("ID: ", this.nonreservedanimals[index]._id)
            alert("Congratulations! You have reserved "+ name + ". Here is your conformation number " + id);

            updateAnimalReservedOnServer(name, breed, age, gender, color, description,true, id).then((response) => { 
                console.log("index ", index)
                console.log("index of animals ", this.nonreservedanimals[index])
                console.log("RESERVED")
                if (response.status == 200) {
                    this.showAnimals();
                }
            })
        },
        markUnscheduled: function (index) {

            var id = this.reservedanimals[index]._id
            this.updateId = id;
            console.log("ID: ", this.reservedanimals[index]._id)
            var name = this.reservedanimals[index].name;
            var breed = this.reservedanimals[index].breed;
            var age = this.reservedanimals[index].age;
            var gender = this.reservedanimals[index].gender;
            var color = this.reservedanimals[index].color;
            var description = this.reservedanimals[index].description;
            console.log("DESCRIPTION: ", description);
            this.updateName = name;
            this.updateBreed= breed;
            this.updateAge = age;
            this.updateGender = gender;
            this.updateColor = color;
            this.updateDescription = description;
        },
        deleteAnimal: function (index) {
            var id = this.reservedanimals[index]._id;
            deleteAnimalFromServer(id).then((response) => { 
                if (response.status == 200) {
                    this.showAnimals();
                } else if (response.status == 404 ) {
                    this.errors.push("NOT FOUND CLIENT ERROR");
                }
                else {
                    this.errors.push("NOT FOUND");
                }
            })
        },
            
    },
    created: function () {
        console.log("VUE HAS LOADED!!!");
        this.showAnimals();
    }
});