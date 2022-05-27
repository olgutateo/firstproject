const listGroup = document.querySelector(".list-group");
const addPostForm = document.querySelector(".add-post-form");
const nume = document.getElementById("nume");
const prenume = document.getElementById("prenume");
const numeErou = document.getElementById("numeErou");
const newForm = document.getElementById("newForm");
const superPutere = document.getElementById("superPutere");
let url = "http://localhost:3000/heroes";
let uri = "http://localhost:3000/superPowers";

const renderEroi = async () => {
  newForm.style.display = "block";
  const res = await fetch(url);
  const res1 = await fetch(uri);
  const heroes = await res.json();
  const superPowers = await res1.json();
  // console.log(heroes);
  // console.log(superPowers);
  let template = "";
  for (let i = 0; i < heroes.length; i++) {
    // console.log(heroes[i]);
    // console.log(heroes[i]["numeErou"]);
    // console.log(superPowers[i]["superPutere"]);
    template += `
    <li class="list-group -item" data-id=${heroes[i]["id"]}>${heroes[i]["numeErou"]}' FORCE..... ${superPowers[i]["superPutere"]}  <button class="btn-primary put" id="editBtn" >update</button>   <button class="btn-primary delete" id="delBtn">delete</button> </li>
    `;
    listGroup.innerHTML = template;
  }

  // let heroesSuper = { ...superPowers, ...heroes };

  console.log(heroesSuper);
  listGroup.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log("hi");
    // console.log(e.target.id);
    let editButtonisPressed = e.target.id == "editBtn";
    let delButtonisPressed = e.target.id == "delBtn";
    let id = e.target.parentElement.dataset.id;

    if (delButtonisPressed) {
      console.log("remove post");
      const fetch1 = fetch(`${url}/${id}`, {
        method: "DELETE",
      }).then((res) => res.json());
      const fetch2 = fetch(`${uri}/${id}`, {
        method: "DELETE",
      }).then((res) => res.json());
      const allData = Promise.all([fetch1, fetch2]);
      console.log(allData);
      allData.then(() => location.reload());
    }
    if (editButtonisPressed) {
      newForm.style.display = "none";
      let selectedHero = null;
      // console.log({ heroes, superPowers, id });
      heroes.forEach((hero) => {
        if (hero.id == id) {
          // console.log("hero: ", hero);
          superPowers.forEach((superPower) => {
            if (superPower.heroId == id) {
              // console.log("superPower: ", superPower);
              selectedHero = { ...hero, superPower };
            }
          });
        }
      });
      const selectedHero2 = {
        ...heroes.find((hero) => hero.id == id),
        superPower: superPowers.find((superPower) => superPower.heroId == id),
      };
      // console.log("Selected hero 2 :", selectedHero2);

      // console.log("Selected hero:", selectedHero);
      const editForm = document.getElementById("editForm");
      editForm.innerHTML = generateForm(selectedHero);
    }
  });
};
function editHero(id, superPowerId) {
  const nume = document.getElementById("nume");
  const prenume = document.getElementById("prenume");
  const numeErou = document.getElementById("numeErou");
  const superPutere = document.getElementById("superPutere");
  const editHeroUrl = url + `/${id}`;
  const editSuperPower = uri + `/${superPowerId}`;
  const fetch1 = fetch(editHeroUrl, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nume: nume.value,
      prenume: prenume.value,
      numeErou: numeErou.value,
    }),
  }).then((res) => res.json());
  const fetch2 = fetch(editSuperPower, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      superPutere: superPutere.value,
    }),
  }).then((res) => res.json());
  const allData = Promise.all([fetch1, fetch2]);
  console.log(allData);
  allData.then((res) => console.log(res)).then((res) => location.reload());
}
function generateForm(hero) {
  return `
  <form class="add-post-form" >
        <div class="mb-3">
          <label class="form-label"
            ><strong>EDITING...</strong></label
          >
        </div>
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            id="nume"
            placeholder="Introduceti nume"
            value="${hero.nume}"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            id="prenume"
            placeholder="Introduceti prenume"
            value="${hero.prenume}"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            id="numeErou"
            placeholder="Introduceti nume de erou"
            value="${hero.numeErou}"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            id="superPutere"
            placeholder="Introduceti nume de erou"
            value="${hero.superPower.superPutere}"
            required
          />
        </div>
      </form>
      <button type="button"  onclick="editHero(${hero.id},${hero.superPower.id})" class="btn btn-primary add-post-form">
            EDITEAZA EROU
          </button>
  `;
}
renderEroi();

//POST

addPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form submited");
  console.log(nume.value);
  const fetch1 = fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nume: nume.value,
      prenume: prenume.value,
      numeErou: numeErou.value,
    }),
  }).then((res) => res.json());
  const fetch2 = fetch(uri, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      superPutere: superPutere.value,
    }),
  }).then((res) => res.json());
  const allData = Promise.all([fetch1, fetch2]);
  console.log(allData);
  allData.then((res) => console.log(res)).then((res) => location.reload());
});
